import { getAllActiveJobSer } from "../../domain/services/JobServices/jobs/getAllActiveJob.service.js";
import { PostgresJobsRepository } from "../../infra/database/repository/jobs.repository.js";

const jobRepo = new PostgresJobsRepository() ;
export const getAllActiveJobService= new getAllActiveJobSer(jobRepo);