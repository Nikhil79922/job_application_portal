import app from './app.js';
import dotenv from 'dotenv';
import { UserTable } from './repositories/users/usersTable.js';
import { SkillsTable } from './repositories/skills/skillsTable.js';
import { UserSkillsTable } from './repositories/user_skills/user_skillsTable.js';
dotenv.config();
let port = process.env.PORT;
//DB
async function initDB() {
    try {
        await UserTable.createRoleEnum();
        await UserTable.createTable();
        await SkillsTable.createTable();
        await UserSkillsTable.createTable();
        console.log("✅ DataBase initialization successfully done");
    }
    catch (e) {
        console.log("❌ Error in DataBase initialization", e);
        process.exit(1);
    }
}
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Auth Server is Listening at Port ${port}`);
    });
});
