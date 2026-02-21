import { UsersFinder, UsersInsertions } from "../repositories/users/usersTable.js";
import crypto from "crypto";
import AppError from "../utlis/AppError.js";
import bcrypt from 'bcrypt';
import getBuffer from "../utlis/buffer.js";
import { upload } from "./uploadFile.js";
import jwtToken from "../utlis/jwtToken.js";
import { emailTemp } from "../utlis/emailTemplate.js";
import { KafkaProducer } from "../library/kafka/producer.js";
import { redisClient } from "../library/redis/index.js";
import { RefreshTokenTable } from "../repositories/refresh_token/refresh_tokenTable.js";
export class Auth {
    static async resgister(data) {
        // this.requiredFields(data.body);
        const { name, email, password, phoneNumber } = data.body;
        const existingUser = await UsersFinder.find({ email });
        if (existingUser.length > 0) {
            throw new AppError(`User with this email Already exists`, 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const bodyData = {
            ...data.body,
            password: hashedPassword
        };
        const payload = {
            bodyData,
            fileData: data.file
        };
        const registedUser = await CreateUser.createUser(payload);
        const accessToken = await jwtToken.JWTtoken({ userId: registedUser?.user_id }, process.env.SECRET_KEY, '15m');
        const refreshToken = crypto.randomBytes(64).toString("hex");
        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        const browser = data.ua.browser.name || "Unknown Browser";
        const os = data.ua.os.name || "Unknown OS";
        const deviceType = data.ua.device.type || "desktop";
        const device = data.userAgent.includes("Postman")
            ? "Postman Client"
            : `${deviceType} - ${browser} on ${os}`;
        const platform = data.ua.os.name?.toLowerCase();
        let device_type;
        if (platform?.includes("ios"))
            device_type = "ios";
        else if (platform?.includes("android"))
            device_type = "android";
        else if (data.userAgent.includes("Postman"))
            device_type = "postman";
        else
            device_type = "web";
        const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        await RefreshTokenTable.insertToken({
            user_id: registedUser?.user_id,
            token_hash: tokenHash,
            device,
            device_type,
            user_agent: data.userAgent,
            expires_at: expiryDate
        });
        return {
            registedUser,
            accessToken,
            refreshToken
        };
    }
    static async logIn(data) {
        const user = await UsersFinder.users_skills(data.dto.email);
        if (user.length === 0) {
            throw new AppError('Invalid Credentials, Email Not Found', 400);
        }
        const usersObject = user[0];
        const matchPassword = await bcrypt.compare(data.dto.password, usersObject.password);
        if (!matchPassword) {
            throw new AppError(`Invalid Credentials, Password didn't matched for the Email`, 400);
        }
        usersObject.skills = usersObject.skills || [];
        delete usersObject.password;
        const accessToken = await jwtToken.JWTtoken({ userId: usersObject?.user_id }, process.env.SECRET_KEY, '15m');
        const refreshToken = crypto.randomBytes(64).toString("hex");
        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        const browser = data.ua.browser.name || "Unknown Browser";
        const os = data.ua.os.name || "Unknown OS";
        const deviceType = data.ua.device.type || "desktop";
        const device = data.userAgent.includes("Postman")
            ? "Postman Client"
            : `${deviceType} - ${browser} on ${os}`;
        const platform = data.ua.os.name?.toLowerCase();
        let device_type;
        if (platform?.includes("ios"))
            device_type = "ios";
        else if (platform?.includes("android"))
            device_type = "android";
        else if (data.userAgent.includes("Postman"))
            device_type = "postman";
        else
            device_type = "web";
        const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const [tokenRow] = await RefreshTokenTable.find({
            user_id: usersObject?.user_id,
            device_type,
            user_agent: data.userAgent
        });
        if (tokenRow) {
            await RefreshTokenTable.update({
                token_hash: tokenHash,
                expires_at: expiryDate,
                revoked: false
            }, {
                user_id: usersObject?.user_id,
                device_type,
                user_agent: data.userAgent
            });
        }
        else {
            await RefreshTokenTable.insertToken({
                user_id: usersObject?.user_id,
                token_hash: tokenHash,
                device,
                device_type,
                user_agent: data.userAgent,
                expires_at: expiryDate,
                revoked: false
            });
        }
        return {
            usersObject,
            accessToken,
            refreshToken
        };
    }
    static async forgotPassword(data) {
        const existingUser = await UsersFinder.find({ email: data.email });
        if (existingUser.length === 0) {
            return { message: 'If this email exists ,We have sent a reset link' };
        }
        const resetToken = await jwtToken.JWTtoken({ email: data.email, type: 'reset' }, process.env.SECRET_KEY, '15m');
        const resetLink = `${process.env.Frontend_Url}/reset/${resetToken}`;
        await redisClient.set(`forgot:${data.email}`, resetToken, {
            EX: 900
        });
        const message = {
            to: data.email,
            subject: "RESET YOUR PASSWORD - HireHeaven",
            html: emailTemp(resetLink)
        };
        KafkaProducer.publish('send-mail', message).catch((err) => {
            console.error("Failed to send Message", err);
        });
        return { message: 'If this email exists , we have sent a reset link' };
    }
    static async ResetPassword(data) {
        const decodedToken = await jwtToken.JWTtokenVerify(data.token, process.env.SECRET_KEY);
        if (decodedToken?.type !== 'reset') {
            throw new AppError('Invalid token type', 400);
        }
        const email = decodedToken?.email;
        const storedToken = await redisClient.get(`forgot:${email}`);
        if (!storedToken || storedToken !== data.token) {
            throw new AppError('Token has been expired', 400);
        }
        const users = await UsersFinder.find({ email });
        if (users.length === 0) {
            throw new AppError('User Not Found', 404);
        }
        const user = users[0];
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await UsersFinder.update({ password: hashedPassword }, { email });
        await redisClient.del(`forgot:${email}`);
        return {
            message: 'Your password has been updated.'
        };
    }
    static async refreshToken(data) {
        const { refreshToken, ua, userAgent } = data;
        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        const platform = ua.os.name?.toLowerCase();
        let device_type;
        if (platform?.includes("ios"))
            device_type = "ios";
        else if (platform?.includes("android"))
            device_type = "android";
        else if (userAgent.includes("Postman"))
            device_type = "postman";
        else
            device_type = "web";
        const [tokenRow] = await RefreshTokenTable.find({
            token_hash: tokenHash,
            device_type,
            user_agent: userAgent
        });
        if (!tokenRow) {
            throw new AppError("Invalid refresh token or device mismatch", 401);
        }
        if (tokenRow.revoked) {
            throw new AppError("Token revoked", 401);
        }
        if (new Date() > tokenRow.expires_at) {
            throw new AppError("Refresh token expired", 401);
        }
        // Generate new access token
        const accessToken = jwtToken.JWTtoken({ userId: tokenRow.user_id }, process.env.SECRET_KEY, "15m");
        // Rotate refresh token
        const newRefreshToken = crypto.randomBytes(64).toString("hex");
        const newTokenHash = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex");
        const newExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        await RefreshTokenTable.update({
            token_hash: newTokenHash,
            expires_at: newExpiry
        }, {
            token_hash: tokenHash,
            device_type,
            user_agent: userAgent
        });
        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }
    static async logout(refreshToken) {
        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");
        const [tokenRow] = await RefreshTokenTable.find({
            token_hash: tokenHash
        });
        if (!tokenRow) {
            return; // silent logout (recommended)
        }
        await RefreshTokenTable.update({ revoked: true }, { token_hash: tokenHash });
    }
}
export class CreateUser {
    static async createUser(payload) {
        if (payload.bodyData.role === "recruiter") {
            const [recruiterUser] = await UsersInsertions.insertRecruiter(payload.bodyData);
            return recruiterUser;
        }
        else if (payload.bodyData.role === "jobseeker") {
            const file = payload.fileData;
            if (!file) {
                throw new AppError(`Resume file is required for Job Seekers`, 400);
            }
            //getBuffer data of file
            let fileBuffer = getBuffer(file);
            if (!fileBuffer || !fileBuffer.content) {
                throw new AppError(`Failed to generate file buffer`, 500);
            }
            const { data } = await upload.uploadFile(fileBuffer);
            const insertData = {
                ...payload.bodyData,
                file: data.url,
                resumePublicId: data.public_id
            };
            const [jobseekerUser] = await UsersInsertions.insertJobSeeker(insertData);
            return jobseekerUser;
        }
    }
}
