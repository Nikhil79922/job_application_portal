import { updateResumeResponseDTO } from "../../../api/dtos/updateResume.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { Users } from "../../../shared/types/user.type.js";
import getBuffer from "../../../shared/utils/buffer.js";
import { IUploadFile } from "../../interfaces/uploadFile.interface.js";
import { IUserRepository } from "../../interfaces/user.repository.interface.js";

export class updateResumeFile {
    constructor(
        private userRepo: IUserRepository,
        private fileUpload: IUploadFile
    ) { }

    async updateResume( file: Express.Multer.File , userDetails: Users) {   
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
        const oldPublicId=userDetails.resume_public_id;
          const payload={
            buffer:fileBuffer.content,
            public_id:oldPublicId
          }
          const uploadResult = await this.fileUpload.uploadFile(payload);
        
          if (!uploadResult?.data?.url) {
            throw new AppError("Upload failed", 500);
          }
          const updateData = {
            resume : uploadResult.data.url,
            resume_public_id :  uploadResult.data.public_id,
            }
        const UpdatedData: any = await this.userRepo.update(userDetails.user_id, updateData)
        const resData = updateResumeResponseDTO.parse(UpdatedData);
        return resData;
    }
}