import { Pool, PoolClient } from "pg";
import { pool } from "../../../config/database.config.js";
import AppError from "../../../shared/errors/AppError.js";
import { IApplicantionsRepository } from "../../../domain/interfaces/repoInterfaces/applications.repository.interface.js";

export class PostgresApplicationRepository implements IApplicantionsRepository {

  private allowedColumns = [
    "job_id",
    "applicant_id",
    "applicant_email",
    "status",
    "resume",
    "subscribed"
  ];

  async findAllActive(
    applicant_id: number,
    client?: PoolClient
  ): Promise<any> {
    const db = client ?? pool;

    let query = `
      SELECT 
      a.*,
        j.title AS job_title,
        j.salary AS job_salary,
        j.location AS job_location
      FROM applications a
      JOIN jobs j ON a.job_id = j.job_id
      WHERE a.applicant_id = $1
    `;

    const result = await db.query(query, [applicant_id]);

    return result.rows;
  }

  async findAllOnJobId(jobId:number , client?:PoolClient){
const db =client ?? pool;
const result= await db.query(`
  SELECT * FROM applications WHERE job_id= $1 ORDER BY subscribed DESC , applied_at ASC;
  `,[jobId]);

  return result.rows || null;
  }

  async existingApplicants(job_id: number, client?: PoolClient): Promise<boolean> {
    const db = client ?? pool;

    const result = await db.query(
      `SELECT * FROM applications WHERE job_id = $1`,
      [job_id]
    );

    return result.rows[0];
  }

  async create(data: any, client?: PoolClient) {
    const db = client ?? pool;

    const result = await db.query(
      `
      INSERT INTO applications (
        job_id,
        applicant_id,
        applicant_email,
        resume,
        subscribed
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `,
      [
        data.job_id,
        data.applicant_id,
        data.applicant_email,
        data.resume,
        data.subscribed
      ]
    );

    return result.rows;
  }

  async update(jobId: number, data: Partial<any>, client?: PoolClient) {
    const db = client ?? pool;

    const keys = Object.keys(data);

    if (!keys.length) {
      throw new AppError("Update data required", 400);
    }

    // column whitelist protection
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