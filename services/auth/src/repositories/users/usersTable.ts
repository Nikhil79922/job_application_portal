import { sql } from "../../utlis/db.js";
import type { RegisterDTO } from '../../dtos/authResgister.schema.js';

export class UsersFinder {
    static async existingUser(email: string) {
        return await sql`SELECT user_id FROM users WHERE email = ${email}`
    }

    static async users_skills(email: string) {
        return await sql`SELECT u.user_id,u.name,u.email,u.password,u.phone_number,u.role,u.bio,u.resume,u.resume_public_id,u.subscription , ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as User_Skills  FROM users as u LEFT JOIN user_skills as us ON u.user_id = us.user_id 
  LEFT JOIN skills as s ON s.skill_id = us.skill_id WHERE email = ${email} GROUP BY u.user_id`
    }
}

export class UsersInsertions {
    static async insertRecruiter(data: RegisterDTO) {
        return await sql`Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${data.name}, ${data.email}, ${data.password} ,${data.phoneNumber}, ${data.role}, ${data.bio} ,${data.file} , ${data.resumePublicId}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`
    }
    static async insertJobSeeker(data: RegisterDTO) {
        return await sql`Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${data.name}, ${data.email}, ${data.password} ,${data.phoneNumber}, ${data.role}, ${data.bio} ,${data.file} , ${data.resumePublicId}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`
    }
}


export class UserTable {
    static async createTable() {
        await sql`
          CREATE TABLE IF NOT EXISTS users(
             user_id SERIAL PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             email VARCHAR(255) NOT NULL UNIQUE,
             password VARCHAR(255) NOT NULL,
             phone_number VARCHAR(20) NOT NULL,
             role user_role NOT NUll,
             bio TEXT,
             resume VARCHAR(255),
             resume_public_id VARCHAR(255),
             profile_pic VARCHAR(255),
             profile_pic_public_id VARCHAR(255),
             created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
             subscription TIMESTAMPTZ
          )
       `;
    }

    static async createRoleEnum() {
        await sql`
        DO $$
        Begin 
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN 
                CREATE TYPE user_role AS ENUM ('jobseeker','recruiter');
            END IF;
        END $$   
       `;
    }
}