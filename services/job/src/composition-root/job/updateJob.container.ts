import { updateJobSer } from '../../domain/services/JobServices/jobs/updateJob.service.js';
import { PostgresJobsRepository } from '../../infra/database/repository/jobs.repository.js';

const jobRepo= new PostgresJobsRepository()

export const updateJobService= new updateJobSer(jobRepo)