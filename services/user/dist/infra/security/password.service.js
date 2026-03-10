import bcrypt from "bcrypt";
export class BcryptPasswordService {
    async hash(password) {
        return bcrypt.hash(password, 10);
    }
    async compare(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}
