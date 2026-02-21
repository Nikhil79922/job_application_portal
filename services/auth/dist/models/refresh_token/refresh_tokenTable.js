import { sql } from "../../library/neonDB/db.js";
export class RefreshTokenModel {
    static async createTable() {
        await sql `
        CREATE TABLE IF NOT EXISTS refresh_tokens(
            token_id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            token_hash VARCHAR(200) UNIQUE NOT NULL,
            device VARCHAR(100) NOT NULL,
            device_type VARCHAR(20) NOT NULL,
            user_agent TEXT,
            revoked BOOLEAN NOT NULL DEFAULT false,
            expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        )
        `;
    }
}
