import app from './app.js'
import dotenv from 'dotenv'
import { sql } from './library/neonDB/db.js';
import { UserModel } from './models/users/usersTable.js';
import { SkillsModel } from './models/skills/skillsTable.js';
import { UserSkillsModel } from './models/user_skills/user_skillsTable.js';
dotenv.config();

let port = process.env.PORT

//DB
async function initDB() {
    try {
       await UserModel.createRoleEnum();

       await UserModel.createTable(); 
    
       await SkillsModel.createTable();

       await UserSkillsModel.createTable();
        console.log("✅ DataBase initialization successfully done",);
    } catch (e) {
        console.log("❌ Error in DataBase initialization", e);
        process.exit(1);
    }
}
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Auth Server is Listening at Port ${port}`)
    })
})
