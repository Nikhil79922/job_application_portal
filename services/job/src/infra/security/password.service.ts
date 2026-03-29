import bcrypt from "bcrypt";
import { IPasswordService } from "../../domain/interfaces/password.service.interface.js";

export class BcryptPasswordService implements IPasswordService {
    async hash(password: string) {
        return bcrypt.hash(password, 10);
    }

    async compare(password:string, hashedPassword:string){
        return  bcrypt.compare(password, hashedPassword)
    }

}