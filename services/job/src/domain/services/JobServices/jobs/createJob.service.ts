import { createJobDTO } from "../../../../api/dtos/job/createJob.schema.js";
import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import { ICompaniesRepository } from "../../../interfaces/repoInterfaces/companies.repository.interface.js";
import { IJobsRepository } from "../../../interfaces/repoInterfaces/job.repository.interface copy.js";
export class createJobSer {
  constructor(
    private companyRepo: ICompaniesRepository,
    private jobRepo: IJobsRepository
  ) { }

  async createJob(data:createJobDTO, userDetails: Users) {
    try {
      const { company_id } = data;
      const companyExists = await this.companyRepo.existingCompanies(company_id);

      if (!companyExists) {
        throw new AppError("Company does not exist", 404);
      }

      const insertData = {
        ...data,
        posted_by_recruiter: userDetails.user_id,
      };
      const job = await this.jobRepo.create(insertData);
      if (!job) {
        throw new AppError("Failed to create job", 500);
      }
      return job;
    } catch (error: any) {
      throw error;
    }
  }
}