import { pool } from "../../../config/database.config.js";
export class RefreshTokenModel {
    async createTable() {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          token_id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
          token_hash VARCHAR(200) UNIQUE NOT NULL,
          device VARCHAR(100) NOT NULL,
          device_type VARCHAR(20) NOT NULL,
          user_agent TEXT,
          revoked BOOLEAN NOT NULL DEFAULT false,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
    }
}
