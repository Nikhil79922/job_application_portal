import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";
// IMPORTANT: this ensures container initializes
import "./containers/authService.container.js";
import './containers/rateLimiting.container.js';
const app = express();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRouter);
// Global error handler
app.use(errorMiddleware);
export default app;
