import AppError from "../../../../shared/errors/AppError.js";
import { Users } from "../../../../shared/types/user.type.js";
import { IApplicantionsRepository } from "../../../interfaces/repoInterfaces/applications.repository.interface.js";
import { IJobsRepository } from "../../../interfaces/repoInterfaces/job.repository.interface copy.js";

export class getAllApplicationForJobSer {
    constructor(
        private jobRepo: IJobsRepository,
        private applicationRepo: IApplicantionsRepository,
    ){}

    async getAllApplication(jobId:number , userDetails:Users){
        let selectedRow= ['posted_by_recruiter']
        let jobDetails = await this.jobRepo.findJobData(jobId,selectedRow)

        if(!jobDetails){
            throw new AppError("Job not found",404)
        }

        if(jobDetails.posted_by_recruiter !== userDetails.user_id){
            throw new AppError('Forbidden you are not allowed',403)
        }

        const applications = await this.applicationRepo.findAllOnJobId(jobId);

        if(applications.length == 0){
            return {
                message: "No Active application found yet.",
                data:applications
            }
        }
        return {
            message: "Fetched all the applications successfull",
            data:applications
        }
    }
}