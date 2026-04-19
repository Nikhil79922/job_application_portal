
import { deleteCompanySer } from '../../domain/services/JobServices/companies/deleteCompany.service.js';
import { PostgresCompaniesRepository } from '../../infra/database/repository/companies.repository.js';

const companyRepo= new PostgresCompaniesRepository()
export const deleteCompanyService= new deleteCompanySer(companyRepo)