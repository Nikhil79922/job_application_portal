import { updateUserResponseDTO } from "../../../api/dtos/updateUserProfile.schema.js";
export class updateUserDetails {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async updateDetails(paylaod, userDetails) {
        const updateData = {
            name: paylaod.name || userDetails.name,
            phone_number: paylaod.phoneNumber || userDetails.phone_number,
            bio: paylaod.bio || userDetails.bio
        };
        const UpdatedData = await this.userRepo.update(userDetails.user_id, updateData);
        const resData = updateUserResponseDTO.parse(UpdatedData);
        return resData;
    }
}
