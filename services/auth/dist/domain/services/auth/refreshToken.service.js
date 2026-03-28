import { AuthEntity } from "../../entities/auth-user.entity.js";
export class authRefreshToken {
    constructor(userRepo, refreshRepo, tokenService) {
        this.userRepo = userRepo;
        this.refreshRepo = refreshRepo;
        this.tokenService = tokenService;
    }
    async refreshToken(data) {
        const { refreshToken, deviceInfo, userAgent } = data;
        const tokenHash = this.tokenService.hashToken(refreshToken);
        const tokenRow = await this.refreshRepo.find({
            token_hash: tokenHash,
        });
        AuthEntity.validateRefreshToken(tokenRow);
        AuthEntity.validateDeviceMatch(tokenRow.device, deviceInfo.device);
        const user = await this.userRepo.findById(tokenRow.user_id);
        AuthEntity.ensureUserExists(user);
        const accessToken = await this.tokenService.generateAccessToken({
            userId: user.user_id,
        });
        const newRefreshToken = this.tokenService.generateRefreshToken();
        const newTokenHash = this.tokenService.hashToken(newRefreshToken);
        const newExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        await this.refreshRepo.revokeAll(tokenHash);
        await this.refreshRepo.create({
            user_id: user.user_id,
            token_hash: newTokenHash,
            device: deviceInfo.device,
            device_type: deviceInfo.deviceType,
            user_agent: userAgent,
            expires_at: newExpiry,
        });
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}
