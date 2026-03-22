import { pool } from "../../../config/database.config.js";
export class PostgresUser_SkillsRepository {
    getDb(client) {
        return client ?? pool;
    }
    async addSkillToUser(userId, skillId, client) {
        const db = this.getDb(client);
        const result = await db.query(`INSERT INTO user_skills (user_id, skill_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, skill_id) DO NOTHING
       RETURNING user_id`, [userId, skillId]);
        return (result.rowCount ?? 0) > 0;
    }
    async deleteSkillToUser(userId, skillName, client) {
        const db = this.getDb(client);
        const result = await db.query(`DELETE FROM user_skills 
         WHERE user_id = $1 
         AND skill_id = (
           SELECT skill_id FROM skills WHERE name = $2
         )
         RETURNING user_id`, [userId, skillName.trim()]);
        return (result.rowCount ?? 0) > 0;
    }
}
