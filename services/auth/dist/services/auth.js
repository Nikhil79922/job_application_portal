import { UsersFinder, UsersInsertions } from "../repositories/users/usersTable.js";
import AppError from "../utlis/AppError.js";
import bcrypt from 'bcrypt';
import getBuffer from "../utlis/buffer.js";
import { upload } from "./uploadFile.js";
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
        return await this.createUser(payload);
    }
    // static requiredFields(checkData: RegisterDTO) {
    //     const { name, email, password, phoneNumber, role } = checkData;
    //     const requiredFields = {
    //         name,
    //         email,
    //         password,
    //         phoneNumber,
    //         role,
    //     };
    //     const missingFields = Object.entries(requiredFields)
    //         .filter(([_, value]) =>
    //             value === undefined || value === null || value === ""
    //         )
    //         .map(([key]) => key)
    //     if (missingFields.length > 0) {
    //         throw new AppError(
    //             `Missing required fields: ${missingFields.join(", ")}`, 400);
    //     }
    // }
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
            const { data } = await upload.uploadFile(fileBuffer.content);
            const insertData = {
                ...payload.bodyData,
                resume: data.url,
                resumePublicId: data.public_id
            };
            const [jobseekerUser] = await UsersInsertions.insertJobSeeker(insertData);
            return jobseekerUser;
        }
    }
}
