import express from "express";
import cookieParser from "cookie-parser";

import UserRouter from "./api/routes/user.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";
import { initApp } from "./composition-root/index.js";


// IMPORTANT: this ensures container initializes
await initApp()


const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", UserRouter);


// Global error handler
app.use(errorMiddleware);

export default app;