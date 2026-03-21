import AppError from "../../../shared/errors/AppError.js";
export class getUserProfileData {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getData(userId) {
        const userDetails = await this.userRepo.getUserWithSkills(userId);
        if (!userDetails) {
            throw new AppError("User not found ", 401);
        }
        userDetails.skills = userDetails.skills || [];
        return userDetails;
    }
}
