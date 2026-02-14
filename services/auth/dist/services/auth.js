import { UsersFinder, UsersInsertions } from "../repositories/users/usersTable.js";
import AppError from "../utlis/AppError.js";
import bcrypt from 'bcrypt';
import getBuffer from "../utlis/buffer.js";
import { upload } from "./uploadFile.js";
import jwtToken from "./jwtToken.js";
export class Auth {
    static async resgister(data) {
        // this.requiredFields(data.body);
        const { name, email, password, phoneNumber } = data.body;
        const existingUser = await UsersFinder.existingUser(email);
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
        const accessToken = await jwtToken.JWTtoken({ userId: registedUser?.userId }, process.env.SECRET_KEY, '1d');
        return {
            registedUser,
            accessToken
        };
    }
    static async logIn(data) {
        const user = await UsersFinder.users_skills(data.email);
        if (user.length === 0) {
            throw new AppError('Invalid Credentials, Email Not Found', 400);
        }
        const usersObject = user[0];
        const matchPassword = await bcrypt.compare(data.password, usersObject.password);
        if (!matchPassword) {
            throw new AppError(`Invalid Credentials, Password didn't matched for the Email`, 400);
        }
        usersObject.skills = usersObject.skills || [];
        delete usersObject.password;
        const accessToken = await jwtToken.JWTtoken({ userId: usersObject?.userId }, process.env.SECRET_KEY, '1d');
        return {
            usersObject,
            accessToken
        };
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
