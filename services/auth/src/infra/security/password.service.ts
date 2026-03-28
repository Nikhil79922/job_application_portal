import argon2 from "argon2";
import { IPasswordService } from "../../domain/interfaces/password.service.interface.js";

export class Argon2PasswordService implements IPasswordService {

  async hash(password: string) {
    return argon2.hash(password, {
      type: argon2.argon2id, 
      memoryCost: 2 ** 16, 
      timeCost: 2,         
      parallelism: 1,
    });
  }

  async compare(password: string, hashedPassword: string) {
    return argon2.verify(hashedPassword, password);
  }
}