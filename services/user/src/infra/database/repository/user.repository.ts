import { sql } from "../../../config/database.config.js";
import AppError from "../../../shared/errors/AppError.js";
import { IUserRepository } from "../../../domain/interfaces/user.repository.interface.js";
import { Users } from "../../../shared/types/user.type.js";

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
        "profile_pic",
        "profile_pic_public_id",
        "created_at"
    ];

    async findByEmail(email: string) {
        const result = await sql`
            SELECT * FROM users WHERE email = ${email} LIMIT 1
        `;
        return result[0] ?? null;
    }

    async findById(userId: string) {
        const result = await sql`
            SELECT * FROM users WHERE user_id = ${userId} LIMIT 1
        `;
        return result[0] ?? null;
    }

    async update(userId: string, data: Partial<any>) {
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
        RETURNING *
    `;

    const result:any = await sql.query(query, values);
    if (result.rowCount === 0) {
        throw new AppError("User not found", 404);
    }
    return result[0];
}

    async getUserWithSkills(userId: number) {
        const result = await sql`
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
                u.profile_pic,
                u.profile_pic_public_id,
                u.subscription,
                ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
            FROM users u
            LEFT JOIN user_skills us ON u.user_id = us.user_id
            LEFT JOIN skills s ON s.skill_id = us.skill_id
            WHERE u.user_id = ${userId}
            GROUP BY u.user_id
        `;

        return result[0] ?? null;
    }
}