import { Users } from "../../../shared/types/user.type.js";
import { SkillsToUserDTO } from "../../../api/dtos/createCompany.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { User_SkillsRepository } from "../../interfaces/repoInterfaces/user_skills.repository.interface.js";

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