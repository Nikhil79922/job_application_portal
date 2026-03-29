import { pool } from "../../../config/database.config.js";

export class JobsModel {
    async createTable() {
        await pool.query(`
              CREATE TABLE IF NOT EXISTS jobs (
        job_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        salary NUMERIC(10,2) NOT NULL,
        location VARCHAR(500) NOT NULL,
        job_type job_type NOT NULL,
        openings INTEGER NOT NULL,
        role VARCHAR(255) NOT NULL,
        work_location work_location NOT NULL,
  
        company_id INTEGER NOT NULL 
            REFERENCES companies(company_id) 
            ON DELETE CASCADE,

        posted_by_recruiter INTEGER NOT NULL 
            REFERENCES users(user_id) 
            ON DELETE CASCADE,     
               
        created_at TIMESTAMP DEFAULT NOW(),
        is_active BOOLEAN NOT NULL DEFAULT true
    );


    CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
    CREATE INDEX IF NOT EXISTS idx_jobs_job_type ON jobs(job_type);
    CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
          `);
    }

}



  