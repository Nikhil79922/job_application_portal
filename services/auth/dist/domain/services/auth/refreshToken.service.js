import AppError from "../../../shared/errors/AppError.js";
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
        if (!tokenRow) {
            throw new AppError("Invalid refresh token", 401);
        }
        if (tokenRow.device !== deviceInfo.device) {
            throw new AppError("Device mismatch", 401);
        }
        if (tokenRow.revoked) {
            throw new AppError("Invalid refresh token", 401);
        }
        if (new Date() > tokenRow.expires_at) {
            throw new AppError("Invalid refresh token", 401);
        }
        const user = await this.userRepo.findById(tokenRow.user_id);
        if (!user) {
            throw new AppError("Invalid refresh token", 401);
        }
        const accessToken = await this.tokenService.generateAccessToken({
            userId: user.user_id,
        });
        const newRefreshToken = this.tokenService.generateRefreshToken();
        const newTokenHash = this.tokenService.hashToken(newRefreshToken);
        const newExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        await this.refreshRepo.update({
            token_hash: tokenHash,
        }, {
            token_hash: newTokenHash,
            expires_at: newExpiry,
            revoked: false,
        });
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}
