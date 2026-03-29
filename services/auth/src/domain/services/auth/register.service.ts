import { RegisterDTO } from "../../../api/dtos/authResgister.schema.js";
import AppError from "../../../shared/errors/AppError.js";
import getBuffer from "../../../shared/utils/buffer.js";
import { AuthEntity } from "../../../domain/entities/auth-user.entity.js";
import { IPasswordService } from "../../../domain/interfaces/password.service.interface.js";
import { IRefreshTokenRepository } from "../../../domain/interfaces/refreshToken.repository.interface.js";
import { ITokenService } from "../../../domain/interfaces/token.service.interface.js";
import { IUploadFile } from "../../../domain/interfaces/uploadFile.interface.js";
import { IUserRepository } from "../../../domain/interfaces/user.repository.interface.js";
import { DeviceInfoType } from "../../../domain/services/helpers/device.service.js";


export class authRegister {
  constructor(
    private userRepo: IUserRepository,
    private refreshRepo: IRefreshTokenRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService,
    private fileUpload: IUploadFile
  ) { }

  async register(data: {
    body: RegisterDTO;
    file?: Express.Multer.File;
    deviceInfo: DeviceInfoType;
    userAgent: string;
  }) {
    const { body, file, deviceInfo, userAgent } = data;

    try {
      AuthEntity.ensureResumeForJobSeeker(body.role, file);
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
    const hashedPassword = await this.passwordService.hash(body.password);
    let bodyData = AuthEntity.buildUserData(body, hashedPassword);

    let registeredUser;
    try {
      registeredUser = await this.userRepo.create(bodyData);
      if (registeredUser.resume_upload_status == 'pending' || registeredUser.resume_upload_status == 'fail') {
        delete registeredUser.resume;
      }

      // resume upload
      if (registeredUser.role === "jobseeker") {
        const allowedTypes = ["application/pdf"];
        if (!file || !allowedTypes.includes(file.mimetype)) {
          throw new AppError("Only PDF files allowed", 400);
        }

        // fire and forget
        void this.nonBlockingUploadOps(file, registeredUser.user_id);

      }

    } catch (error: any) {
      if (error.code === "23505") {
        throw new AppError("Email already registered", 409);
      }
      throw error;
    }

    const accessToken = await this.tokenService.generateAccessToken({
      userId: registeredUser.user_id,
    });

    const rawRefreshToken = this.tokenService.generateRefreshToken();
    // fire and forget

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
      refreshToken: rawRefreshToken
    };
  };

  async nonBlockingUploadOps(file: any, userId: number) {
    try {
     const fileBuffer = getBuffer(file);
      if (!fileBuffer?.content) {
        await this.userRepo.update(userId, {
          resume_upload_status: "fail",
        });
        return;
      }
      await this.uploadResume(fileBuffer, 3, userId);
    } catch (err) {
      console.error("Upload failed completely", err);
    }
  }

  async uploadResume(
    buffer: any,
    retry: number,
    userId: number
  ): Promise<void> {
    try {
      const uploadResult = await this.fileUpload.uploadFile(buffer);

      if (!uploadResult?.data?.url) {
        throw new Error("Upload failed");
      }

      const bodyData = AuthEntity.attachResume(
        uploadResult.data.url,
        uploadResult.data.public_id,
        "success"
      );

      await this.userRepo.update(userId, bodyData);
      console.log("Resume Uploaded!")

    } catch (err) {
      console.error(`Upload retry failed | userId=${userId} | retries left=${retry}`, err);

      if (retry <= 0) {
        await this.userRepo.update(userId, {
          resume_upload_status: "fail",
        });
        return;
      }

      const delay = Math.pow(2, retry) * 1000;
      await new Promise(res => setTimeout(res, delay));

      return this.uploadResume(buffer, retry - 1, userId);
    }
  }
}