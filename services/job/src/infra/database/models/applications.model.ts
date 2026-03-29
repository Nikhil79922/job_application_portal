import { pool } from "../../../config/database.config.js";

export class ApplicationsModel {
    async createTable() {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS applications (
            application_id SERIAL PRIMARY KEY,
  
            job_id INTEGER NOT NULL 
                REFERENCES jobs(job_id) 
                ON DELETE CASCADE,
  
            applicant_id INTEGER NOT NULL 
                REFERENCES users(user_id) 
                ON DELETE CASCADE,
  
            applicant_email VARCHAR(255) NOT NULL,
  
            status application_status NOT NULL DEFAULT 'Submitted',
            resume VARCHAR(500) NOT NULL,
  
            applied_at TIMESTAMP DEFAULT NOW(),
            subscribed BOOLEAN NOT NULL DEFAULT false,
  
            UNIQUE (job_id, applicant_id)
        );
      `);
    }
  }