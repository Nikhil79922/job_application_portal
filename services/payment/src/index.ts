import app from './app.js'
import logger from './config/logger.js';
import { UserModel } from './infra/database/models/user.model.js';
import { env } from './config/env.js';
import { runMigrations } from './infra/database/migrationRunner.js';
import { pool } from './config/database.config.js';


let port = env.PORT

const users= new UserModel();


//DB
async function initDB() {
    try {
       await users.createRoleEnum();

       await users.createTable(); 
       
        logger.info("✅ DataBase initialization successfully done");
        await Promise.all(
            Array.from({ length: 1 }, () => pool.query("SELECT 1"))
        );
        logger.info("✅ DB warmed up");
    } catch (e) {
        logger.error("❌ Error in DataBase initialization", { error: e });
        process.exit(1);
    }
}
initDB().then(() => {
    app.listen(port, () => {
        logger.info(`Payment Server is Listening at Port ${port}`)
        runMigrations()
    })
})
