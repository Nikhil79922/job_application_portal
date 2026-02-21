import { sql } from "../../library/neonDB/db.js";
import AppError from "../../utlis/AppError.js";
export class RefreshTokenTable {
    static async insertToken(data) {
        return await sql `
        INSERT INTO refresh_tokens(
          user_id,
          token_hash,
          device,
          device_type,
          user_agent,
          expires_at
        )
        VALUES (
          ${data.user_id},
          ${data.token_hash},
          ${data.device},
          ${data.device_type},
          ${data.user_agent},
          ${data.expires_at}
        )
        RETURNING user_id , token_hash , device , device_type , user_agent, revoked , expires_at, created_at
      `;
    }
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
          FROM refresh_tokens
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
    UPDATE refresh_tokens
    SET ${setClause}
    WHERE ${whereClause}
  `;
        return await sql.query(query, values);
    }
}
RefreshTokenTable.allowedColumns = [
    "token_id",
    "user_id",
    "token_hash",
    "device",
    "device_type",
    "revoked",
    "user_agent",
    "expires_at",
    "created_at"
];
