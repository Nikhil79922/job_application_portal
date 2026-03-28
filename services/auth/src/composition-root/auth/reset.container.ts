
// Infra
import { RedisCacheService } from "../../infra/cache/redis.client.js";

// Services
import { Argon2PasswordService } from "../../infra/security/password.service.js";
import { JwtTokenService } from "../../infra/security/token.service.js";

// Repositories
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";
import { RefreshTokenTable } from "../../infra/database/repository/refreshToken.repository.js";
import { authResetPassword } from "../../domain/services/auth/resetPassword.service.js";



const cacheService = new RedisCacheService();

const userRepo = new PostgresUserRepository();
const refreshRepo = new RefreshTokenTable();

const passwordService = new Argon2PasswordService();
const tokenService = new JwtTokenService();
// const deviceService = new DeviceService();

export const authResetService = new authResetPassword(
  userRepo,
  tokenService,
  cacheService,
  passwordService,
  refreshRepo
);