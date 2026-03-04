import AppError from "../../shared/errors/AppError.js";
import { env } from "../../config/env.js";
import { emailTemp } from '../../shared/utils/emailTemplate.js';
import getBuffer from "../../shared/utils/buffer.js";
export class Auth {
    constructor(userRepo, refreshRepo, passwordService, tokenService, cacheService, messageBroker, fileUpload
    // private deviceInfo: IDeviceService
    ) {
        this.userRepo = userRepo;
        this.refreshRepo = refreshRepo;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
        this.cacheService = cacheService;
        this.messageBroker = messageBroker;
        this.fileUpload = fileUpload;
    }
    async register(data) {
        const { body, file, deviceInfo, userAgent } = data;
        const existingUser = await this.userRepo.findByEmail(body.email);
        if (existingUser) {
            throw new AppError("User with this email already exists", 409);
        }
        const hashedPassword = await this.passwordService.hash(body.password);
        let bodyData = {
            ...body,
            password: hashedPassword,
        };
        // Upload resume only for jobseekers
        if (body.role === "jobseeker") {
            if (!file) {
                throw new AppError("Resume file is required for job seekers", 400);
            }
            const fileBuffer = getBuffer(file);
            if (!fileBuffer || !fileBuffer.content) {
                throw new AppError("Failed to generate file buffer", 500);
            }
            const uploadResult = await this.fileUpload.uploadFile(fileBuffer);
            if (!uploadResult?.data?.url || !uploadResult?.data?.public_id) {
                throw new AppError("File upload failed", 500);
            }
            bodyData.file = uploadResult.data.url;
            bodyData.resumePublicId = uploadResult.data.public_id;
        }
        const registeredUser = await this.userRepo.create(bodyData);
        const accessToken = await this.tokenService.generateAccessToken({
            userId: registeredUser.user_id,
        });
        const rawRefreshToken = this.tokenService.generateRefreshToken();
        const tokenHash = this.tokenService.hashToken(rawRefreshToken);
        await this.refreshRepo.create({
            user_id: registeredUser.user_id,
            token_hash: tokenHash,
            device: deviceInfo.device,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
            expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });
        return {
            registeredUser,
            accessToken,
            refreshToken: rawRefreshToken,
        };
    }
    async login(data) {
        const { dto, deviceInfo, userAgent } = data;
        const { email, password } = dto;
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials", 400);
        }
        const isMatch = await this.passwordService.compare(password, user.password);
        if (!isMatch) {
            throw new AppError("Invalid credentials", 400);
        }
        const accessToken = await this.tokenService.generateAccessToken({
            userId: user.user_id,
        });
        const rawRefreshToken = this.tokenService.generateRefreshToken();
        const tokenHash = this.tokenService.hashToken(rawRefreshToken);
        const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const existingToken = await this.refreshRepo.find({
            user_id: user.user_id,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
        });
        if (existingToken) {
            await this.refreshRepo.update({
                user_id: user.user_id,
                device_type: deviceInfo.deviceType,
                user_agent: userAgent,
            }, {
                token_hash: tokenHash,
                expires_at: expiryDate,
                revoked: false,
            });
        }
        else {
            await this.refreshRepo.create({
                user_id: user.user_id,
                token_hash: tokenHash,
                device: deviceInfo.device,
                device_type: deviceInfo.deviceType,
                user_agent: userAgent,
                expires_at: expiryDate,
            });
        }
        const { password: _, ...safeUser } = user;
        return {
            user: safeUser,
            accessToken,
            refreshToken: rawRefreshToken,
        };
    }
    async forgotPassword(data) {
        const { email } = data;
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            return { message: "If this email exists, we have sent a reset link" };
        }
        const resetToken = await this.tokenService.generateAccessToken({
            email,
            type: "reset",
        });
        await this.cacheService.set(`forgot:${email}`, resetToken, 900);
        const resetLink = `${env.Frontend_Url}/reset/${resetToken}`;
        await this.messageBroker.publish("send-mail", {
            to: email,
            subject: "RESET YOUR PASSWORD - HireHeaven",
            html: emailTemp(resetLink),
        });
        return {
            message: "If this email exists, we have sent a reset link",
        };
    }
    async resetPassword(data) {
        const { token, password } = data;
        const decoded = await this.tokenService.verify(token);
        if (!decoded || decoded.type !== "reset") {
            throw new AppError("Invalid or expired token", 400);
        }
        const email = decoded.email;
        const storedToken = await this.cacheService.get(`forgot:${email}`);
        if (!storedToken || storedToken !== token) {
            throw new AppError("Invalid or expired token", 400);
        }
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        const hashedPassword = await this.passwordService.hash(password);
        await this.userRepo.update(user.user_id, { password: hashedPassword });
        await this.cacheService.delete(`forgot:${email}`);
        return {
            message: "Your password has been updated.",
        };
    }
    async refreshToken(data) {
        const { refreshToken, deviceInfo, userAgent } = data;
        const tokenHash = this.tokenService.hashToken(refreshToken);
        const tokenRow = await this.refreshRepo.find({
            token_hash: tokenHash,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
        });
        if (!tokenRow) {
            throw new AppError("Invalid refresh token", 401);
        }
        if (tokenRow.revoked) {
            throw new AppError("Invalid refresh token", 401);
        }
        if (new Date() > tokenRow.expires_at) {
            throw new AppError("Invalid refresh token", 401);
        }
        const accessToken = await this.tokenService.generateAccessToken({
            userId: tokenRow.user_id,
        });
        const newRefreshToken = this.tokenService.generateRefreshToken();
        const newTokenHash = this.tokenService.hashToken(newRefreshToken);
        const newExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        await this.refreshRepo.update({
            token_hash: tokenHash,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
        }, {
            token_hash: newTokenHash,
            expires_at: newExpiry,
            revoked: false,
        });
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(refreshToken) {
        const tokenHash = this.tokenService.hashToken(refreshToken);
        const tokenRow = await this.refreshRepo.find({
            token_hash: tokenHash,
        });
        if (!tokenRow) {
            return; // silent logout
        }
        await this.refreshRepo.update({ token_hash: tokenHash }, { revoked: true });
    }
}
