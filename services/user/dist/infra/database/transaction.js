import { pool } from "../../config/database.config.js";
export const executeInTransaction = async (callback) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const result = await callback(client);
        await client.query("COMMIT");
        return result;
    }
    catch (err) {
        try {
            await client.query("ROLLBACK");
        }
        catch (rollbackErr) {
            console.error("Rollback failed:", rollbackErr);
        }
        throw err;
    }
    finally {
        client.release();
    }
};
