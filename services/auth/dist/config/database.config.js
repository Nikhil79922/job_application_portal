import { Pool } from "pg";
import { env } from "./env.js";
export const pool = new Pool({
    connectionString: env.DATABASE_URL,
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
        console.log("[DB] keep-alive ping");
    }
    catch (err) {
        console.error("[DB] ping failed", err);
    }
}, 2 * 60 * 1000); // every 2 minutes
