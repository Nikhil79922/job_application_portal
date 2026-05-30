import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { redis } from "./config/redis";
import { verifyToken } from "./middlewares/auth.middleware";
import { requestLogger, responseLogger } from "./middlewares/logger.middleware";
import logger from "./config/logger";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import jobRoutes from "./routes/job.route";
import utilsRoute from "./routes/utils.route";
import paymentRoute from "./routes/payment.route";

const app = Fastify({
  logger: false,
  bodyLimit: 10485760,
});

// CORS
app.register(cors, {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Multipart
app.register(multipart, {
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
});

// Rate limiting
app.register(rateLimit, {
  global: true,
  max: 200,
  timeWindow: "1 minute",
  redis,
  allowList: (req) => !!req.headers.authorization,
  keyGenerator: (req) => {
    if (req.headers.authorization) return req.headers.authorization;
    return `${req.ip}:${req.headers["user-agent"] || ""}`;
  },
});

// Request logging hook
app.addHook("onRequest", requestLogger);

// Response logging hook
app.addHook("onResponse", responseLogger);

// Auth hook
app.addHook("onRequest", async (req, reply) => {
  const publicPrefixes = ["/api/auth", "/api/job/public", "/api/user/public", "/api/utils/ai"];
  const isPublic = publicPrefixes.some((prefix) => req.url.startsWith(prefix));
  if (isPublic) return;
  await verifyToken(req);
});

// Routes
app.register(authRoutes);
app.register(userRoutes);
app.register(jobRoutes);
app.register(utilsRoute);
app.register(paymentRoute);

// Error handler
app.setErrorHandler((error: any, req, reply) => {
  logger.error("Request error", {
    requestId: (req as any).requestId,
    method: req.method,
    url: req.url,
    statusCode: error.statusCode || 500,
    message: error.message,
    stack: error.stack,
  });

  if (error.statusCode && error.statusCode < 500) {
    return reply.status(error.statusCode).send(error);
  }

  reply.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;
