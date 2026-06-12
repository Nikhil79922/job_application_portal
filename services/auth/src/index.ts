import {app} from './app.js'
import logger from './config/logger.js';
import { UserModel } from './infra/database/models/user.model.js';
import { SkillsModel } from './infra/database/models/skill.model.js';
import { UserSkillsModel } from './infra/database/models/userSkills.model.js';
import { RefreshTokenModel } from './infra/database/models/refreshToken.model.js';
import { env } from './config/env.js';
import { startRefreshTokenCleanup } from './shared/job/refreshTokenCleanUp.cronJob.js';
import { pool } from './config/database.config.js';
import { runMigrations } from './infra/database/migrationRunner.js';

let port = env.PORT

const users = new UserModel();
const skills = new SkillsModel();
const userSkills = new UserSkillsModel();
const refreshToken = new RefreshTokenModel();

//DB
async function initDB() {
    try {
        await users.createRoleEnum();

        await users.createTable();

        await skills.createTable();

        await userSkills.createTable();

        await refreshToken.createTable();

        logger.info("✅ DataBase initialization successfully done");
        // force multiple connections
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
        logger.info(`Auth Server is Listening at Port ${port}`)
        //Cron Clean Up 
        startRefreshTokenCleanup()
        runMigrations()
    })
})
