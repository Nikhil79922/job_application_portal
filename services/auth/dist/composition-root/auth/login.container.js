// Infra
import { Argon2PasswordService } from "../../infra/security/password.service.js";
import { JwtTokenService } from "../../infra/security/token.service.js";
// Repositories
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";
import { RefreshTokenTable } from "../../infra/database/repository/refreshToken.repository.js";
import { authLogin } from "../../domain/services/auth/login.servcie.js";
const userRepo = new PostgresUserRepository();
const refreshRepo = new RefreshTokenTable();
const passwordService = new Argon2PasswordService();
const tokenService = new JwtTokenService();
// const deviceService = new DeviceService();
export const authLoginService = new authLogin(userRepo, refreshRepo, passwordService, tokenService);
