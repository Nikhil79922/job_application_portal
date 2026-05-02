import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DB_URL!,

  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUD_NAME!,
    API_KEY: process.env.API_KEY!,
    API_SECRET: process.env.API_SECRET!,
  },

  KAFKA_BROKER: process.env.KAFKA_BROKER!,

  GMAIL: {
    USER: process.env.GMAIL_USER!,
    PASSWORD: process.env.GMAIL_PASSWORD!,
  },

  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
};