import AppError from "../../../shared/errors/AppError.js";
import getBuffer from "../../../shared/utils/buffer.js";
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
        if (existingUser) {
            throw new AppError("User with this email already exists", 409);
        }
        const hashedPassword = await this.passwordService.hash(body.password);
        let bodyData = {
            ...body,
            password: hashedPassword,
        };
        // Upload resume only for jobseekers
        if (body.role === "jobseeker") {
            if (!file) {
                throw new AppError("Resume file is required", 400);
            }
            const allowedTypes = ["application/pdf"];
            if (!allowedTypes.includes(file.mimetype)) {
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
            bodyData.file = uploadResult.data.url;
            bodyData.resumePublicId = uploadResult.data.public_id;
        }
        try {
            var registeredUser = await this.userRepo.create(bodyData);
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
