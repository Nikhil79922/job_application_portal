import AppError from "../../../shared/errors/AppError.js";
import { AuthEntity } from "../../../domain/entities/auth-user.entity.js";
export class authRegister {
    constructor(userRepo, refreshRepo, passwordService, tokenService, messageBroker) {
        this.userRepo = userRepo;
        this.refreshRepo = refreshRepo;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
        this.messageBroker = messageBroker;
    }
    async register(data) {
        const { body, file, deviceInfo, userAgent } = data;
        try {
            AuthEntity.ensureResumeForJobSeeker(body.role, file);
        }
        catch (err) {
            throw new AppError(err.message, 400);
        }
        const hashedPassword = await this.passwordService.hash(body.password);
        const bodyData = AuthEntity.buildUserData(body, hashedPassword);
        let registeredUser;
        try {
            registeredUser = await this.userRepo.create(bodyData);
            if (registeredUser.resume_upload_status === "pending" ||
                registeredUser.resume_upload_status === "fail") {
                delete registeredUser.resume;
            }
            // 🔥 Upload via Kafka
            if (registeredUser.role === "jobseeker") {
                if (!file || file.mimetype !== "application/pdf") {
                    throw new AppError("Only PDF files allowed", 400);
                }
                // optional safeguard
                if (file.size > 5 * 1024 * 1024) {
                    throw new AppError("File too large", 400);
                }
                const base64File = file.buffer.toString("base64");
                void this.messageBroker.publish("upload-content", {
                    entityId: registeredUser.user_id,
                    entityType: "user",
                    uploadType: "resume",
                    file: base64File,
                    mimeType: file.mimetype,
                    public_id: null,
                }, String(registeredUser.user_id));
                await this.userRepo.update(registeredUser.user_id, {
                    resume_upload_status: "pending",
                });
            }
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
