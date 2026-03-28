import argon2 from "argon2";
export class Argon2PasswordService {
    async hash(password) {
        return argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 2,
            parallelism: 1,
        });
    }
    async compare(password, hashedPassword) {
        return argon2.verify(hashedPassword, password);
    }
}
