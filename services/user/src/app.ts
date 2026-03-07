import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./api/routes/auth.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";

// IMPORTANT: this ensures container initializes
import "./containers/InfraConnect.container.js";
import './containers/rateLimiting.container.js'
import './containers/auth/login.container.js'
import './containers/auth/logout.container.js'
import './containers/auth/refreshToken.container.js'
import './containers/auth/register.container.js'
import './containers/auth/reset.container.js'

const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);


// Global error handler
app.use(errorMiddleware);

export default app;