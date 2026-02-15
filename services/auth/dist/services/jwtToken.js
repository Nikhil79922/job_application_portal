import jwt from "jsonwebtoken";
import AppError from "../utlis/AppError.js";
export default class jwtToken {
    static async JWTtoken(payload, secret, expires) {
        const token = jwt.sign(payload, secret, { expiresIn: expires, });
        return token;
    }
    static JWTtokenVerify(token, secret) {
        try {
            return jwt.verify(token, secret);
        }
        catch (error) {
            throw new AppError("Invalid or expired token", 400);
        }
    }
}
