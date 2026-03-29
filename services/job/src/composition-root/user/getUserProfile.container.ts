
import { getUserProfileData } from '../../domain/services/user/getUserProfile.service.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';

const userRepo= new PostgresUserRepository()
export const getUserProfiles= new getUserProfileData(userRepo)