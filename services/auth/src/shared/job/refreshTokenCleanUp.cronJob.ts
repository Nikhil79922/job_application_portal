import cron from "node-cron";
import { pool } from "../../config/database.config.js";
import logger from "../../config/logger.js";

export const startRefreshTokenCleanup = () => {
  cron.schedule("0 */6 * * *", async () => {
    try {
      const startTime = Date.now();

      const result = await pool.query(`
        DELETE FROM refresh_tokens
        WHERE expires_at < NOW()
        RETURNING token_id
      `);

      const durationMs = Date.now() - startTime;

      logger.info(
        `[CRON] Expired refresh tokens cleaned: ${result.rowCount} (took ${durationMs}ms)`
      );

    } catch (error) {
      logger.error("[CRON] Refresh token cleanup failed:", { error });
    }
  });
};