import { deleteUserSKillDetails } from '../../domain/services/user/deleteSkillsToUser.service.js';
import { PostgresUser_SkillsRepository } from '../../infra/database/repository/userSkills.repository.js';
const user_skillRepo = new PostgresUser_SkillsRepository();
export const deleteSkillsToUserService = new deleteUserSKillDetails(user_skillRepo);
