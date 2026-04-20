import { createJobSer } from '../../domain/services/JobServices/jobs/createJob.service.js';
import { PostgresCompaniesRepository } from '../../infra/database/repository/companies.repository.js';
import { PostgresJobsRepository } from '../../infra/database/repository/jobs.repository.js';

const companyRepo= new PostgresCompaniesRepository()
const jobRepo= new PostgresJobsRepository()

export const createJobService= new createJobSer(companyRepo,jobRepo)