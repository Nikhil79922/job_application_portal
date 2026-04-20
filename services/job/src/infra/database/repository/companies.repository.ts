import { PoolClient } from "../../../../node_modules/@types/pg/index.js";
import { pool } from "../../../config/database.config.js";
import { ICompaniesRepository } from "../../../domain/interfaces/repoInterfaces/companies.repository.interface.js";
import AppError from "../../../shared/errors/AppError.js";

export class PostgresCompaniesRepository implements ICompaniesRepository {

  private allowedColumns = [
    "company_id",
    "name",
    "description",
    "website",
    "logo",
    "logo_public_id",
    "logo_upload_status",
    "recruiter_id",
    "created_at"
  ];

  async existingCompanies(company_id: number, client?: PoolClient): Promise<boolean> {
    const db = client ?? pool;

    const result = await db.query(
      `SELECT company_id FROM companies WHERE company_id = $1`,
      [company_id]
    );
    return result.rowCount !== 0 ? true : false;
  }

  async companyDetails(company_id: number, client?: PoolClient): Promise<boolean> {
    const db = client ?? pool;

    const result = await db.query(
      `SELECT * FROM companies WHERE company_id = $1`,
      [company_id]
    );
    return result.rows[0];
  }

  async getAll(user_id: number) {
    const result = await pool.query(`
    SELECT * FROM companies WHERE recruiter_id= $1;
    `, [user_id])

    return result.rows;
  }

  async create(data: any, tx = pool) {
    const result = await tx.query(
      `
      INSERT INTO companies (
        name,
        description,
        website,
        recruiter_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        data.name,
        data.description,
        data.website,
        data.recruiter_id,
      ]
    );

    return result.rows[0] ?? null;
  }

  async update(companyId: number, data: Partial<any>, client?: PoolClient) {
    const db = client ?? pool;

    const keys = Object.keys(data);

    if (!keys.length) {
      throw new AppError("Update data required", 400);
    }

    keys.forEach(key => {
      if (!this.allowedColumns.includes(key)) {
        throw new AppError(`Invalid update column: ${key}`, 400);
      }
    });

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = [...Object.values(data), companyId];

    const query = `
      UPDATE companies
      SET ${setClause}
      WHERE company_id = $${keys.length + 1}
      RETURNING *
    `;

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      throw new AppError("Company not found", 404);
    }

    return result.rows[0];
  }

  async delete(companyId: number, userId: number) {

    const result = await pool.query(`
      DELETE FROM companies 
      WHERE company_id = $1 AND 
      recruiter_id = $2
      `, [companyId, userId]);

    if (result.rowCount === 0) {
      throw new AppError("Company not found", 404);
    }

    return result.rowCount;
  }
}