import AppError from "../../../shared/errors/AppError.js";
import getBuffer from "../../../shared/utils/buffer.js";
import { AuthEntity } from "../../../domain/entities/auth-user.entity.js";
export class authRegister {
    constructor(userRepo, refreshRepo, passwordService, tokenService, fileUpload) {
        this.userRepo = userRepo;
        this.refreshRepo = refreshRepo;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
        this.fileUpload = fileUpload;
    }
    async register(data) {
        const { body, file, deviceInfo, userAgent } = data;
        const existingUser = await this.userRepo.findByEmail(body.email);
        // Entity → Error → AppError
        try {
            AuthEntity.ensureUserDoesNotExist(!!existingUser);
            AuthEntity.ensureResumeForJobSeeker(body.role, file);
        }
        catch (err) {
            throw new AppError(err.message, 400);
        }
        const hashedPassword = await this.passwordService.hash(body.password);
        let bodyData = AuthEntity.buildUserData(body, hashedPassword);
        // resume upload
        if (body.role === "jobseeker") {
            const allowedTypes = ["application/pdf"];
            if (!file || !allowedTypes.includes(file.mimetype)) {
                throw new AppError("Only PDF files allowed", 400);
            }
            const fileBuffer = getBuffer(file);
            if (!fileBuffer?.content) {
                throw new AppError("Failed to process file", 500);
            }
            const uploadResult = await this.fileUpload.uploadFile(fileBuffer);
            if (!uploadResult?.data?.url) {
                throw new AppError("Upload failed", 500);
            }
            bodyData = AuthEntity.attachResume(bodyData, uploadResult.data.url, uploadResult.data.public_id);
        }
        let registeredUser;
        try {
            registeredUser = await this.userRepo.create(bodyData);
        }
        catch (error) {
            if (error.code === "23505") {
                throw new AppError("Email already registered", 409);
            }
            throw error;
        }
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
}
