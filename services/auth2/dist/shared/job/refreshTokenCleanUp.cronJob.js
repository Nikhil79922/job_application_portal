import cron from "node-cron";
import { sql } from "../../config/database.config.js";
export const startRefreshTokenCleanup = () => {
    cron.schedule("0 */6 * * *", async () => {
        try {
            const result = await sql `
        DELETE FROM refresh_tokens
        WHERE expires_at < NOW()
      `;
            console.log(`[CRON] Expired refresh tokens cleaned: ${result}`);
        }
        catch (error) {
            console.error("[CRON] Refresh token cleanup failed:", error);
        }
    });
};
