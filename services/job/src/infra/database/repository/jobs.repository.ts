import { PoolClient } from "pg";
import { pool } from "../../../config/database.config.js";
import AppError from "../../../shared/errors/AppError.js";

export class PostgresJobsRepository {

  private allowedColumns = [
    "title",
    "description",
    "salary",
    "location",
    "job_type",
    "openings",
    "role",
    "work_location",
    "is_active"
  ];

  async existingJob(job_id: number, client?: PoolClient): Promise<boolean> {
    const db = client ?? pool;

    const result = await db.query(
      `SELECT job_id FROM jobs WHERE job_id = $1`,
      [job_id]
    );

    return result.rows[0].job_id ? true : false;
  }

  async create(data: any, client?: PoolClient) {
    const db = client ?? pool;

    const result = await db.query(
      `
      INSERT INTO jobs (
        title,
        description,
        salary,
        location,
        job_type,
        openings,
        role,
        work_location,
        company_id,
        posted_by_recruiter
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        data.title,
        data.description,
        data.salary,
        data.location,
        data.job_type,
        data.openings,
        data.role,
        data.work_location,
        data.company_id,
        data.posted_by_recruiter,
      ]
    );

    return result.rows[0];
  }

  async update(jobId: number, data: Partial<any>, client?: PoolClient) {
    const db = client ?? pool;

    const keys = Object.keys(data);

    if (!keys.length) {
      throw new AppError("Update data required", 400);
    }

    // 🔒 column whitelist protection
    keys.forEach((key) => {
      if (!this.allowedColumns.includes(key)) {
        throw new AppError(`Invalid update column: ${key}`, 400);
      }
    });

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(data), jobId];

    const query = `
      UPDATE jobs
      SET ${setClause}
      WHERE job_id = $${keys.length + 1}
      RETURNING *
    `;

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      throw new AppError("Job not found", 404);
    }

    return result.rows[0];
  }

  async delete(jobId: number, userId: number) {
    const result = await pool.query(
      `
      DELETE FROM jobs
      WHERE job_id = $1 
      AND posted_by_recruiter = $2
      `,
      [jobId, userId]
    );

    if (result.rowCount === 0) {
      throw new AppError("Job not found or unauthorized", 404);
    }

    return result.rowCount;
  }
}