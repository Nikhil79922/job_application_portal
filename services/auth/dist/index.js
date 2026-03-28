import app from './app.js';
import { UserModel } from './infra/database/models/user.model.js';
import { SkillsModel } from './infra/database/models/skill.model.js';
import { UserSkillsModel } from './infra/database/models/userSkills.model.js';
import { RefreshTokenModel } from './infra/database/models/refreshToken.model.js';
import { env } from './config/env.js';
import { startRefreshTokenCleanup } from './shared/job/refreshTokenCleanUp.cronJob.js';
import { pool } from './config/database.config.js';
let port = env.PORT;
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
        console.log("✅ DataBase initialization successfully done");
        // force multiple connections
        await Promise.all(Array.from({ length: 5 }, () => pool.query("SELECT 1")));
        console.log("✅ DB warmed up");
    }
    catch (e) {
        console.log("❌ Error in DataBase initialization", e);
        process.exit(1);
    }
}
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Auth Server is Listening at Port ${port}`);
        //Cron Clean Up 
        startRefreshTokenCleanup();
    });
});
