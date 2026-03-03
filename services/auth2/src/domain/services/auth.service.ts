import AppError from "../../shared/errors/AppError.js";
import {IUserRepository} from "../../domain/interfaces/user.repository.interface.js";
import {IRefreshTokenRepository} from "../../domain/interfaces/refreshToken.repository.interface.js";
import {IPasswordService} from "../../domain/interfaces/password.service.interface.js";
import {ITokenService} from "../../domain/interfaces/token.service.interface.js";
import {ICacheService} from "../../domain/interfaces/cache.interface.js";
import {IMessageBroker} from "../../domain/interfaces/message-broker.interface.js";
import { RegisterDTO } from "../../api/dtos/authResgister.schema.js";
import { IDeviceService } from "../../domain/interfaces/deviceInfo.interface.js";
import { LoginDTO } from "../../api/dtos/authLogin.schema.js";
import { forgotDTO } from "../../api/dtos/authForgot.schema copy.js";
import { env } from "../../config/env.js";
import { emailTemp } from '../../shared/utils/emailTemplate.js';
import { ResetDTO } from "../../api/dtos/authReset.schema copy.js";
import { DeviceInfo } from "./device.service.js";
  
export class Auth {

    constructor(
        private userRepo: IUserRepository,
        private refreshRepo: IRefreshTokenRepository,
        private passwordService: IPasswordService,
        private tokenService: ITokenService,
        private cacheService: ICacheService,
        private messageBroker: IMessageBroker,
        private deviceInfo: IDeviceService
      ) {}
      async register(data: {
        body: RegisterDTO;
        file?: Express.Multer.File;
        deviceInfo: DeviceInfo;
        userAgent: string;
      }) {
        const { body, deviceInfo, userAgent } = data;
      
        const existingUser = await this.userRepo.findByEmail(body.email);
      
        if (existingUser) {
          throw new AppError("User with this email already exists", 409);
        }
      
        const hashedPassword = await this.passwordService.hash(body.password);
      
        const bodyData: RegisterDTO = {
          ...body,
          password: hashedPassword,
        };

        const registeredUser = await this.userRepo.create(bodyData);

        const accessToken = await this.tokenService.generateAccessToken({
          userId: registeredUser.user_id,
        });
      
        const rawRefreshToken = this.tokenService.generateRefreshToken();
        const tokenHash = this.tokenService.hashToken(rawRefreshToken);

        await this.refreshRepo.create({
          user_id: registeredUser.user_id,
          token_hash: tokenHash,
          device: deviceInfo.device,
          device_type: deviceInfo.deviceType,
          user_agent: userAgent,
          expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });
      
        return {
          registeredUser,
          accessToken,
          refreshToken: rawRefreshToken,
        };
      }

      async login(data: {
        dto: LoginDTO;
        deviceInfo: DeviceInfo;
        userAgent: string;
      }) {
        const { dto, deviceInfo, userAgent } = data;
        const { email, password } = dto;
 
        const user = await this.userRepo.findByEmail(email);
      
        if (!user) {
          throw new AppError("Invalid credentials", 400);
        }

        const isMatch = await this.passwordService.compare(
          password,
          user.password
        );
      
        if (!isMatch) {
          throw new AppError("Invalid credentials", 400);
        }
      
        const accessToken = await this.tokenService.generateAccessToken({
          userId: user.user_id,
        });
      
        const rawRefreshToken = this.tokenService.generateRefreshToken();
        const tokenHash = this.tokenService.hashToken(rawRefreshToken);
      
        const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      
        const existingToken = await this.refreshRepo.find({
          user_id: user.user_id,
          device_type: deviceInfo.deviceType,
          user_agent: userAgent,
        });
      
        if (existingToken) {
          await this.refreshRepo.update(
            {
              user_id: user.user_id,
              device_type: deviceInfo.deviceType,
              user_agent: userAgent,
            },
            {
              token_hash: tokenHash,
              expires_at: expiryDate,
              revoked: false,
            }
          );
        } else {
          await this.refreshRepo.create({
            user_id: user.user_id,
            token_hash: tokenHash,
            device: deviceInfo.device,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
            expires_at: expiryDate,
          });
        }
      
        const { password: _, ...safeUser } = user;
      
        return {
          user: safeUser,
          accessToken,
          refreshToken: rawRefreshToken,
        };
      }

      async forgotPassword(data: forgotDTO) {
        const { email } = data;
      
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
          return { message: "If this email exists, we have sent a reset link" };
        }

        const resetToken = await this.tokenService.generateAccessToken({
          email,
          type: "reset",
        });

        await this.cacheService.set(
          `forgot:${email}`,
          resetToken,
          900
        );

        const resetLink = `${env.Frontend_Url}/reset/${resetToken}`;
      
        // 5️⃣ Publish email event
        await this.messageBroker.publish("send-mail", {
          to: email,
          subject: "RESET YOUR PASSWORD - HireHeaven",
          html: emailTemp(resetLink),
        });
      
        return {
          message: "If this email exists, we have sent a reset link",
        };
      }

      async resetPassword(data: ResetDTO) {
        const { token, password } = data;
      
        // 1️⃣ Verify token
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
      
        await this.cacheService.delete(`forgot:${email}`);
      
        return {
          message: "Your password has been updated.",
        };
      }

      async refreshToken(data: {
        refreshToken: string;
        deviceInfo: DeviceInfo;
        userAgent: string;
      }) {
        const { refreshToken, deviceInfo, userAgent } = data;
      
        // 1️⃣ Hash incoming refresh token
        const tokenHash = this.tokenService.hashToken(refreshToken);
      
        // 2️⃣ Find stored token for this device
        const tokenRow = await this.refreshRepo.find({
          token_hash: tokenHash,
          device_type: deviceInfo.deviceType,
          user_agent: userAgent,
        });
      
        if (!tokenRow) {
          throw new AppError("Invalid refresh token", 401);
        }
      
        if (tokenRow.revoked) {
          throw new AppError("Invalid refresh token", 401);
        }
      
        if (new Date() > tokenRow.expires_at) {
          throw new AppError("Invalid refresh token", 401);
        }
      
        // 3️⃣ Generate new access token
        const accessToken = await this.tokenService.generateAccessToken({
          userId: tokenRow.user_id,
        });
      
        // 4️⃣ Rotate refresh token
        const newRefreshToken = this.tokenService.generateRefreshToken();
        const newTokenHash = this.tokenService.hashToken(newRefreshToken);
      
        const newExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
      
        await this.refreshRepo.update(
          {
            token_hash: tokenHash,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
          },
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

      async logout(refreshToken: string) {
        const tokenHash = this.tokenService.hashToken(refreshToken);
      
        const tokenRow = await this.refreshRepo.find({
          token_hash: tokenHash,
        });
      
        if (!tokenRow) {
          return; // silent logout
        }
      
        await this.refreshRepo.update(
          { token_hash: tokenHash },
          { revoked: true }
        );
      }
}

