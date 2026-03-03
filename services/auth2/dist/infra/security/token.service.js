import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../../config/env.js";
export class JwtTokenService {
    async generateAccessToken(payload) {
        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: "15m"
        });
    }
    generateRefreshToken() {
        return crypto.randomBytes(64).toString("hex");
    }
    hashToken(token) {
        return crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
    }
    verify(token) {
        return jwt.verify(token, env.JWT_SECRET);
    }
}
