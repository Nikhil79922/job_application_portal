import { pool } from "../../../config/database.config.js";
import type { RegisterDTO } from "../../../api/dtos/authResgister.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { IUserRepository } from "../../../domain/interfaces/user.repository.interface.js";

export class PostgresUserRepository implements IUserRepository {

    private allowedColumns = [
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

    async findByEmail(email: string) {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1 LIMIT 1`,
            [email]
        );
        return result.rows[0] ?? null;
    }
    async findById(userId: number) {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1 LIMIT 1`,
            [userId]
        );
         return result.rows[0] ?? null;
    }

    async create(data: RegisterDTO & { role: string } , tx=pool) {
        const result = await tx.query(
          `
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
          `,
          [
            data.name,
            data.email,
            data.password,
            data.phoneNumber,
            data.role,
            data.bio,
            data.file,             
            data.resumePublicId,   
          ]
        );
      
        return result.rows[0] ?? null;
      }

    async update(userId: number, data: Partial<any>) {
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

    async getUserWithSkills(email: string) {
        const result = await pool.query(
          `
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
            count(rt.token_id) FILTER (WHERE revoked = false) as sessions
          FROM users u
          LEFT JOIN refresh_tokens rt ON rt.user_id = u.user_id
          WHERE u.email = $1
          GROUP BY u.user_id
          `,
          [email]
        );
        return result.rows[0] ?? null;
      }
}