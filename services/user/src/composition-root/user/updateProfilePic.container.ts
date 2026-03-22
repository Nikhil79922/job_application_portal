
import { updateProfilePic } from '../../domain/services/user/updateProfilePic.service.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';
import { upload } from '../../infra/storage/fileUpload.js';

const userRepo= new PostgresUserRepository()
const uploadFile=new upload()
export const updateProfilePics= new updateProfilePic(userRepo,uploadFile)