import { updateResumeResponseDTO } from "../../../api/dtos/updateResume.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import getBuffer from "../../../shared/utils/buffer.js";
import { UserEntity } from "../../entities/user.entity.js";
export class updateResumeFile {
    constructor(userRepo, fileUpload) {
        this.userRepo = userRepo;
        this.fileUpload = fileUpload;
    }
    async updateResume(data, userDetails) {
        if (data.checkUpload) {
            const userData = await this.userRepo.findById(userDetails.user_id);
            if (userData.profile_pic_upload_status === "success") {
                const resData = updateResumeResponseDTO.parse(userData);
                return {
                    message: 'User Resume updated successfully',
                    data: resData
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
            throw new AppError("Resume file is required", 400);
        }
        const allowedTypes = ["application/pdf"];
        if (!allowedTypes.includes(data.file.mimetype)) {
            throw new AppError("Only PDF files allowed", 400);
        }
        // fire and forget
        void this.nonBlockingUploadOps(data.file, userDetails);
        return {
            message: "Resume uploading process initiated"
        };
    }
    async nonBlockingUploadOps(file, userDetails) {
        try {
            const oldPublicId = userDetails.profile_pic_public_id;
            const fileBuffer = getBuffer(file);
            if (!fileBuffer?.content) {
                await this.userRepo.update(userDetails.user_id, {
                    resume_upload_status: "fail",
                });
                return;
            }
            await this.uploadProficPic(fileBuffer, 3, userDetails.user_id, oldPublicId);
        }
        catch (err) {
            console.error("Upload failed ", err);
        }
    }
    async uploadProficPic(buffer, retry, userId, oldPublicId) {
        try {
            const payload = {
                buffer: buffer.content,
                public_id: oldPublicId
            };
            const uploadResult = await this.fileUpload.uploadFile(payload);
            if (!uploadResult?.data?.url) {
                throw new Error("Upload failed");
            }
            //Entities introduced
            const userEntity = new UserEntity();
            const updateData = userEntity.updateResume(uploadResult.data.url, uploadResult.data.public_id, 'success');
            const updatedData = await this.userRepo.update(userId, updateData);
            if (!updatedData) {
                throw new Error("User Deatils Update Fail");
            }
            console.log("Resume Uploaded!");
        }
        catch (err) {
            console.error(`Upload retry failed | userId=${userId} | retries left=${retry}`, err);
            if (retry <= 0) {
                await this.userRepo.update(userId, {
                    resume_upload_status: "fail",
                });
                return;
            }
            const delay = Math.pow(2, retry) * 1000;
            await new Promise(res => setTimeout(res, delay));
            return this.uploadProficPic(buffer, retry - 1, userId, oldPublicId);
        }
    }
}
