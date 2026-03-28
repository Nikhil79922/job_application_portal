import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";
import { Users } from "../../../shared/types/user.type.js";
import { SkillsToUserDTO } from "../../../api/dtos/SkillsToUser.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { SkillsRepository } from "../../interfaces/repoInterfaces/skills.repository.interface.js";
import { User_SkillsRepository } from "../../interfaces/repoInterfaces/user_skills.repository.interface.js";
import { executeInTransaction } from "../../../infra/database/transaction.js";

import { performance } from "node:perf_hooks";

export class addUserSKillDetails {
  constructor(
    private userRepo: IUserRepository,
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
      console.log(
        `[TIME] insertOrGetSkill: ${(skillEnd - skillStart).toFixed(2)} ms`
      );

      // 🔹 Add Skill To User
      const userSkillStart = performance.now();

      const wasSkillAdded = await this.userSkillRepo.addSkillToUser(
        userDetails.user_id,
        skillId,
        tx
      );

      const userSkillEnd = performance.now();
      console.log(
        `[TIME] addSkillToUser: ${(userSkillEnd - userSkillStart).toFixed(2)} ms`
      );

      const txEnd = performance.now();
      console.log(
        `[TIME] transaction block: ${(txEnd - txStart).toFixed(2)} ms`
      );

      if (!wasSkillAdded) {
        console.log(
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