import AppError from "../../../shared/errors/AppError.js";
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
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        const isMatch = await this.passwordService.compare(password, user.password);
        if (!isMatch) {
            throw new AppError("Invalid credentials", 401);
        }
        // 🔐 Limit active sessions
        const sessions = await this.refreshRepo.count({
            user_id: user.user_id,
            revoked: false
        });
        if (sessions > 10) {
            throw new AppError("Too many active sessions", 403);
        }
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
        const { password: _, ...safeUser } = user;
        return {
            user: safeUser,
            accessToken,
            refreshToken: rawRefreshToken,
        };
    }
}
