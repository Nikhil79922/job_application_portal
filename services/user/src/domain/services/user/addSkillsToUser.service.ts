import { Users } from "../../../shared/types/user.type.js";
import { SkillsToUserDTO } from "../../../api/dtos/SkillsToUser.schema.js";
import { SkillsRepository } from "../../interfaces/repoInterfaces/skills.repository.interface.js";
import { User_SkillsRepository } from "../../interfaces/repoInterfaces/user_skills.repository.interface.js";
import { executeInTransaction } from "../../../infra/database/transaction.js";
import logger from "../../../config/logger.js";

import { performance } from "node:perf_hooks";

export class addUserSKillDetails {
  constructor(
    private skillRepo: SkillsRepository,
    private userSkillRepo: User_SkillsRepository
  ) {}

  async updateDetails(data: SkillsToUserDTO, userDetails: Users) {
    const totalStart = performance.now();

    return executeInTransaction(async (tx) => {
      const txStart = performance.now();

      // 🔹 Skill Insert / Get
      const skillStart = performance.now();

      const skillId = await this.skillRepo.insertOrGetSkill(
        data.skillName.trim(),
        tx
      );

      const skillEnd = performance.now();
      logger.debug(
        `[TIME] insertOrGetSkill: ${(skillEnd - skillStart).toFixed(2)} ms`
      );

      // 🔹 Add Skill To User
      const userSkillStart = performance.now();

      const responseTime = Date.now();
      logger.debug(`[addSkillsSer] Response ready: ${responseTime - txStart}ms`);

      const wasSkillAdded = await this.userSkillRepo.addSkillToUser(
        userDetails.user_id,
        skillId,
        tx
      );

      const userSkillEnd = performance.now();
      logger.debug(
        `[TIME] addSkillToUser: ${(userSkillEnd - userSkillStart).toFixed(2)} ms`
      );

      const txEnd = performance.now();
      logger.debug(
        `[TIME] transaction block: ${(txEnd - txStart).toFixed(2)} ms`
      );

      if (!wasSkillAdded) {
        logger.debug(
          `[TIME] TOTAL: ${(performance.now() - totalStart).toFixed(2)} ms`
        );
        return { message: "User already possesses this skill" };
      }

      console.log(
        `[TIME] TOTAL: ${(performance.now() - totalStart).toFixed(2)} ms`
      );

      return {
        message: `User ${data.skillName.trim()} skill added successfully`,
      };
    });
  }
}