import { PoolClient } from "../../../../node_modules/@types/pg/index.js";
import { pool } from "../../../config/database.config.js";

export class PostgresCompaniesRepository {

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

  async update(companyId: number, data: Partial<any>, client?: PoolClient) {
    const db = client ?? pool;

    const keys = Object.keys(data);

    if (!keys.length) {
      throw new Error("Update data required");
    }

    keys.forEach(key => {
      if (!this.allowedColumns.includes(key)) {
        throw new Error(`Invalid update column: ${key}`);
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
      throw new Error("Company not found");
    }

    return result.rows[0];
  }

}