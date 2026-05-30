import { FastifyRequest, FastifyReply } from "fastify";
import crypto from "crypto";
import logger from "../config/logger";

const SENSITIVE_KEYS = [
  "password",
  "token",
  "otp",
  "secret",
  "authorization",
  "cookie",
  "refreshToken",
  "accessToken",
  "cardNumber",
  "cvv",
  "pin",
  "ssn",
];

const sanitize = (obj: Record<string, any> | undefined): Record<string, any> => {
  if (!obj || typeof obj !== "object") return {};
  const safe: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    if (SENSITIVE_KEYS.some((s) => key.toLowerCase().includes(s))) {
      safe[key] = "[REDACTED]";
    } else {
      safe[key] = obj[key];
    }
  }
  return safe;
};

export const requestLogger = async (req: FastifyRequest, reply: FastifyReply) => {
  const requestId = crypto.randomUUID();
  (req as any).requestId = requestId;
  (req as any).startTime = Date.now();
  reply.header("X-Request-Id", requestId);
};

export const responseLogger = async (req: FastifyRequest, reply: FastifyReply) => {
  const duration = Date.now() - ((req as any).startTime || Date.now());
  const log = {
    requestId: (req as any).requestId,
    method: req.method,
    url: req.url.split("?")[0],
    query: sanitize(req.query as Record<string, any>),
    statusCode: reply.statusCode,
    duration: `${duration}ms`,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  if (reply.statusCode >= 500) {
    logger.error("Request failed", log);
  } else if (reply.statusCode >= 400) {
    logger.warn("Client error", log);
  } else {
    logger.http("Request completed", log);
  }
};
