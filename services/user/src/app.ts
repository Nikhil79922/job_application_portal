import express from "express";
import cookieParser from "cookie-parser";

import UserRouter from "./api/routes/user.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";

// IMPORTANT: this ensures container initializes
import "./composition-root/helper/InfraConnect.container.js";
import './composition-root/helper/rateLimiting.container.js';
import './composition-root/user/getUserProfile.container.js';
import './composition-root/user/updateUserProfile.container.js';
import './composition-root/user/updateProfilePic.container.js';
import './composition-root/user/updateResume.container.js';
import './composition-root/user/addSkillsToUser.container.js';
import './composition-root/user/deleteSkillsToUser.container.js';
import './composition-root/user/appliedForJob.container.js'
import './composition-root/user/getAllJobApplications.container.js'

const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", UserRouter);


// Global error handler
app.use(errorMiddleware);

export default app;