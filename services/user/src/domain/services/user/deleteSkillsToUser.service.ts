import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";
import { Users } from "../../../shared/types/user.type.js";
import { SkillsToUserDTO } from "../../../api/dtos/SkillsToUser.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { SkillsRepository } from "../../interfaces/repoInterfaces/skills.repository.interface.js";
import { User_SkillsRepository } from "../../interfaces/repoInterfaces/user_skills.repository.interface.js";
import { executeInTransaction } from "../../../infra/database/transaction.js";

export class deleteUserSKillDetails {
  constructor(
    private userSkillRepo: User_SkillsRepository
  ) { }

  async updateDetails(data: SkillsToUserDTO, userDetails: Users) {

    const result = await this.userSkillRepo.deleteSkillToUser(userDetails.user_id, data.skillName)
    if (!result) {
      throw new AppError(`${data.skillName.trim()} Skill was not found`, 404)
    }
    return {
      message: `${data.skillName.trim()} skill removed successfully`
    };
  }
}