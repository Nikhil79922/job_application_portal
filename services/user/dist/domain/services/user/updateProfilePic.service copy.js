import { updateProfilePicResponseDTO } from "../../../api/dtos/updateProfilePic.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import getBuffer from "../../../shared/utils/buffer.js";
export class updateProfilePic {
    constructor(userRepo, fileUpload) {
        this.userRepo = userRepo;
        this.fileUpload = fileUpload;
    }
    async updatePic(file, userDetails) {
        if (!file) {
            throw new AppError("Image file is required", 400);
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new AppError("Only image files are allowed", 400);
        }
        const oldPublicId = userDetails.profile_pic_public_id;
        const fileBuffer = getBuffer(file);
        if (!fileBuffer?.content) {
            throw new AppError("Failed to process file", 500);
        }
        const payload = {
            buffer: fileBuffer.content,
            public_id: oldPublicId
        };
        const uploadResult = await this.fileUpload.uploadFile(payload);
        if (!uploadResult?.data?.url) {
            throw new AppError("Upload failed", 500);
        }
        const updateData = {
            profile_pic: uploadResult.data.url,
            profile_pic_public_id: uploadResult.data.public_id,
        };
        const UpdatedData = await this.userRepo.update(userDetails.user_id, updateData);
        const resData = updateProfilePicResponseDTO.parse(UpdatedData);
        return resData;
    }
}
