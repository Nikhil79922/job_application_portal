import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import PaymentRouter from "./api/routes/payment.routes.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import logger from "./shared/middleware/logger.middleware.js";
import { initApp } from "./composition-root/index.js";
import { env } from "./config/env.js";


// IMPORTANT: this ensures container initializes
await initApp()

const allowedOrigins = [
   env.Frontend_Url,
    "http://192.0.0.2:3000",
  ]
  

const app = express();
app.use(
    cors({
      origin: (
        origin,
        callback
      ) => {
        if (!origin ||allowedOrigins.includes(origin)) {
          callback(
            null,
            true
          )} else {
          callback(
            new Error(
              "Not allowed by CORS"
            ) )
        }},
      credentials: true,
    })
  )

app.use(logger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/payment", PaymentRouter);


// Global error handler
app.use(errorMiddleware);

export default app;