import dotenv from "dotenv";
dotenv.config();
export const env = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DB_URL,
    REDIS_URL: process.env.Redis_url,
    JWT_SECRET: process.env.SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    Utils_service: process.env.Utils_service,
    Kakfa_Broker: process.env.Kakfa_Broker,
    Frontend_Url: process.env.Frontend_Url,
};
