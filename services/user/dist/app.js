import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./api/routes/user.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";
// IMPORTANT: this ensures container initializes
import "./containers/InfraConnect.container.js";
import './containers/rateLimiting.container.js';
import './containers/user/getUserProfile.container.js';
import './containers/user/updateUserProfile.container.js';
import './containers/user/updateProfilePic.container.js';
const app = express();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/user", UserRouter);
// Global error handler
app.use(errorMiddleware);
export default app;
