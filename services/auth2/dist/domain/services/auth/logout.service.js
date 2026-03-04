export class authLogout {
    constructor(tokenService, refreshRepo) {
        this.tokenService = tokenService;
        this.refreshRepo = refreshRepo;
    }
    async logout(refreshToken) {
        const tokenHash = this.tokenService.hashToken(refreshToken);
        const tokenRow = await this.refreshRepo.find({
            token_hash: tokenHash,
        });
        if (!tokenRow) {
            return; // silent logout
        }
        await this.refreshRepo.update({ token_hash: tokenHash }, { revoked: true });
    }
}
