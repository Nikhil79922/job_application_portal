import AppError from "../../../shared/errors/AppError.js";
import { AuthEntity } from "../../entities/auth-user.entity.js";
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
        try {
            AuthEntity.validateResetToken(decoded);
        }
        catch (err) {
            throw new AppError(err.message, 400);
        }
        const email = decoded.email;
        const storedToken = await this.cacheService.get(`forgot:${email}`);
        try {
            AuthEntity.validateStoredToken(storedToken, token);
        }
        catch (err) {
            throw new AppError(err.message, 400);
        }
        const user = await this.userRepo.findByEmail(email);
        try {
            AuthEntity.ensureUserExists(user);
        }
        catch (err) {
            throw new AppError(err.message, 404);
        }
        const hashedPassword = await this.passwordService.hash(password);
        await this.userRepo.update(user.user_id, {
            password: hashedPassword,
        });
        // revoke all sessions
        await this.refreshRepo.revokeAll(user.user_id);
        await this.cacheService.delete(`forgot:${email}`);
        return {
            message: "Your password has been updated.",
        };
    }
}
