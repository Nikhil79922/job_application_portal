import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";
import { updateUserProfileDTO, updateUserResponseDTO } from "../../../api/dtos/updateUserProfile.schema.js";
import { Users } from "../../../shared/types/user.type.js";

export class updateUserDetails {
    constructor(private userRepo: IUserRepository) { }

    async updateDetails(paylaod: updateUserProfileDTO, userDetails: Users) {
        const updateData = {
            name: paylaod.name || userDetails.name,
            phone_number: paylaod.phoneNumber || userDetails.phone_number,
            bio: paylaod.bio || userDetails.bio
        }
        const UpdatedData: any = await this.userRepo.update(userDetails.user_id, updateData)
        const resData = updateUserResponseDTO.parse(UpdatedData);
        return resData;
    }
}