import { getAllJobApplicationSer } from '../../domain/services/user/getAllJobApplcaition.service.js';
import { PostgresApplicationRepository } from '../../infra/database/repository/applicants.repository.js';
const applicationRepo = new PostgresApplicationRepository()
export const allJobApplicationService= new getAllJobApplicationSer(applicationRepo)