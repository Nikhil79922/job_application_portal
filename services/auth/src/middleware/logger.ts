import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const sanitizeQuery = (query: Record<string, any>) => {
  const blockedKeys = ["password", "token", "otp", "secret"];

  const safeQuery: Record<string, any> = {};

  for (const key in query) {
    if (!blockedKeys.includes(key.toLowerCase())) {
      safeQuery[key] = query[key];
    }
  }

  return safeQuery;
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  (req as any).requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    const log = {
      timestamp: new Date().toISOString(),
      requestId,
      method: req.method,
      path: req.originalUrl.split("?")[0],
      query: sanitizeQuery(req.query as Record<string, any>),
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };

    // if (process.env.NODE_ENV === "production") {
    //   console.log(JSON.stringify(log));
    // } else {
      console.log(JSON.stringify(log));
    // }
  });

  next();
};

export default logger;
