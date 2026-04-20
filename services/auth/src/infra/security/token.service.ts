import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ITokenService } from "../../domain/interfaces/token.service.interface.js";
import { env } from "../../config/env.js";

export class JwtTokenService implements ITokenService {

    async generateAccessToken(payload: any) {
        return jwt.sign(payload, env.JWT_SECRET!, {
            expiresIn: "15d"  // only till the development phase
        });
    }

    generateRefreshToken() {
        return crypto.randomBytes(64).toString("hex");
    }

    hashToken(token: string) {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
    }
    
    verify(token: string) {
        return jwt.verify(token, env.JWT_SECRET!);
    }
}