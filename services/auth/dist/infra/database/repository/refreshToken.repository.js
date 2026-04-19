import { pool } from "../../../config/database.config.js";
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
    async create(data, tx = pool) {
        const result = await tx.query(`
      INSERT INTO refresh_tokens (
        user_id,
        token_hash,
        device,
        device_type,
        user_agent,
        expires_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, token_hash, device, device_type, user_agent, revoked, expires_at, created_at
      `, [
            data.user_id,
            data.token_hash,
            data.device,
            data.device_type,
            data.user_agent,
            data.expires_at,
        ]);
        return result.rows[0];
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
        const result = await pool.query(query, values);
        return result.rows;
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
        const result = await pool.query(query, values);
        return result.rows;
    }
    // async count(conditions: Record<string, any>) {
    //   const keys = Object.keys(conditions);
    //   const clauses = keys.map(
    //     (key, index) => `${key} = $${index + 1}`
    //   );
    //   const values = Object.values(conditions);
    //   const query = `
    //         SELECT 1
    //         FROM refresh_tokens
    //         WHERE ${clauses.join(" AND ")}
    //         LIMIT 10;
    //       `;
    //   const result = await pool.query(query, values);
    //   return result.rowCount;
    // }
    async revokeAll(userId) {
        if (!userId) {
            throw new AppError("User ID required", 400);
        }
        const query = `
          UPDATE refresh_tokens
          SET revoked = true
          WHERE user_id = $1 
        `;
        await pool.query(query, [userId]);
    }
    async revokeOne(tokenHash) {
        if (!tokenHash) {
            throw new AppError("Refresh Token Required", 400);
        }
        const query = `
    UPDATE refresh_tokens
    SET revoked = true
 WHERE token_hash = $1
      AND revoked = false
      AND expires_at > NOW()
  `;
        const result = await pool.query(query, [tokenHash]);
        if (result.rowCount === 0) {
            throw new AppError("Invalid or expired refresh token", 400);
        }
    }
    async deleteOldest(userId) {
        const query = `
      UPDATE refresh_tokens
      SET revoked = true
      WHERE token_id = (
        SELECT token_id
        FROM refresh_tokens
        WHERE user_id = $1
          AND revoked = false
        ORDER BY created_at ASC
        LIMIT 1
      )
      RETURNING *;
    `;
        const result = await pool.query(query, [userId]);
        if (result.rowCount === 0) {
            throw new AppError("No active session found", 400);
        }
        else {
            return true;
        }
    }
}
