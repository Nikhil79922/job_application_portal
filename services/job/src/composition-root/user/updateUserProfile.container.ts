
import { updateUserDetails } from '../../domain/services/user/updateUserProfile.service.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';

const userRepo= new PostgresUserRepository()
export const updateUserProfiles= new updateUserDetails(userRepo)