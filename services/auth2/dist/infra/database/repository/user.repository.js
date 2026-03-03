import { sql } from "../../../config/database.config.js";
import AppError from "../../../shared/errors/AppError.js";
export class PostgresUserRepository {
    constructor() {
        this.allowedColumns = [
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
    }
    async findByEmail(email) {
        const result = await sql `
            SELECT * FROM users WHERE email = ${email} LIMIT 1
        `;
        return result[0] ?? null;
    }
    async findById(userId) {
        const result = await sql `
            SELECT * FROM users WHERE user_id = ${userId} LIMIT 1
        `;
        return result[0] ?? null;
    }
    async create(data) {
        const result = await sql `
            INSERT INTO users (
                name,
                email,
                password,
                phone_number,
                role,
                bio,
                resume,
                resume_public_id
            )
            VALUES (
                ${data.name},
                ${data.email},
                ${data.password},
                ${data.phoneNumber},
                ${data.role},
                ${data.bio},
                ${data.file},
                ${data.resumePublicId}
            )
            RETURNING user_id, name, email, phone_number, role, bio, resume, created_at
        `;
        return result[0];
    }
    async update(userId, data) {
        const keys = Object.keys(data);
        if (!keys.length) {
            throw new AppError("Update data required", 400);
        }
        keys.forEach(key => {
            if (!this.allowedColumns.includes(key)) {
                throw new AppError(`Invalid update column: ${key}`, 400);
            }
        });
        const setClause = keys
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");
        const values = [...Object.values(data), userId];
        const query = `
            UPDATE users
            SET ${setClause}
            WHERE user_id = $${keys.length + 1}
        `;
        await sql.query(query, values);
    }
    async getUserWithSkills(email) {
        const result = await sql `
            SELECT 
                u.user_id,
                u.name,
                u.email,
                u.password,
                u.phone_number,
                u.role,
                u.bio,
                u.resume,
                u.resume_public_id,
                u.subscription,
                ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as user_skills
            FROM users u
            LEFT JOIN user_skills us ON u.user_id = us.user_id
            LEFT JOIN skills s ON s.skill_id = us.skill_id
            WHERE u.email = ${email}
            GROUP BY u.user_id
        `;
        return result[0] ?? null;
    }
}
