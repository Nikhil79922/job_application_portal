
// Infra
import { upload } from "../../infra/storage/fileUpload.js"

// Services
import { authRegister } from "../../domain/services/auth/register.service.js";
import { Argon2PasswordService } from "../../infra/security/password.service.js";
import { JwtTokenService } from "../../infra/security/token.service.js";

// Repositories
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";
import { RefreshTokenTable } from "../../infra/database/repository/refreshToken.repository.js";


const fileUpload = new upload()

const userRepo = new PostgresUserRepository();
const refreshRepo = new RefreshTokenTable();

const passwordService = new Argon2PasswordService();
const tokenService = new JwtTokenService();
// const deviceService = new DeviceService();

export const authRegisterService = new authRegister(
  userRepo,
  refreshRepo,
  passwordService,
  tokenService,
  fileUpload
);