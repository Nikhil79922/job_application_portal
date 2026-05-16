import { updateProfilePicResponseDTO } from "../../../api/dtos/updateProfilePic.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { Users } from "../../../shared/types/user.type.js";
import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";
import { IMessageBroker } from "../../interfaces/infraInterfaces/message-broker.interface.js";

export class updateProfilePic {
  constructor(
    private userRepo: IUserRepository,
    private messageBroker: IMessageBroker
  ) {}

  async updatePic(
    data: { file: Express.Multer.File; checkUpload: boolean },
    userDetails: Users
  )
  {

    if (data.checkUpload === true ) {
      console.log("check worked")
      const userData = await this.userRepo.findById(userDetails.user_id);

      if (userData.profile_pic_upload_status === "success" && userData.profile_pic) {
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
        throw new AppError("Upload not completed yet", 202);
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

        // mark pending
        await this.userRepo.update(userDetails.user_id, {
          profile_pic_upload_status: "pending",
        });

    // convert to base64
    const base64File = data.file.buffer.toString("base64");

    // Kafka publish
    try{

      await this.messageBroker.publish(
        "upload-content",
        {
          entityId:userDetails.user_id,
          entityType:"user",
          uploadType:"profile_pic",
          file:base64File,
          mimeType:data.file.mimetype,
          public_id:userDetails.profile_pic_public_id || null,
        },
        String(userDetails.user_id))
    }catch(err){
      await this.userRepo.update(
        userDetails.user_id,
        {
          profile_pic_upload_status:
            "fail",
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
      message: "Image uploading process initiated",
    };
  }
}