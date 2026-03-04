import { RateLimitService } from "../domain/services/rateLimit.service.js";
import { RedisCacheService } from "../infra/cache/redis.client.js";

const cacheService = new RedisCacheService();

export const rateLimit = new RateLimitService(cacheService)