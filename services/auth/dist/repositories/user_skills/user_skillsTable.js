import { sql } from "../../utlis/db.js";
export class UserSkillsTable {
    static async createTable() {
        await sql `
        CREATE TABLE IF NOT EXISTS user_skills(
           user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
           skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
           PRIMARY KEY (user_id,skill_id)
     )
     `;
    }
}
