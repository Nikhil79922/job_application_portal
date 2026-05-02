
import { createCompanySer } from '../../domain/services/JobServices/companies/createCompany.service.js';
import { PostgresCompaniesRepository } from '../../infra/database/repository/companies.repository.js';
import { KafkaProducer } from '../../infra/messaging/kafka.producer.js';

const companyRepo= new PostgresCompaniesRepository()
const kafkaUploadFile=new KafkaProducer()
export const createCompanyService= new createCompanySer(companyRepo,kafkaUploadFile)