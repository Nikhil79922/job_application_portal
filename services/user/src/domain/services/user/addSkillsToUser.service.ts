import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";
import { Users } from "../../../shared/types/user.type.js";
import { SkillsToUserDTO } from "../../../api/dtos/SkillsToUser.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { SkillsRepository } from "../../interfaces/repoInterfaces/skills.repository.interface.js";
import { User_SkillsRepository } from "../../interfaces/repoInterfaces/user_skills.repository.interface.js";
import { executeInTransaction } from "../../../infra/database/transaction.js";

export class addUserSKillDetails {
    constructor(
      private userRepo: IUserRepository,
      private skillRepo: SkillsRepository,
      private userSkillRepo: User_SkillsRepository
    ) {}
  
    async updateDetails(data: SkillsToUserDTO, userDetails: Users) {
  
      return executeInTransaction(async (tx) => {
  
        const user = await this.userRepo.findById(userDetails.user_id,tx);
        if (!user) {
          throw new AppError("User not found", 404);
        }
  
        const skillId = await this.skillRepo.insertOrGetSkill(
          data.skillName.trim(),
          tx
        );
  
        const wasSkillAdded = await this.userSkillRepo.addSkillToUser(
          user.user_id,
          skillId,
          tx
        );
  
        if (!wasSkillAdded) {
          return { message: "User already possesses this skill" };
        }
  
        return {
          message: `User ${data.skillName.trim()} skill added successfully`
        };
      });
    }
  }