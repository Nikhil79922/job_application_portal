import express from "express";
import cookieParser from "cookie-parser";

import CompanyRoute from "./api/routes/company/company.route.js";
import JobRoute from "./api/routes/job/job.route.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";

// IMPORTANT: this ensures container initializes
import "./composition-root/InfraConnect.container.js";
import './composition-root/rateLimiting.container.js';
import './composition-root/company/createCompany.container.js';
import './composition-root/company/getAllCompany.container.js';
import './composition-root/company/getCompanyDeatils.container.js';
import './composition-root/company/deleteCompany.container.js';
import './composition-root/job/createJob.container.js';
import './composition-root/job/updateJob.container.js';


const app = express();

app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/job/company", CompanyRoute);
app.use("/api/job",JobRoute);


// Global error handler
app.use(errorMiddleware);

export default app;