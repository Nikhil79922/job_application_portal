import { updateResumeFile } from '../../domain/services/user/updateResume.service.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';
import { upload } from '../../infra/storage/fileUpload.js';
const userRepo = new PostgresUserRepository();
const uploadFile = new upload();
export const updateResumesService = new updateResumeFile(userRepo, uploadFile);
