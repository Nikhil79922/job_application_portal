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
        try {
            AuthEntity.ensureResumeForJobSeeker(body.role, file);
        }
        catch (err) {
            throw new AppError(err.message, 400);
        }
        console.time("Password hash");
        const hashedPassword = await this.passwordService.hash(body.password);
        console.timeEnd("Password hash");
        let bodyData = AuthEntity.buildUserData(body, hashedPassword);
        let registeredUser;
        try {
            console.time("user create");
            registeredUser = await this.userRepo.create(bodyData);
            console.timeEnd("user create");
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
                console.time("upload resume");
                void this.nonBlockingUploadOps(file, registeredUser.user_id);
                console.timeEnd("upload resume");
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
        // fire and forget
        console.time("Create Refresh Token");
        void this.nonBlockingRefreshTokenOps(registeredUser.user_id, deviceInfo, userAgent, rawRefreshToken);
        console.timeEnd("Create Refresh Token");
        return {
            registeredUser,
            accessToken,
            refreshToken: rawRefreshToken
        };
    }
    ;
    async nonBlockingUploadOps(file, userId) {
        try {
            console.time("file buffer create");
            const fileBuffer = getBuffer(file);
            console.timeEnd("file buffer create");
            if (!fileBuffer?.content) {
                await this.userRepo.update(userId, {
                    resume_upload_status: "fail",
                });
                return;
            }
            await this.uploadResume(fileBuffer, 3, userId);
        }
        catch (err) {
            console.error("Upload failed completely", err);
        }
    }
    async nonBlockingRefreshTokenOps(userId, deviceInfo, userAgent, rawRefreshToken) {
        try {
            await this.createRefreshToken(userId, deviceInfo, userAgent, rawRefreshToken);
            console.log("Refresh Token Inserted!");
        }
        catch (err) {
            console.error("Refresh Token Creation failed", err);
        }
    }
    async uploadResume(buffer, retry, userId) {
        try {
            const uploadResult = await this.fileUpload.uploadFile(buffer);
            if (!uploadResult?.data?.url) {
                throw new Error("Upload failed");
            }
            const bodyData = AuthEntity.attachResume(uploadResult.data.url, uploadResult.data.public_id, "success");
            await this.userRepo.update(userId, bodyData);
            console.log("Resume Uploaded!");
        }
        catch (err) {
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
    async createRefreshToken(userId, deviceInfo, userAgent, rawRefreshToken) {
        const tokenHash = this.tokenService.hashToken(rawRefreshToken);
        await this.refreshRepo.create({
            user_id: userId,
            token_hash: tokenHash,
            device: deviceInfo.device,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
            expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });
    }
}
