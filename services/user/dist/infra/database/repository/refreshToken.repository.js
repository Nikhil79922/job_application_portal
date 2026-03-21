import { sql } from "../../../config/database.config.js";
import AppError from "../../../shared/errors/AppError.js";
export class RefreshTokenTable {
    constructor() {
        this.allowedColumns = [
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
    }
    async create(data) {
        const result = await sql `INSERT INTO refresh_tokens (
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
      
          ON CONFLICT (user_id, device_type, user_agent)
          DO UPDATE SET
            token_hash = EXCLUDED.token_hash,
            device = EXCLUDED.device,
            revoked = false,
            expires_at = EXCLUDED.expires_at,
            created_at = NOW()
      
          RETURNING user_id, token_hash, device, device_type, user_agent, revoked, expires_at, created_at
        `;
        return result[0];
    }
    async find(conditions, selectFields = ["user_id"]) {
        const keys = Object.keys(conditions);
        if (!keys.length) {
            throw new AppError(`Conditions required`, 400);
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
    async update(conditions, data) {
        const dataKeys = Object.keys(data);
        const conditionKeys = Object.keys(conditions);
        if (!dataKeys.length || !conditionKeys.length) {
            throw new AppError("Data and conditions required", 400);
        }
        dataKeys.forEach(key => {
            if (!this.allowedColumns.includes(key)) {
                throw new AppError(`Invalid update column: ${key}`, 500);
            }
        });
        conditionKeys.forEach(key => {
            if (!this.allowedColumns.includes(key)) {
                throw new AppError(`Invalid condition column: ${key}`, 500);
            }
        });
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
    async count(conditions) {
        const keys = Object.keys(conditions);
        const clauses = keys.map((key, index) => `${key} = $${index + 1}`);
        const values = Object.values(conditions);
        const query = `
          SELECT COUNT(*) as count
          FROM refresh_tokens
          WHERE ${clauses.join(" AND ")}
        `;
        const result = await sql.query(query, values);
        return Number(result[0].count);
    }
    async revokeAll(userId) {
        if (!userId) {
            throw new AppError("User ID required", 400);
        }
        const query = `
          UPDATE refresh_tokens
          SET revoked = true
          WHERE user_id = $1 AND revoked = false
        `;
        return await sql.query(query, [userId]);
    }
}
