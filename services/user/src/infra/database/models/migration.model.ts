import { pool } from "../../../config/database.config.js";

export class MigrationModel {
  async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
  migrations_id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `);
  }
}