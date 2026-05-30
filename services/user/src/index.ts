import app from './app.js'
import logger from './config/logger.js';
import { UserModel } from './infra/database/models/user.model.js';
import { SkillsModel } from './infra/database/models/skill.model.js';
import { UserSkillsModel } from './infra/database/models/userSkills.model.js';
import { env } from './config/env.js';
import { MigrationModel } from './infra/database/models/migration.model.js';
import { runMigrations } from './infra/database/migrationRunner.js';
import { pool } from './config/database.config.js';


let port = env.PORT

const users= new UserModel();
const skills= new SkillsModel();
const userSkills= new UserSkillsModel();
const migrations= new MigrationModel();


//DB
async function initDB() {
    try {
       await users.createRoleEnum();

       await users.createTable(); 
    
       await skills.createTable();

       await userSkills.createTable();

       await migrations.createTable();
       
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
        logger.info(`User Server is Listening at Port ${port}`)
        runMigrations()
    })
})
