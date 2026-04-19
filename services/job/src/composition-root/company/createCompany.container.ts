
import { createCompanySer } from '../../domain/services/JobServices/companies/createCompany.service.js';
import { PostgresCompaniesRepository } from '../../infra/database/repository/companies.repository.js';
import { upload } from '../../infra/storage/fileUpload.js';

const companyRepo= new PostgresCompaniesRepository()
const uploadFile=new upload()
export const createCompanyService= new createCompanySer(companyRepo,uploadFile)