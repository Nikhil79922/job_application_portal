// Infra
// Services
import { JwtTokenService } from "../../infra/security/token.service.js";
// Repositories
import { RefreshTokenTable } from "../../infra/database/repository/refreshToken.repository.js";
import { authLogout } from "../../domain/services/auth/logout.service.js";
const refreshRepo = new RefreshTokenTable();
const tokenService = new JwtTokenService();
export const authLogoutService = new authLogout(tokenService, refreshRepo);
