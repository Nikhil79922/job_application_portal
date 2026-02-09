import { sql } from "../utlis/db.js";
import { ResgisterCheck } from '../dtos/auth.js'

export class UsersOperations {
    static async existingUser(email: string) {
        return await sql`SELECT user_id FROM users WHERE email = ${email}`
    }
    static async insertRecruiter(data: ResgisterCheck) {
        return await sql`Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${data.name}, ${data.email}, ${data.password} ,${data.phoneNumber}, ${data.role}, ${data.bio} ,${data.resume} , ${data.resumePublicId}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`
    }
    static async insertJobSeeker(data: ResgisterCheck) {
        return await sql`Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${data.name}, ${data.email}, ${data.password} ,${data.phoneNumber}, ${data.role}, ${data.bio} ,${data.resume} , ${data.resumePublicId}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`
    }
}
