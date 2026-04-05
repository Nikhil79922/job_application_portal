// src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.SECRET_KEY!,
  REDIS_URL: process.env.Redis_url!,
  SERVICES: {
    AUTH: process.env.AUTH_SERVICE!,
    USER: process.env.USER_SERVICE!,
    JOB: process.env.JOB_SERVICE!,
  },
};