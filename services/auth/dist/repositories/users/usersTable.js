import { sql } from "../../library/neonDB/db.js";
import AppError from "../../utlis/AppError.js";
export class UsersFinder {
    static async find(conditions, selectFields = ["user_id"]) {
        const keys = Object.keys(conditions);
        if (!keys.length) {
            throw new Error("Conditions required");
        }
        selectFields.forEach(field => {
            if (!this.allowedColumns.includes(field)) {
                throw new AppError(`Invalid select column: ${field}`, 500);
            }
        });
        keys.forEach(key => {
            if (!this.allowedColumns.includes(key)) {
                throw new AppError(`Invalid condition column: ${key}`, 500);
            }
        });
        const clauses = keys.map((key, index) => `${key} = $${index + 1}`);
        const values = Object.values(conditions);
        const query = `
        SELECT ${selectFields.join(", ")}
        FROM ${this.tableName}
        WHERE ${clauses.join(" AND ")}
      `;
        return await sql.query(query, values);
    }
    static async update(data, conditions) {
        const dataKeys = Object.keys(data);
        const conditionKeys = Object.keys(conditions);
        if (!dataKeys.length || !conditionKeys.length) {
            throw new AppError("Data and conditions required", 500);
        }
        const setClause = dataKeys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");
        const whereClause = conditionKeys
            .map((key, index) => `${key} = $${index + 1 + dataKeys.length}`)
            .join(" AND ");
        const values = [
            ...Object.values(data),
            ...Object.values(conditions),
        ];
        const query = `
    UPDATE ${this.tableName}
    SET ${setClause}
    WHERE ${whereClause}
  `;
        return await sql.query(query, values);
    }
    static async users_skills(email) {
        return await sql `SELECT u.user_id,u.name,u.email,u.password,u.phone_number,u.role,u.bio,u.resume,u.resume_public_id,u.subscription , ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as User_Skills  FROM users as u LEFT JOIN user_skills as us ON u.user_id = us.user_id 
  LEFT JOIN skills as s ON s.skill_id = us.skill_id WHERE email = ${email} GROUP BY u.user_id`;
    }
}
UsersFinder.tableName = 'users';
UsersFinder.allowedColumns = [
    "user_id",
    "name",
    "email",
    "password",
    "phone_number",
    "role",
    "bio",
    "resume",
    "created_at"
];
export class UsersInsertions {
    static async insertRecruiter(data) {
        return await sql `Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${data.name}, ${data.email}, ${data.password} ,${data.phoneNumber}, ${data.role}, ${data.bio} ,${data.file} , ${data.resumePublicId}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`;
    }
    static async insertJobSeeker(data) {
        return await sql `Insert INTO users (name , email , password , phone_number, role, bio, resume, resume_public_id ) VALUES (${data.name}, ${data.email}, ${data.password} ,${data.phoneNumber}, ${data.role}, ${data.bio} ,${data.file} , ${data.resumePublicId}) RETURNING user_id , name , email , phone_number, role , bio , resume, created_at`;
    }
}
