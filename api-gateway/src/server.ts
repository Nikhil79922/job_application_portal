import app from "./app";
import { env } from "./config/env";
import logger from "./config/logger";

// Unhandled exception handler
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception", {
    message: error.message,
    stack: error.stack,
    name: error.name,
  });
  process.exit(1);
});

// Unhandled rejection handler
process.on("unhandledRejection", (reason: any) => {
  logger.error("Unhandled Rejection", {
    message: reason?.message || String(reason),
    stack: reason?.stack,
  });
  process.exit(1);
});

const start = async () => {
  try {
    await app.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    logger.info(`🚀 API Gateway running on port ${env.PORT}`);
  } catch (err: any) {
    logger.error("Failed to start API Gateway", {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  }
};

start();
