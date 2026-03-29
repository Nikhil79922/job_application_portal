
import { addUserSKillDetails } from '../../domain/services/user/addSkillsToUser.service.js';
import { PostgresSkillsRepository } from '../../infra/database/repository/skill.repository.js';
import { PostgresUserRepository } from '../../infra/database/repository/user.repository.js';
import { PostgresUser_SkillsRepository } from '../../infra/database/repository/userSkills.repository.js';

const userRepo= new PostgresUserRepository();
const skillRepo = new PostgresSkillsRepository()
const user_skillRepo = new PostgresUser_SkillsRepository()
export const addSkillsToUserService= new addUserSKillDetails(userRepo ,skillRepo, user_skillRepo)