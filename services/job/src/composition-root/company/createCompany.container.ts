
import { createCompanySer } from '../../domain/services/JobServices/companies/createCompany.service.js';
import { PostgresICompaniesRepository } from '../../infra/database/repository/companies.repository.js';
import { upload } from '../../infra/storage/fileUpload.js';

const companyRepo= new PostgresICompaniesRepository()
const uploadFile=new upload()
export const createCompanyService= new createCompanySer(companyRepo,uploadFile)