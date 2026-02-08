import { Request, Response } from "express";
import TryCatch from "../utlis/TryCatch.js";
import sendResponse from "../utlis/success.js";
import AppError from "../utlis/AppError.js";
import { sql } from "../utlis/db.js";
import bcrypt from 'bcrypt'
import getBuffer from "../utlis/buffer.js";
import axios from "axios";

export const registerUser = TryCatch(async (req: Request, res: Response) => {
    const { name, email, password, phoneNumber, role, bio, } = req.body;

    const requiredFields = {
        name,
        email,
        password,
        phoneNumber,
        role,
    };
    const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missingFields.length > 0) {
        throw new AppError(
            `Missing required fields: ${missingFields.join(", ")}`,
            400
        );
    }

    const existingUser = await sql`SELECT user_id FROM users WHERE email = ${email}` //return arr
    if (existingUser.length > 0) {
        throw new AppError(`User with this email Already exists`, 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let registeredUser;

    if (role === "recruiter") {
        const [user] = await sql`Insert INTO users (name , email , password , phone_number, role) VALUES (${name}, ${email}, ${hashedPassword} ,${phoneNumber}, ${role}) RETURNING user_id , name , email , phone_number, role , created_at`
        registeredUser = user
    } else if (role === "jobseeker") {
        const file = req.file;
        if (!file) {
            throw new AppError(`Resume file is required for Job Seekers`, 400);
        }
        let fileBuffer = getBuffer(file);
        if (!fileBuffer || !fileBuffer.content) {
            throw new AppError(`Failed to generate file buffer`, 500);
        }
        const {data}= await axios.post(`${process.env.Utils_service}/upload`,{buffer:fileBuffer.content})
        const [user] = await sql`Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${name}, ${email}, ${hashedPassword} ,${phoneNumber}, ${role}, ${bio} ,${data.url} , ${data.public_id}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`
        registeredUser = user
    }
    sendResponse(res, 200, "Resgistered Successfull", registeredUser)
})
