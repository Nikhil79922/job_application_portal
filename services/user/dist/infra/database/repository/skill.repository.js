import { pool } from "../../../config/database.config.js";
export class PostgresSkillsRepository {
    async insertOrGetSkill(skillName, client) {
        const db = client ?? pool;
        const result = await db.query(`INSERT INTO skills (name)
       VALUES ($1)
       ON CONFLICT (name)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING skill_id`, [skillName]);
        return result.rows[0].skill_id;
    }
}
