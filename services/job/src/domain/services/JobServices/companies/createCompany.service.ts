import { createCompanyDTO } from "../../../../api/dtos/createCompany.schema.js";
import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import getBuffer from "../../../../shared/utils/buffer.js";
import { CompanyEntity } from "../../../entities/company.entity.js";
import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";
import { IUploadFile } from "../../../interfaces/infraInterfaces/uploadFile.interface.js";

export class createCompanySer{
    constructor( 
      private companyRepo : ICompaniesRepository,
      private fileUpload : IUploadFile
    ) { }

    async createCompany(data: {
      body: createCompanyDTO;
      file: Express.Multer.File;
    }, userDetails:Users ){
        try {
          const insert= {...data.body,recruiter_id:userDetails.user_id}
         const registeredCompany = await this.companyRepo.create(insert);
          if (registeredCompany.logo_upload_status == 'pending' || registeredCompany.logo_upload_status == 'fail') {
            delete registeredCompany.logo;
          }

          const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

          if (!allowedTypes.includes(data.file.mimetype)) {
            throw new AppError("Only image files are allowed", 400);
          }
         // fire and forget
         void this.nonBlockingUploadOps(data.file, registeredCompany);
return registeredCompany;
        } catch (error: any) {
            if (error.code === "23505") {
              throw new AppError("Company with this same name already exists ", 409);
            }
            throw error;
          }
    }


    async nonBlockingUploadOps(file: any, registeredCompany: any) {
      try {
        const oldPublicId = registeredCompany.logo_public_id;
       const fileBuffer = getBuffer(file);
        if (!fileBuffer?.content) {
          await this.companyRepo.update(registeredCompany.company_id, {
            logo_upload_status: "fail",
          });
          return;
        }
        await this.uploadLogoPic(fileBuffer, 3, registeredCompany.company_id , oldPublicId);
      } catch (err) {
        console.error("Upload failed completely", err);
      }
    }
  
    async uploadLogoPic(
      buffer: any,
      retry: number,
      companyId: number,
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
        const companyEntity = new CompanyEntity()
        const updateData = companyEntity.updatelogoPic(uploadResult.data.url, uploadResult.data.public_id, 'success');
        const updatedData: any = await this.companyRepo.update(companyId, updateData)
        if(!updatedData){
          throw new Error("Company Deatils Update Fail");
        }
        console.log("Logo Image Uploaded!")
      } catch (err) {
        console.error(`Upload retry failed | companyId=${companyId} | retries left=${retry}`, err);
  
        if (retry <= 0) {
          await this.companyRepo.update(companyId, {
            logo_upload_status: "fail",
          });
          return;
        }
  
        const delay = Math.pow(2, retry) * 1000;
        await new Promise(res => setTimeout(res, delay));
  
        return this.uploadLogoPic(buffer, retry - 1, companyId,oldPublicId);
      }
    }
}