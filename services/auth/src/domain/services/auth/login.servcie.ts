import { LoginDTO } from "../../../api/dtos/authLogin.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import { AuthEntity } from "../../entities/auth-user.entity.js";
import { IPasswordService } from "../../interfaces/password.service.interface.js";
import { IRefreshTokenRepository } from "../../interfaces/refreshToken.repository.interface.js";
import { ITokenService } from "../../interfaces/token.service.interface.js";
import { IUserRepository } from "../../interfaces/user.repository.interface.js";
import { DeviceInfoType } from "../helpers/device.service.js";

export class authLogin {
  constructor(
    private userRepo: IUserRepository,
    private refreshRepo: IRefreshTokenRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService
  ) {}

  async login(data: {
    dto: LoginDTO;
    deviceInfo: DeviceInfoType;
    userAgent: string;
  }) {
    const { dto, deviceInfo, userAgent } = data;
    const { email, password } = dto;

    const user = await this.userRepo.getUserWithSkills(email);

    const isMatch = user
      ? await this.passwordService.compare(password, user.password)
      : false;

    // Entity validation
    try {
      AuthEntity.validateCredentials(user, isMatch);
    } catch (err: any) {
      throw new AppError(err.message, 401);
    }

    const sessions = await this.refreshRepo.count({
      user_id: user.user_id,
      revoked: false,
    });

    // Entity validation
    try {
      AuthEntity.validateSessionLimit(sessions);
    } catch (err: any) {
      throw new AppError(err.message, 403);
    }

    const accessToken = await this.tokenService.generateAccessToken({
      userId: user.user_id,
    });

    const rawRefreshToken = this.tokenService.generateRefreshToken();
    const tokenHash = this.tokenService.hashToken(rawRefreshToken);

    const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

    // revoke previous device session
    await this.refreshRepo.update(
      {
        user_id: user.user_id,
        device: deviceInfo.device,
        revoked: false,
      },
      {
        revoked: true,
      }
    );

    await this.refreshRepo.create({
      user_id: user.user_id,
      token_hash: tokenHash,
      device: deviceInfo.device,
      device_type: deviceInfo.deviceType,
      user_agent: userAgent,
      expires_at: expiryDate,
    });

    const { password: _, ...safeUser } = user;

    return {
      user: safeUser,
      accessToken,
      refreshToken: rawRefreshToken,
    };
  }
}