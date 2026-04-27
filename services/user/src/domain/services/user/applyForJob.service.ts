import AppError from "../../../shared/errors/AppError.js";
import { Users } from "../../../shared/types/user.type.js";
import { IApplicantionsRepository } from "../../interfaces/repoInterfaces/applications.repository.interface.js";
import { IJobsRepository } from "../../interfaces/repoInterfaces/job.repository.interface.js";

export class applyForJobSer {
    constructor(
        private jobRepo: IJobsRepository,
        private applicationRepo: IApplicantionsRepository,
    ) { }

    async addApplicant(jobId: number, userDetails: Users) {
        if (userDetails.resume_upload_status !== 'success') throw new AppError('Resume is required for the jobs , Please complete your profile', 400)
        const job = await this.jobRepo.existingJob(jobId)
        if (!job) {
            throw new AppError("No jobs available with this ID", 404);
        }
        if (!job.is_active) {
            throw new AppError("Job is not Active", 400);
        }

        const now = Date.now();

        const subTime = userDetails.subscription ? new Date(userDetails.subscription).getTime() : 0

        const isSubscribe = subTime > now;

        let newApplication;
        try {
            let insertData = {
                job_id: jobId,
                applicant_id: userDetails.user_id,
                applicant_email: userDetails.email,
                resume: userDetails.resume,
                subscribed: isSubscribe
            };
            [newApplication] = await this.applicationRepo.create(insertData)

            return {
                message: 'Applied for the job successfully',
                data: newApplication
            }
        } catch (error: any) {
            if (error.code === "23505") {
                throw new AppError("You have already registered for this job role", 409);
            }
            throw error;
        }
    }
}