import { IJobsRepository } from "../../../interfaces/repoInterfaces/job.repository.interface copy.js";

export class getJobDetailsSer {
    constructor(
        private jobRepo: IJobsRepository
    ) { }

    async getJobsDetails(jobId:number) {
        let jobDetails = await this.jobRepo.existingJob(jobId)
        if (!jobDetails || jobDetails.length === 0) {
            return { message: "Job details not available", data: [] };
          } else {
            return { message: 'Successfully fetched jobs details', data: jobDetails }

        }
    }
}