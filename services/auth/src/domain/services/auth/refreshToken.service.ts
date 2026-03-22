import AppError from "../../../shared/errors/AppError.js";
import { AuthEntity } from "../../entities/auth-user.entity.js";
import { IRefreshTokenRepository } from "../../interfaces/refreshToken.repository.interface.js";
import { ITokenService } from "../../interfaces/token.service.interface.js";
import { IUserRepository } from "../../interfaces/user.repository.interface.js";
import { DeviceInfoType } from "../helpers/device.service.js";

export class authRefreshToken {
  constructor(
    private userRepo: IUserRepository,
    private refreshRepo: IRefreshTokenRepository,
    private tokenService: ITokenService,
  ) {}

  async refreshToken(data: {
    refreshToken: string;
    deviceInfo: DeviceInfoType;
    userAgent: string;
  }) {
    const { refreshToken, deviceInfo } = data;

    const tokenHash = this.tokenService.hashToken(refreshToken);

    const tokenRow = await this.refreshRepo.find({
      token_hash: tokenHash,
    });

    try {
      AuthEntity.validateRefreshToken(tokenRow);
      AuthEntity.validateDeviceMatch(tokenRow.device, deviceInfo.device);
    } catch (err: any) {
      throw new AppError(err.message, 401);
    }

    const user = await this.userRepo.findById(tokenRow.user_id);

    try {
      AuthEntity.ensureUserExists(user);
    } catch (err: any) {
      throw new AppError(err.message, 401);
    }

    const accessToken = await this.tokenService.generateAccessToken({
      userId: user.user_id,
    });

    const newRefreshToken = this.tokenService.generateRefreshToken();
    const newTokenHash = this.tokenService.hashToken(newRefreshToken);

    const newExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

    await this.refreshRepo.update(
      { token_hash: tokenHash },
      {
        token_hash: newTokenHash,
        expires_at: newExpiry,
        revoked: false,
      }
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}