import { PoolClient } from "../../../../node_modules/@types/pg/index.js";
import { pool } from "../../../config/database.config.js";
import AppError from "../../../shared/errors/AppError.js";
import { IUserRepository } from "../../../domain/interfaces/repoInterfaces/user.repository.interface.js";

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
    "profile_pic",
    "profile_pic_public_id",
    "profile_pic_upload_status",
    "created_at"
  ];

  // 🔹 Normal usage (no transaction)
  async findByEmail(email: string) {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );

    return result.rows[0] ?? null;
  }

  // 🔹 Supports BOTH (tx + non-tx)
  async findById(userId: number, client?: PoolClient) {
    const db = client ?? pool;

    const result = await db.query(
      `SELECT * FROM users WHERE user_id = $1 LIMIT 1`,
      [userId]
    );

    return result.rows[0] ?? null;
  }

  // 🔹 Supports BOTH
  async update(userId: number, data: Partial<any>, client?: PoolClient) {
    const db = client ?? pool;

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

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      throw new AppError("User not found", 404);
    }

    return result.rows[0];
  }

  // 🔹 Supports BOTH
  async getUserWithSkills(userId: number, client?: PoolClient) {
    const db = client ?? pool;

    const result = await db.query(
      `SELECT 
          u.user_id,
          u.name,
          u.email,
          u.password,
          u.phone_number,
          u.role,
          u.bio,
          u.resume,
          u.resume_public_id,
          u.resume_upload_status,
          u.profile_pic,
          u.profile_pic_public_id,
          u.profile_pic_upload_status,
          u.subscription,
          ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
       FROM users u
       LEFT JOIN user_skills us ON u.user_id = us.user_id
       LEFT JOIN skills s ON s.skill_id = us.skill_id
       WHERE u.user_id = $1
       GROUP BY u.user_id`,
      [userId]
    );

    return result.rows[0] ?? null;
  }
}