import AppError from "../../../shared/errors/AppError.js";
import { executeInTransaction } from "../../../infra/database/transaction.js";
export class addUserSKillDetails {
    constructor(userRepo, skillRepo, userSkillRepo) {
        this.userRepo = userRepo;
        this.skillRepo = skillRepo;
        this.userSkillRepo = userSkillRepo;
    }
    async updateDetails(data, userDetails) {
        return executeInTransaction(async (tx) => {
            const user = await this.userRepo.findById(userDetails.user_id, tx);
            if (!user) {
                throw new AppError("User not found", 404);
            }
            const skillId = await this.skillRepo.insertOrGetSkill(data.skillName.trim(), tx);
            const wasSkillAdded = await this.userSkillRepo.addSkillToUser(user.user_id, skillId, tx);
            if (!wasSkillAdded) {
                return { message: "User already possesses this skill" };
            }
            return {
                message: `User ${data.skillName.trim()} skill added successfully`
            };
        });
    }
}
