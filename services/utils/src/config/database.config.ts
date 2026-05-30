import { Pool } from "pg";
import { env } from "./env.js";
import logger from "./logger.js";


export const pool = new Pool({
  connectionString: env.DATABASE_URL as string,

  ssl: env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,

  max: 20,                  
  idleTimeoutMillis: 120000,
  connectionTimeoutMillis: 10000,
});

// ADD HERE (keep-alive)
setInterval(async () => {
    try {
    await pool.query("SELECT 1");
    logger.debug("[DB] keep-alive ping");
  } catch (err) {
    logger.error("[DB] ping failed", { error: err });
    }
  }, 2 * 60 * 1000); // every 2 minutes