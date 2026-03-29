
import { deleteCompanySer } from '../../domain/services/JobServices/companies/deleteCompany.service.js';
import { PostgresICompaniesRepository } from '../../infra/database/repository/companies.repository.js';

const companyRepo= new PostgresICompaniesRepository()
export const deleteCompanyService= new deleteCompanySer(companyRepo)