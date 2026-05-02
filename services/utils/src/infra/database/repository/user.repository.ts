import { PoolClient } from "../../../../node_modules/@types/pg/index.js";
import { pool } from "../../../config/database.config.js";

export class PostgresUserRepository{

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

  // 🔹 Supports BOTH
  async update(userId: number, data: Partial<any>, client?: PoolClient) {
    const db = client ?? pool;

    const keys = Object.keys(data);

    if (!keys.length) {
      throw new Error("Update data required");
    }

    keys.forEach(key => {
      if (!this.allowedColumns.includes(key)) {
        throw new Error(`Invalid update column: ${key}`);
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
      throw new Error("User not found");
    }

    return result.rows[0];
  }

}