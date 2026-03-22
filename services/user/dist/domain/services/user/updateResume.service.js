import { updateResumeResponseDTO } from "../../../api/dtos/updateResume.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import getBuffer from "../../../shared/utils/buffer.js";
import { UserEntity } from "../../entities/user.entity.js";
export class updateResumeFile {
    constructor(userRepo, fileUpload) {
        this.userRepo = userRepo;
        this.fileUpload = fileUpload;
    }
    async updateResume(file, userDetails) {
        if (!file) {
            throw new AppError("Resume file is required", 400);
        }
        const allowedTypes = ["application/pdf"];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new AppError("Only PDF files allowed", 400);
        }
        const fileBuffer = getBuffer(file);
        if (!fileBuffer?.content) {
            throw new AppError("Failed to process file", 500);
        }
        const oldPublicId = userDetails.resume_public_id;
        const payload = {
            buffer: fileBuffer.content,
            public_id: oldPublicId
        };
        const uploadResult = await this.fileUpload.uploadFile(payload);
        if (!uploadResult?.data?.url) {
            throw new AppError("Upload failed", 500);
        }
        //Entities introduced
        const userEntity = new UserEntity();
        const updateData = userEntity.updateProfilePic(uploadResult.data.url, uploadResult.data.public_id);
        const UpdatedData = await this.userRepo.update(userDetails.user_id, updateData);
        const resData = updateResumeResponseDTO.parse(UpdatedData);
        return resData;
    }
}
