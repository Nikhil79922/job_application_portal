
import { updateApplicationSer } from "../../domain/services/JobServices/jobs/updateApplication.service.js";
import { PostgresApplicationRepository } from "../../infra/database/repository/applicants.repository.js";
import { PostgresJobsRepository } from "../../infra/database/repository/jobs.repository.js";
import { KafkaProducer } from "../../infra/messaging/kafka.producer.js";

const jobRepo = new PostgresJobsRepository() ;
const applicationRepo =  new PostgresApplicationRepository();
const KafkaProd = new KafkaProducer();
export const updateApplicationService= new updateApplicationSer(jobRepo,applicationRepo,KafkaProd);