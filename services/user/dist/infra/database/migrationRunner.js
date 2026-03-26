import fs from "fs";
import path from "path";
import { pool } from "../../config/database.config.js";
import { executeInTransaction } from "./transaction.js";
const migrationsDir = path.join(process.cwd(), "src/infra/database/migrations");
export const runMigrations = async () => {
    const client = await pool.connect();
    try {
        await client.query("SELECT pg_try_advisory_lock(123456) AS locked");
        const files = fs.readdirSync(migrationsDir).sort();
        for (const file of files) {
            const { rows } = await client.query("SELECT 1 FROM migrations WHERE name = $1", [file]);
            if (rows.length === 0) {
                console.log(`Running migration: ${file}`);
                const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
                await executeInTransaction(async (tx) => {
                    await tx.query(sql);
                    await tx.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
                });
            }
        }
    }
    catch (err) {
        console.error("Migration failed:", err);
    }
    finally {
        await client.query("SELECT pg_advisory_unlock(123456)");
        client.release();
    }
};
