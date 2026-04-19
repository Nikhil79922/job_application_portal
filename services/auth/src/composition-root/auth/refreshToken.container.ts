// Services
import { JwtTokenService } from "../../infra/security/token.service.js";

// Repositories
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";
import { RefreshTokenTable } from "../../infra/database/repository/refreshToken.repository.js";
import { authRefreshToken } from "../../domain/services/auth/refreshToken.service.js";

const userRepo = new PostgresUserRepository();
const refreshRepo = new RefreshTokenTable();

const tokenService = new JwtTokenService();
// const deviceService = new DeviceService();

export const authRefreshService = new authRefreshToken(
  userRepo,
  refreshRepo,
  tokenService,
);