import { createCompanyDTO } from "../../../../api/dtos/createCompany.schema.js";
import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import getBuffer from "../../../../shared/utils/buffer.js";
import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";

export class createCompanySer{
    constructor( private companyRepo : ICompaniesRepository){ }

    async createCompany(data: {
      body: createCompanyDTO;
      file: Express.Multer.File;
    }, userDetails:Users ){
        try {
         const registeredCompany = await this.companyRepo.create(data.body);
          if (registeredCompany.logo_upload_status == 'pending' || registeredCompany.logo_upload_status == 'fail') {
            delete registeredCompany.logo;
          }

          const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

          if (!allowedTypes.includes(data.file.mimetype)) {
            throw new AppError("Only image files are allowed", 400);
          }
         // fire and forget
         void this.nonBlockingUploadOps(data.file, userDetails);

        } catch (error: any) {
            if (error.code === "23505") {
              throw new AppError("Company with this same name already exists ", 409);
            }
            throw error;
          }
    }


    async nonBlockingUploadOps(file: any, userDetails: Users) {
      try {
        const oldPublicId = userDetails.profile_pic_public_id;
       const fileBuffer = getBuffer(file);
        if (!fileBuffer?.content) {
          await this.companyRepo.update(userDetails.user_id, {
            profile_pic_upload_status: "fail",
          });
          return;
        }
        await this.uploadProficPic(fileBuffer, 3, userDetails.user_id , oldPublicId);
      } catch (err) {
        console.error("Upload failed completely", err);
      }
    }
  
    async uploadProficPic(
      buffer: any,
      retry: number,
      userId: number,
      oldPublicId:string | null
    ): Promise<void> {
      try {
  
        const payload = {
          buffer: buffer.content,
          public_id: oldPublicId
        }
        const uploadResult = await this.fileUpload.uploadFile(payload);
    
        if (!uploadResult?.data?.url) {
          throw new Error("Upload failed");
        }
    
        //Entities introduced
        const userEntity = new UserEntity()
        const updateData = userEntity.updateProfilePic(uploadResult.data.url, uploadResult.data.public_id, 'success');
        const updatedData: any = await this.userRepo.update(userId, updateData)
        if(!updatedData){
          throw new Error("User Deatils Update Fail");
        }
        console.log("Profile Image Uploaded!")
      } catch (err) {
        console.error(`Upload retry failed | userId=${userId} | retries left=${retry}`, err);
  
        if (retry <= 0) {
          await this.userRepo.update(userId, {
            profile_pic_upload_status: "fail",
          });
          return;
        }
  
        const delay = Math.pow(2, retry) * 1000;
        await new Promise(res => setTimeout(res, delay));
  
        return this.uploadProficPic(buffer, retry - 1, userId,oldPublicId);
      }
    }
}