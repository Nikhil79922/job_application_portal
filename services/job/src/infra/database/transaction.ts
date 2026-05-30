import { pool } from "../../config/database.config.js";
import { PoolClient } from "pg";
import logger from "../../config/logger.js";

export const executeInTransaction = async <T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await callback(client);

    await client.query("COMMIT");
    return result;
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackErr) {
      logger.error("Rollback failed:", { error: rollbackErr });
    }
    throw err;
  }finally {
    client.release();
  }
};