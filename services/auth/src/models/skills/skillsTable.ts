import { sql } from "../../library/neonDB/db.js";

export class SkillsModel {
    static async createTable() {
        await sql`
          CREATE TABLE IF NOT EXISTS skills(
             skill_id SERIAL PRIMARY KEY,
             name VARCHAR(100) NOT NULL UNIQUE
       )
       `;
    }

}