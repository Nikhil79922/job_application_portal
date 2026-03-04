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
}
