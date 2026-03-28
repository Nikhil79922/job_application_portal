import AppError from "../../../shared/errors/AppError.js";
import { AuthEntity } from "../../entities/auth-user.entity.js";
export class authLogin {
    constructor(userRepo, refreshRepo, passwordService, tokenService) {
        this.userRepo = userRepo;
        this.refreshRepo = refreshRepo;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    async login(data) {
        const { dto, deviceInfo, userAgent } = data;
        const { email, password } = dto;
        // 1. Fetch user
        const user = await this.userRepo.getUserWithSkills(email);
        const isMatch = user
            ? await this.passwordService.compare(password, user.password)
            : false;
        // 2. Validate credentials
        try {
            AuthEntity.validateCredentials(user, isMatch);
        }
        catch (err) {
            throw new AppError(err.message, 401);
        }
        try {
            AuthEntity.validateSessionLimit(user.sessions);
        }
        catch (err) {
            throw new AppError(err.message, 401);
        }
        // 5. Generate tokens
        const accessToken = await this.tokenService.generateAccessToken({
            userId: user.user_id,
        });
        const rawRefreshToken = this.tokenService.generateRefreshToken();
        const tokenHash = this.tokenService.hashToken(rawRefreshToken);
        const expiryDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        await this.refreshRepo.create({
            user_id: user.user_id,
            token_hash: tokenHash,
            device: deviceInfo.device,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
            expires_at: expiryDate,
        });
        // 7. Remove sensitive data
        const { password: _, ...safeUser } = user;
        return {
            user: safeUser,
            accessToken,
            refreshToken: rawRefreshToken,
        };
    }
}
