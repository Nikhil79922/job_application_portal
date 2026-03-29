import { pool } from "../../../config/database.config.js";

export class JobServiceEnums {
    async createEnums() {
      await pool.query(`
        DO $$
        BEGIN 
          IF NOT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'job_type'
          ) THEN 
            CREATE TYPE job_type AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');
          END IF;
  
          IF NOT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'work_location'
          ) THEN 
            CREATE TYPE work_location AS ENUM ('On-site', 'Remote', 'Hybrid');
          END IF;
  
          IF NOT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = 'application_status'
          ) THEN 
            CREATE TYPE application_status AS ENUM ('Submitted', 'Rejected', 'Hired');
          END IF;
  
        END $$;
      `);
    }
  }