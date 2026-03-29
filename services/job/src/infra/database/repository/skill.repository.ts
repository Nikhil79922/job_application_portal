import { PoolClient } from "../../../../node_modules/@types/pg/index.js";
import { pool } from "../../../config/database.config.js";
import { SkillsRepository } from "../../../domain/interfaces/repoInterfaces/skills.repository.interface.js";

export class PostgresSkillsRepository implements SkillsRepository {

  async insertOrGetSkill(skillName: string, client?: PoolClient): Promise<number> {
    const db = client ?? pool;

    const result = await db.query(
      `INSERT INTO skills (name)
       VALUES ($1)
       ON CONFLICT (name)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING skill_id`,
      [skillName]
    );

    return result.rows[0].skill_id;
  }
}