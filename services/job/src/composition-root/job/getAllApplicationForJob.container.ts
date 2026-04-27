import { getAllApplicationForJobSer } from "../../domain/services/JobServices/jobs/getAllApplicationForJob.service.js";
import { PostgresApplicationRepository } from "../../infra/database/repository/applicants.repository.js";
import { PostgresJobsRepository } from "../../infra/database/repository/jobs.repository.js";

const jobRepo = new PostgresJobsRepository() ;
const applicationRepo =  new PostgresApplicationRepository();
export const getAllApplicationForJobService= new getAllApplicationForJobSer(jobRepo,applicationRepo);