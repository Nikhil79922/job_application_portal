import { updateProfilePicResponseDTO } from "../../../api/dtos/updateProfilePic.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { Users } from "../../../shared/types/user.type.js";
import getBuffer from "../../../shared/utils/buffer.js";
import { UserEntity } from "../../entities/user.entity.js";
import { IUploadFile } from "../../interfaces/uploadFile.interface.js";
import { IUserRepository } from "../../interfaces/repoInterfaces/user.repository.interface.js";

export class updateProfilePic {
  constructor(
    private userRepo: IUserRepository,
    private fileUpload: IUploadFile
  ) { }

  async updatePic(file: Express.Multer.File, userDetails: Users) {
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
    }
    const uploadResult = await this.fileUpload.uploadFile(payload);

    if (!uploadResult?.data?.url) {
      throw new AppError("Upload failed", 500);
    }

    //Entities introduced
    const userEntity = new UserEntity()
    const updateData = userEntity.updateProfilePic(uploadResult.data.url, uploadResult.data.public_id);
    const UpdatedData: any = await this.userRepo.update(userDetails.user_id, updateData)
    
    const resData = updateProfilePicResponseDTO.parse(UpdatedData);
    return resData;
  }
}