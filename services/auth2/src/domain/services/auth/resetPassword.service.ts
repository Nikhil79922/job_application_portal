import { ResetDTO } from "../../../api/dtos/authReset.schema copy.js";
import AppError from "../../../shared/errors/AppError.js";
import { ICacheService } from "../../interfaces/cache.interface.js";
import { IPasswordService } from "../../interfaces/password.service.interface.js";
import { IRefreshTokenRepository } from "../../interfaces/refreshToken.repository.interface.js";
import { ITokenService } from "../../interfaces/token.service.interface.js";
import { IUserRepository } from "../../interfaces/user.repository.interface.js";

export class authResetPassword {
  constructor(
    private userRepo: IUserRepository,
    private tokenService: ITokenService,
    private cacheService: ICacheService,
    private passwordService: IPasswordService,
    private refreshRepo: IRefreshTokenRepository,
  ) { }

  async resetPassword(data: ResetDTO) {
    const { token, password } = data;

    const decoded = await this.tokenService.verify(token);

    if (!decoded || decoded.type !== "reset") {
      throw new AppError("Invalid or expired token", 400);
    }
    const email = decoded.email;
    const storedToken = await this.cacheService.get(`forgot:${email}`);
    if (!storedToken || storedToken !== token) {
      throw new AppError("Invalid or expired token", 400);
    }
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const hashedPassword = await this.passwordService.hash(password);

    await this.userRepo.update(
      user.user_id,
      { password: hashedPassword }
    );
    // revoke all sessions
    await this.refreshRepo.revokeAll(user.user_id);
    await this.cacheService.delete(`forgot:${email}`);

    return {
      message: "Your password has been updated.",
    };
  }
}