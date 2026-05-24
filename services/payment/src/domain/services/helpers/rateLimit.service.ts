import AppError from "../../../shared/errors/AppError.js";
import { ICacheService } from "../../interfaces/infraInterfaces/cache.interface.js";

export class RateLimitService {
  constructor(private cache: ICacheService) {}

  // 🔥 generic reusable method
  private async checkLimit(
    key: string,
    ttl: number,
    limit: number,
    message: string
  ) {
    const attempts = await this.cache.increment(key, ttl);

    if (attempts > limit) {
      throw new AppError(message, 429);
    }
  }


  // 🔐 CHECKOUT RATE LIMIT (USER + IP + COMBINED)
async checkCheckoutLimit(userId: string, ip: string) {
  // 1️⃣ User-based limit (prevents account abuse)
  await this.checkLimit(
    `checkout:user:${userId}`,
    300, // 5 min
    5,
    "Too many checkout attempts. Try later."
  );

  // 2️⃣ IP-based limit (prevents bot/DDOS)
  await this.checkLimit(
    `checkout:ip:${ip}`,
    300,
    15,
    "Too many requests from this IP. Try later."
  );

  // 3️⃣ Combined user + IP limit
  await this.checkLimit(
    `checkout:user:${userId}:ip:${ip}`,
    300,
    5,
    "Too many checkout attempts. Try later."
  );
}
}