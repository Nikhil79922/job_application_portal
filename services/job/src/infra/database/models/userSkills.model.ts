import { pool } from "../../../config/database.config.js";

export class UserSkillsModel {
  async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_skills(
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, skill_id)
      )
    `);
  }
}