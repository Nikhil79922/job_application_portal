import app from './app.js'
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
       
        console.log("✅ DataBase initialization successfully done",);
        await Promise.all(
            Array.from({ length: 1 }, () => pool.query("SELECT 1"))
        );
        console.log("✅ DB warmed up");
    } catch (e) {
        console.log("❌ Error in DataBase initialization", e);
        process.exit(1);
    }
}
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Payment Server is Listening at Port ${port}`)
        runMigrations()
    })
})
