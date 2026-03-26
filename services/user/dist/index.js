import app from './app.js';
import { UserModel } from './infra/database/models/user.model.js';
import { SkillsModel } from './infra/database/models/skill.model.js';
import { UserSkillsModel } from './infra/database/models/userSkills.model.js';
import { env } from './config/env.js';
import { MigrationModel } from './infra/database/models/migration.model.js';
import { runMigrations } from './infra/database/migrationRunner.js';
let port = env.PORT;
const users = new UserModel();
const skills = new SkillsModel();
const userSkills = new UserSkillsModel();
const migrations = new MigrationModel();
//DB
async function initDB() {
    try {
        await users.createRoleEnum();
        await users.createTable();
        await skills.createTable();
        await userSkills.createTable();
        await migrations.createTable();
        console.log("✅ DataBase initialization successfully done");
    }
    catch (e) {
        console.log("❌ Error in DataBase initialization", e);
        process.exit(1);
    }
}
initDB().then(() => {
    app.listen(port, () => {
        console.log(`User Server is Listening at Port ${port}`);
        runMigrations();
    });
});
