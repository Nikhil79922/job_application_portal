import { PoolClient } from "pg";
import { pool } from "../../../config/database.config.js";
import { User_SkillsRepository } from "../../../domain/interfaces/repoInterfaces/user_skills.repository.interface.js";

export class PostgresUser_SkillsRepository implements User_SkillsRepository {

  private getDb(client?: PoolClient) {
    return client ?? pool;
  }

  async addSkillToUser(userId: number, skillId: number, client?: PoolClient): Promise<boolean> {
    const db = this.getDb(client);

    const result = await db.query(
      `INSERT INTO user_skills (user_id, skill_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, skill_id) DO NOTHING
       RETURNING user_id`,
      [userId, skillId]
    );

    return (result.rowCount ?? 0) > 0;
  }


  async deleteSkillToUser(userId: number, skillName:string, client?: PoolClient): Promise<boolean> {
    const db = this.getDb(client);

    const result = await db.query(
        `DELETE FROM user_skills 
         WHERE user_id = $1 
         AND skill_id = (
           SELECT skill_id FROM skills WHERE name = $2
         )
         RETURNING user_id`,
        [userId, skillName.trim()]
      );

    return (result.rowCount ?? 0) > 0;
  }
}