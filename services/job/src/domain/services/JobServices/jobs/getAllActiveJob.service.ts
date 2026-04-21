import { IJobsRepository } from "../../../interfaces/repoInterfaces/job.repository.interface copy.js";

export class getAllActiveJobSer {
    constructor(
        private jobRepo: IJobsRepository
    ) { }

    async getAllActiveJobs(filters: {
        title?: string;
        location?: string;
      }) {
        let allActiveJobs = await this.jobRepo.findAllActive(filters?.title, filters?.location)
        if (!allActiveJobs || allActiveJobs.length === 0) {
            return { message: "No active jobs available", data: [] };
          } else {
            return { message: 'Successfully fetched all active jobs', data: allActiveJobs }

        }
    }
}