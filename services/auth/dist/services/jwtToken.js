import jwt from "jsonwebtoken";
export default class jwtToken {
    static async JWTtoken(payload, secret, expires) {
        const token = jwt.sign(payload, secret, { expiresIn: expires, });
        console.log("token", token);
        return token;
    }
}
