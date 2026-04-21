import { getJobDetailsSer } from "../../domain/services/JobServices/jobs/getJobDeatils.service.js";
import { PostgresJobsRepository } from "../../infra/database/repository/jobs.repository.js";

const jobRepo = new PostgresJobsRepository() ;
export const getJobDetailsService= new getJobDetailsSer(jobRepo);