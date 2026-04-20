import { getCompanyDetailSer } from '../../domain/services/JobServices/companies/getCompanyDetails.service.js';
import { PostgresCompaniesRepository } from '../../infra/database/repository/companies.repository.js';

const companyRepo= new PostgresCompaniesRepository()
export const getCompanyDeatilService= new getCompanyDetailSer(companyRepo)