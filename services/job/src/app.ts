import express from "express";
import cookieParser from "cookie-parser";

import CompanyRoute from "./api/routes/company/company.route.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";

// IMPORTANT: this ensures container initializes
import "./composition-root/InfraConnect.container.js";
import './composition-root/rateLimiting.container.js';
import './composition-root/company/createCompany.container.js'

const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/job", CompanyRoute);


// Global error handler
app.use(errorMiddleware);

export default app;