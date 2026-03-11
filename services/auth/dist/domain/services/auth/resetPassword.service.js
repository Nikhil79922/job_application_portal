import AppError from "../../../shared/errors/AppError.js";
export class authResetPassword {
    constructor(userRepo, tokenService, cacheService, passwordService, refreshRepo) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
        this.cacheService = cacheService;
        this.passwordService = passwordService;
        this.refreshRepo = refreshRepo;
    }
    async resetPassword(data) {
        const { token, password } = data;
        const decoded = await this.tokenService.verify(token);
        if (!decoded || decoded.type !== "reset") {
            throw new AppError("Invalid or expired token", 400);
        }
        const email = decoded.email;
        const storedToken = await this.cacheService.get(`forgot:${email}`);
        if (!storedToken || storedToken !== token) {
            throw new AppError("Invalid or expired token", 400);
        }
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        const hashedPassword = await this.passwordService.hash(password);
        await this.userRepo.update(user.user_id, { password: hashedPassword });
        // revoke all sessions
        await this.refreshRepo.revokeAll(user.user_id);
        await this.cacheService.delete(`forgot:${email}`);
        return {
            message: "Your password has been updated.",
        };
    }
}
