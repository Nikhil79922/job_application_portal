import { applyForJobSer } from '../../domain/services/user/applyForJob.service.js';
import { PostgresApplicationRepository } from '../../infra/database/repository/applicants.repository.js';
import { PostgresJobsRepository } from '../../infra/database/repository/jobs.repository.js';

const applicationRepo = new PostgresApplicationRepository()
const jobRepo = new PostgresJobsRepository()
export const applyForJobService= new applyForJobSer(jobRepo, applicationRepo)