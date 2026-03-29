import { pool } from "../../../config/database.config.js";

export class CompaniesModel {
    async createTable() {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS companies (
                company_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                description TEXT NOT NULL,
                website VARCHAR(500) NOT NULL,
                logo VARCHAR(500),
                logo_public_id VARCHAR(500),
                logo_upload_status file_upload_status DEFAULT 'pending',
          
                recruiter_id INTEGER NOT NULL 
                    REFERENCES users(user_id) 
                    ON DELETE CASCADE,
          
                created_at TIMESTAMP DEFAULT NOW()
            );
          
            CREATE INDEX IF NOT EXISTS idx_companies_recruiter_id 
            ON companies(recruiter_id);
          `);
    }

}