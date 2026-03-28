import cron from "node-cron";
import { pool } from "../../config/database.config.js";
export const startRefreshTokenCleanup = () => {
    cron.schedule("0 */6 * * *", async () => {
        try {
            const result = await pool.query(`
        DELETE FROM refresh_tokens
        WHERE expires_at < NOW()
      `);
            console.log(`[CRON] Expired refresh tokens cleaned: ${result}`);
        }
        catch (error) {
            console.error("[CRON] Refresh token cleanup failed:", error);
        }
    });
};
