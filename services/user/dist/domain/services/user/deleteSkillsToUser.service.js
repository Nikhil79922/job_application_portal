import AppError from "../../../shared/errors/AppError.js";
export class deleteUserSKillDetails {
    constructor(userSkillRepo) {
        this.userSkillRepo = userSkillRepo;
    }
    async updateDetails(data, userDetails) {
        const result = await this.userSkillRepo.deleteSkillToUser(userDetails.user_id, data.skillName);
        if (!result) {
            throw new AppError(`${data.skillName.trim()} Skill was not found`, 404);
        }
        return {
            message: `${data.skillName.trim()} skill removed successfully`
        };
    }
}
