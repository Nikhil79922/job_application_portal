import { getAllCompanySer } from '../../domain/services/JobServices/companies/getAllCompanies.service.js';
import { PostgresCompaniesRepository } from '../../infra/database/repository/companies.repository.js';

const companyRepo= new PostgresCompaniesRepository()
export const getAllCompaniesService= new getAllCompanySer(companyRepo)