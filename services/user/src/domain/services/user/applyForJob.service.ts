import AppError from "../../../shared/errors/AppError.js";
import { Users } from "../../../shared/types/user.type.js";
import { IJobsRepository } from "../../interfaces/repoInterfaces/job.repository.interface.js";


export class applyForJobSer {
    constructor(
        private jobRepo: IJobsRepository,
    ) { }

    async addApplicant(jobId: number, userDetails: Users) {
        const job = await this.jobRepo.existingJob(jobId)
        if (!job) {
            throw new AppError("No jobs available with this ID", 404);
        }
        if (!job.is_active) {
            throw new AppError("Job is not Active", 400);
        }

        const now = Date.now();
    }
}