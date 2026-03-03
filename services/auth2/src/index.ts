import app from './app.js'
import { UserModel } from './infra/database/models/user.model.js';
import { SkillsModel } from './infra/database/models/skill.model.js';
import { UserSkillsModel } from './infra/database/models/userSkills.model.js';
import { RefreshTokenModel } from './infra/database/models/refreshToken.model.js';
import { env } from './config/env.js';

let port = env.PORT

const users= new UserModel();
const skills= new SkillsModel();
const userSkills= new UserSkillsModel();
const refreshToken= new RefreshTokenModel();

//DB
async function initDB() {
    try {
       await users.createRoleEnum();

       await users.createTable(); 
    
       await skills.createTable();

       await userSkills.createTable();

       await refreshToken.createTable();
       
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
