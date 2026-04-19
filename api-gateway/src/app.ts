import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import multipart from "@fastify/multipart";
import { redis } from "./config/redis";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import jobRoutes from "./routes/job.route";
import { verifyToken } from "./middlewares/auth.middleware";

const app = Fastify({
  logger: { level: "info" },
  bodyLimit: 10485760,
});

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5,
  },
});

app.register(rateLimit, {
  global: true,
  max: 200,
  timeWindow: "1 minute",
  redis,
  allowList: (req) => {
    return !!req.headers.authorization;
  },
 keyGenerator: (req) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }
  return `${req.ip}:${req.headers["user-agent"] || ""}`;
}
});

app.addHook("onRequest", async (req, reply) => {
  if (!req.url.startsWith("/api/auth")) {
    await verifyToken(req, reply);
  }
});

app.register(authRoutes);
app.register(userRoutes);
app.register(jobRoutes);

app.setErrorHandler((error: any, req, reply) => {
  if (error.statusCode && error.statusCode < 500) {
    return reply.status(error.statusCode).send(error);
  }

  reply.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
});

export default app;