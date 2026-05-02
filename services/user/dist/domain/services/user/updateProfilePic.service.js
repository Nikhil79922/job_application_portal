import { updateProfilePicResponseDTO } from "../../../api/dtos/updateProfilePic.schema.js";
import AppError from "../../../shared/errors/AppError.js";
export class updateProfilePic {
    constructor(userRepo, messageBroker) {
        this.userRepo = userRepo;
        this.messageBroker = messageBroker;
    }
    async updatePic(data, userDetails) {
        if (data.checkUpload) {
            const userData = await this.userRepo.findById(userDetails.user_id);
            if (userData.profile_pic_upload_status === "success") {
                const resData = updateProfilePicResponseDTO.parse(userData);
                return {
                    message: "User profile pic updated successfully",
                    data: resData,
                };
            }
            if (userData.profile_pic_upload_status === "fail") {
                throw new AppError("Upload failed, please try again", 503);
            }
            if (userData.profile_pic_upload_status === "pending") {
                throw new AppError("Upload not completed yet", 409);
            }
        }
        if (!data.file) {
            throw new AppError("Image file is required", 400);
        }
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(data.file.mimetype)) {
            throw new AppError("Only image files are allowed", 400);
        }
        // optional size limit
        if (data.file.size > 5 * 1024 * 1024) {
            throw new AppError("File too large", 400);
        }
        // convert to base64
        const base64File = data.file.buffer.toString("base64");
        // Kafka publish
        this.messageBroker
            .publish("upload-content", {
            entityId: userDetails.user_id,
            entityType: "user",
            uploadType: "profile_pic",
            file: base64File,
            mimeType: data.file.mimetype,
            public_id: userDetails.profile_pic_public_id || null,
        }, String(userDetails.user_id))
            .catch((err) => {
            console.error("Kafka publish failed", err);
        });
        // mark pending
        await this.userRepo.update(userDetails.user_id, {
            profile_pic_upload_status: "pending",
        });
        return {
            message: "Image uploading process initiated",
        };
    }
}
