import { updateResumeResponseDTO } from "../../../api/dtos/updateResume.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { Users } from "../../../shared/types/user.type.js";
import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";
import { IMessageBroker } from "../../interfaces/infraInterfaces/message-broker.interface.js";
import sendResponse from "../../../shared/constants/successRes.js";
import logger from "../../../config/logger.js";

export class updateResumeFile {
  constructor(
    private userRepo: IUserRepository,
    private messageBroker: IMessageBroker
  ) {}

  async updateResume(
    data: { file: Express.Multer.File; checkUpload: boolean },
    userDetails: Users
  ) {
    if (data.checkUpload) {
      const userData = await this.userRepo.findById(userDetails.user_id);

      // FIXED (resume status)
      if (userData.resume_upload_status === "success" && userData.resume) {
        const resData = updateResumeResponseDTO.parse(userData);
        return {
          message: "User Resume updated successfully",
          data: resData,
        };
      }

      if (userData.resume_upload_status === "fail") {
        throw new AppError("Upload failed, please try again", 503);
      }

      if (userData.resume_upload_status === "pending") {
        throw new AppError("Upload not completed yet", 202);
      }
    }

    if (!data.file) {
      throw new AppError("Resume file is required", 400);
    }

    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(data.file.mimetype)) {
      throw new AppError("Only PDF files allowed", 400);
    }

    // optional size check
    if (data.file.size > 5 * 1024 * 1024) {
      throw new AppError("File too large", 400);
    }

        // mark pending
        await this.userRepo.update(userDetails.user_id, {
          resume_upload_status: "pending",
        });

    // Convert to base64
    const base64File = data.file.buffer.toString("base64");

    // Kafka publish
    try{

      await this.messageBroker
      .publish(
        "upload-content",
        {
          entityId: userDetails.user_id,
          entityType: "user",
          uploadType: "resume",
          file: base64File,
          mimeType: data.file.mimetype,
          public_id: userDetails.resume_public_id || null,
        },
        String(userDetails.user_id))
      }catch(err){
      await this.userRepo.update(
        userDetails.user_id,
        {
          resume_upload_status:"fail",
        }
      )
  
      console.error(
        "Kafka publish failed",
        err
      )
  
      throw new AppError(
        "Unable to process image upload",
        500
      )
    }

    return {
      message: "Resume uploading process initiated",
    };
  }
}