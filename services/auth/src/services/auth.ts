import { UsersFinder, UsersInsertions } from "../repositories/users/usersTable.js";
import AppError from "../utlis/AppError.js";
import bcrypt from 'bcrypt'
import { registerSchema, RegisterDTO } from '../dtos/authResgister.schema.js'
import { loginSchema, LoginDTO } from '../dtos/authLogin.schema.js'
import getBuffer from "../utlis/buffer.js";
import { upload } from "./uploadFile.js";
import jwtToken from "./jwtToken.js";
import { forgotDTO } from "../dtos/authForgot.schema copy.js";
import { emailTemp } from "../utlis/emailTemplate.js";
import {  KafkaProducer } from "../library/kafka/producer.js";
import { redisClient } from "../library/redis/index.js";
import { ResetDTO } from "../dtos/authReset.schema copy.js";
import { jwt } from "zod";

export class Auth {
    static async resgister(data: { body: RegisterDTO; file?: Express.Multer.File }) {
        // this.requiredFields(data.body);
        const { name, email, password, phoneNumber } = data.body;
        const existingUser = await UsersFinder.existingUser(email);
        if (existingUser.length > 0) {
            throw new AppError(`User with this email Already exists`, 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const bodyData: RegisterDTO = {
            ...data.body,
            password: hashedPassword
        }
        const payload = {
            bodyData,
            fileData: data.file
        }
        const registedUser = await CreateUser.createUser(payload as any);

        const accessToken = await jwtToken.JWTtoken({ userId: registedUser?.userId }, process.env.SECRET_KEY as string, '1d')
        return {
            registedUser,
            accessToken
        }
    }

    static async logIn(data: LoginDTO) {
        const user = await UsersFinder.users_skills(data.email)
        if (user.length === 0) {
            throw new AppError('Invalid Credentials, Email Not Found', 400)
        }
        const usersObject = user[0];
        const matchPassword = await bcrypt.compare(data.password, usersObject.password)
        if (!matchPassword) {
            throw new AppError(`Invalid Credentials, Password didn't matched for the Email`, 400)
        }
        usersObject.skills = usersObject.skills || [];
        delete usersObject.password;
        const accessToken = await jwtToken.JWTtoken({ userId: usersObject?.userId }, process.env.SECRET_KEY as string, '1d')
        return {
            usersObject,
            accessToken
        }
    }

    static async forgotPassword(data: forgotDTO) {
        const existingUser = await UsersFinder.existingUser(data.email);
        if (existingUser.length === 0) {
            return {message: 'If this email exists ,We have sent a reset link'};
        }
        const resetToken= await jwtToken.JWTtoken({ email: data.email ,type: 'reset'  }, process.env.SECRET_KEY as string, '15min')

        const resetLink= `${process.env.Frontend_Url}/reset/${resetToken}`

        await redisClient.set(`forgot:${data.email}`,resetToken,{
            EX:900
        })
        const message={
            to:data.email,
            subject:"RESET YOUR PASSWORD - HireHeaven",
            html:emailTemp(resetLink)
        }
        KafkaProducer.publish('send-mail',message).catch((err)=>{
            console.error("Failed to send Message",err)
        });
        return {message: 'If this email exists , we have sent a reset link'};
    }

    static async ResetPassword(data: ResetDTO) {
      const decodedToken=await jwtToken.JWTtokenVerify(data.token, process.env.SECRET_KEY as string)
      if(decodedToken?.type !=='reset'){
        throw new AppError('Invalid token type',400);
      }
      const email=decodedToken?.email;
      const storedToken= await redisClient.get(`forgot:${email}`);
      if(!storedToken || storedToken !== data.token ){
        throw new AppError('Token has been expired',400);
      }

      const users= await UsersFinder.existingUser(email);
      if (users.length === 0) {
        throw new AppError('User Not Found',404);
    }
    const user=users[0];
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await UsersFinder.updateUser({email,password:hashedPassword})
    await redisClient.del(`forgot:${email}`)
    return {
        message:'Your password has been updated.'
    }
    }
}

export class CreateUser {
    static async createUser(payload: { bodyData: RegisterDTO, fileData: Express.Multer.File }) {
        if (payload.bodyData.role === "recruiter") {
            const [recruiterUser] = await UsersInsertions.insertRecruiter(payload.bodyData as RegisterDTO);
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
            }
            const [jobseekerUser] = await UsersInsertions.insertJobSeeker(insertData as RegisterDTO);
            return jobseekerUser
        }
    }
}