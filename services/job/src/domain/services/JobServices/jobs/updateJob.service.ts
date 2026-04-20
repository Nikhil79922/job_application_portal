import { UpdateJobDTO } from "../../../../api/dtos/job/updateJob.schema.js";
import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import { IJobsRepository } from "../../../interfaces/repoInterfaces/job.repository.interface copy.js";
export class updateJobSer {
  constructor(
    private jobRepo: IJobsRepository
  ) { }

  async updateJob(data:UpdateJobDTO, userDetails: Users) {
    try {
      const { job_id } = data;

  const jobExists = await this.jobRepo.existingJob(job_id);
  if (!jobExists) {
    throw new AppError("Job does not exist", 404);
  }
debugger
  if (jobExists.posted_by_recruiter !== userDetails.user_id) {
    throw new AppError("Forbidden: You are not allowed", 403);
  }

  const { job_id: _, ...updateData } = data;

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No fields provided for update", 400);
  }

  const job = await this.jobRepo.update(job_id, updateData);

  if (!job) {
    throw new AppError("Failed to update job", 500);
  }

  return job;
    } catch (error: any) {
      throw error;
    }
  }
}