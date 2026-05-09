import { FastifyReply, FastifyRequest } from "fastify";
import crypto from "node:crypto";

import { redis } from "../config/redis";
import { env } from "../config/env";

const PER_MINUTE_LIMIT =
  Number(env?.AI_SERVICE?.AI_PER_MINUTE_LIMIT ?? 3);

const PER_DAY_LIMIT =
  Number(env?.AI_SERVICE?.AI_PER_DAY_LIMIT ?? 20);

// ---------------- FORMAT REMAINING TIME ----------------

const formatRemainingTime = (seconds: number) => {

  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;

};

export const aiQuotaMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {

  try {

    // ---------------- IDENTIFIER ----------------

    const rawIdentifier =
      (req.headers.authorization as string) || req.ip;

    // never expose/store raw token in redis
    const identifier = crypto
      .createHash("sha256")
      .update(rawIdentifier)
      .digest("hex");

    // ---------------- DATE ----------------

    const today =
      new Date().toISOString().split("T")[0] ?? "unknown";

    // ---------------- REDIS KEYS ----------------

    const minuteKey = `ai:min:${identifier}`;
    const dayKey = `ai:day:${identifier}:${today}`;

    // ---------------- FETCH COUNTS ----------------

    const [minuteCountRaw, dayCountRaw] = await Promise.all([
      redis.get(minuteKey),
      redis.get(dayKey),
    ]);

    const minuteCount = Number(minuteCountRaw ?? 0);
    const dayCount = Number(dayCountRaw ?? 0);

    // ---------------- MINUTE LIMIT ----------------

    if (minuteCount >= PER_MINUTE_LIMIT) {

      const ttl = await redis.ttl(minuteKey);

      const retryAfter =
        Number(ttl) > 0 ? Number(ttl) : 60;

      const timeRemaining =
        formatRemainingTime(retryAfter);

      const nextAvailableTime = new Date(
        Date.now() + retryAfter * 1000
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return reply.status(429).send({
        success: false,
        type: "MINUTE_LIMIT_EXCEEDED",
        message:
          `Too many AI requests right now. Please try again in ${timeRemaining}.`,
        retryAfter,
        timeRemaining,
        nextAvailableTime,
      });

    }

    // ---------------- DAILY LIMIT ----------------

    if (dayCount >= PER_DAY_LIMIT) {

      const ttl = await redis.ttl(dayKey);

      const retryAfter =
        Number(ttl) > 0 ? Number(ttl) : 86400;

      const timeRemaining =
        formatRemainingTime(retryAfter);

      const nextAvailableTime = new Date(
        Date.now() + retryAfter * 1000
      ).toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });

      return reply.status(429).send({
        success: false,
        type: "DAILY_LIMIT_EXCEEDED",
        message:
          `You have reached today's AI usage limit. Please try again in ${timeRemaining}.`,
        retryAfter,
        timeRemaining,
        nextAvailableTime,
      });

    }

    // ---------------- REDIS MULTI ----------------

    const multi = redis.multi();

    multi.incr(minuteKey);
    multi.incr(dayKey);

    // set expiry only once
    if (minuteCount === 0) {
      multi.expire(minuteKey, 60);
    }

    if (dayCount === 0) {
      multi.expire(dayKey, 86400);
    }

    await multi.exec();

    // ---------------- RESPONSE HEADERS ----------------

    reply.header(
      "X-AI-Minute-Remaining",
      Math.max(PER_MINUTE_LIMIT - (minuteCount + 1), 0)
    );

    reply.header(
      "X-AI-Day-Remaining",
      Math.max(PER_DAY_LIMIT - (dayCount + 1), 0)
    );

  } catch (error: any) {

    req.log.error({
      message: error?.message,
      stack: error?.stack,
      error,
    }, "AI quota middleware failed");

    return reply.status(500).send({
      success: false,
      message:
        "Something went wrong while validating AI usage limits.",
    });

  }

};