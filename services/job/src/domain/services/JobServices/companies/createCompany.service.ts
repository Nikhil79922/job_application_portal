import { createCompanyDTO } from "../../../../api/dtos/company/createCompany.schema.js";
import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";
import { IMessageBroker } from "../../../interfaces/infraInterfaces/message-broker.interface.js";
import logger from "../../../../config/logger.js";

export class createCompanySer {
  constructor(
    private companyRepo: ICompaniesRepository,
    private messageBroker: IMessageBroker
  ) {}

  async createCompany(
    data: {
      body: createCompanyDTO;
      file: Express.Multer.File;
    },
    userDetails: Users
  ) {
    try {
      const insert = {
        ...data.body,
        recruiter_id: userDetails.user_id,
      };

      const registeredCompany = await this.companyRepo.create(insert);

      // hide logo if pending/fail
      if (
        registeredCompany.logo_upload_status === "pending" ||
        registeredCompany.logo_upload_status === "fail"
      ) {
        delete registeredCompany.logo;
      }

      // validate file
      if (!data.file) {
        throw new AppError("Logo image is required", 400);
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(data.file.mimetype)) {
        throw new AppError("Only image files are allowed", 400);
      }

      // optional size check
      if (data.file.size > 5 * 1024 * 1024) {
        throw new AppError("File too large", 400);
      }

      //  convert to base64
      const base64File = data.file.buffer.toString("base64");

      //  Kafka publish
      this.messageBroker
        .publish(
          "upload-content",
          {
            entityId: registeredCompany.company_id,
            entityType: "company",
            uploadType: "logo", 
            file: base64File,
            mimeType: data.file.mimetype,
            public_id: registeredCompany.logo_public_id || null,
          },
          String(registeredCompany.company_id)
        )
        .catch((err) => {
          logger.error("Kafka publish failed", { err });
        });

      // 🔥 mark pending
      await this.companyRepo.update(registeredCompany.company_id, {
        logo_upload_status: "pending",
      });

      return registeredCompany;

    } catch (error: any) {
      if (error.code === "23505") {
        throw new AppError(
          "Company with this same name already exists",
          409
        );
      }
      throw error;
    }
  }
}