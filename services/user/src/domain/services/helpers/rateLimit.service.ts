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

  // 🔐 PROFILE UPDATE (USER + IP + COMBINED)
  async checkUpdateProfileLimit(userId: string, ip: string) {
    // 1️⃣ User-based limit (prevents IP switching abuse)
    await this.checkLimit(
      `profile:update:user:${userId}`,
      300,
      10,
      "Too many profile updates. Try later."
    );

    // 2️⃣ IP-based limit (prevents bot/DDOS)
    await this.checkLimit(
      `profile:update:ip:${ip}`,
      300,
      20,
      "Too many requests from this IP. Try later."
    );

    // 3️⃣ Combined (fine-grained control)
    await this.checkLimit(
      `profile:update:user:${userId}:ip:${ip}`,
      300,
      10,
      "Too many requests. Try later."
    );
  }

  // 🔐 FILE UPLOAD (USER + IP)
  async checkUploadLimit(userId: string, ip: string) {
    // user-based
    await this.checkLimit(
      `upload:user:${userId}`,
      300,
      5,
      "Too many uploads. Try later."
    );

    // ip-based
    await this.checkLimit(
      `upload:ip:${ip}`,
      300,
      10,
      "Too many uploads from this IP."
    );
  }

  async checkReadLimit(ip: string) {
    await this.checkLimit(
      `read:ip:${ip}`,
      60,      // 1 min
      50,      // allow more since it's read
      "Too many requests. Please slow down."
    );
  }

    // 🔐  Data Insert (USER + IP)
    async checkInsertLimit(userId: string, ip: string) {
      // user-based
      await this.checkLimit(
        `upload:user:${userId}`,
        60,
        10,
        "Too many uploads. Try later."
      );
  
      // ip-based
      await this.checkLimit(
        `upload:ip:${ip}`,
        60,
        15,
        "Too many uploads from this IP."
      );
    }
}