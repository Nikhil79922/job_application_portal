import { redisClient } from "../../config/redis.config.js";
import AppError from "../../shared/errors/AppError.js";
export class RedisCacheService {
    async connect() {
        try {
            await redisClient.connect();
            console.log("✅ Redis connected");
        }
        catch (err) {
            throw new AppError("Redis connection failed", 503);
        }
    }
    async set(key, value, ttlSeconds) {
        try {
            if (ttlSeconds) {
                await redisClient.set(key, value, { EX: ttlSeconds });
            }
            else {
                await redisClient.set(key, value);
            }
        }
        catch {
            throw new AppError("Redis SET failed", 503);
        }
    }
    async get(key) {
        try {
            return await redisClient.get(key);
        }
        catch {
            throw new AppError("Redis GET failed", 503);
        }
    }
    async delete(key) {
        try {
            await redisClient.del(key);
        }
        catch {
            throw new AppError("Redis DEL failed", 503);
        }
    }
}
