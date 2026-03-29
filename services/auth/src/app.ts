import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRouter from "./api/routes/auth.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";

// IMPORTANT: this ensures container initializes
import "./composition-root/InfraConnect.container.js";
import './composition-root/rateLimiting.container.js'
import './composition-root/auth/login.container.js'
import './composition-root/auth/logout.container.js'
import './composition-root/auth/refreshToken.container.js'
import './composition-root/auth/register.container.js'
import './composition-root/auth/reset.container.js'

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