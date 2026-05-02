import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./api/routes/auth.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";
import { initApp } from "./composition-root/index.js";
// IMPORTANT: this ensures container initializes
await initApp();
const app = express();
app.use(cors({
    origin: "http://10.29.86.240:51600",
    credentials: true
}));
app.use(logger);
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRouter);
// Global error handler
app.use(errorMiddleware);
export default app;
