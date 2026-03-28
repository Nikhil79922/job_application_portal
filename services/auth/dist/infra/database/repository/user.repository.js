import { pool } from "../../../config/database.config.js";
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
            "resume_public_id",
            "resume_upload_status",
            "created_at"
        ];
    }
    async findByEmail(email) {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]);
        return result.rows[0] ?? null;
    }
    async findById(userId) {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [userId]);
        return result.rows[0] ?? null;
    }
    async create(data) {
        const result = await pool.query(`
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
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING user_id, name, email, phone_number, role, bio, resume, resume_upload_status, created_at
          `, [
            data.name,
            data.email,
            data.password,
            data.phoneNumber,
            data.role,
            data.bio,
            data.file,
            data.resumePublicId,
        ]);
        return result.rows[0] ?? null;
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
        await pool.query(query, values);
    }
    async getUserWithSkills(email) {
        const result = await pool.query(`
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
          WHERE u.email = $1
          GROUP BY u.user_id
          `, [email]);
        return result.rows[0] ?? null;
    }
}
