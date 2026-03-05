import AppError from "../../shared/errors/AppError.js";
export class RateLimitService {
    constructor(cache) {
        this.cache = cache;
    }
    async checkRegisterLimit(ip, email) {
        const ipKey = `register:ip:${ip}`;
        const emailKey = `register:email:${email}`;
        const ipAttempts = await this.cache.increment(ipKey, 600);
        const emailAttempts = await this.cache.increment(emailKey, 600);
        if (ipAttempts > 5) {
            throw new AppError("Too many registration attempts. Try again later.", 429);
        }
        if (emailAttempts > 3) {
            throw new AppError("Too many attempts for this email. Try later.", 429);
        }
    }
    async checkLoginLimit(ip, email) {
        const ipKey = `login:ip:${ip}`;
        const emailKey = `login:email:${email}`;
        const ipAttempts = await this.cache.increment(ipKey, 900);
        const emailAttempts = await this.cache.increment(emailKey, 900);
        if (ipAttempts > 20) {
            throw new AppError("Too many login attempts. Try again later.", 429);
        }
        if (emailAttempts > 5) {
            throw new AppError("Too many attempts for this account. Try later.", 429);
        }
    }
    async checkForgotPasswordLimit(ip, email) {
        const ipAttempts = await this.cache.increment(`forgot:ip:${ip}`, 300 // 5 minutes
        );
        if (ipAttempts > 10) {
            throw new AppError("Too many requests", 429);
        }
        const cooldown = await this.cache.increment(`forgot:cooldown:${email}`, 60);
        if (cooldown > 1) {
            throw new AppError("Please wait before requesting again", 429);
        }
        const emailAttempts = await this.cache.increment(`forgot:email:${email}`, 900 // 15 minutes
        );
        if (emailAttempts > 3) {
            throw new AppError("Password reset already requested recently", 429);
        }
    }
    async checkResetPasswordLimit(ip) {
        const attempts = await this.cache.increment(`reset:ip:${ip}`, 300 // 5 minutes
        );
        if (attempts > 5) {
            throw new AppError("Too many reset attempts. Please try again later.", 429);
        }
    }
    async checkRefreshLimit(ip) {
        const attempts = await this.cache.increment(`refresh:ip:${ip}`, 60 // 1 minute
        );
        if (attempts > 20) {
            throw new AppError("Too many token refresh attempts. Try again later.", 429);
        }
    }
}
