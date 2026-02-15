import jwt from "jsonwebtoken";
export default class jwtToken {
    static async JWTtoken(payload, secret, expires) {
        const token = jwt.sign(payload, secret, { expiresIn: expires, });
        return token;
    }
    static async JWTtokenVerify(token, secret) {
        try {
            const decodedToken = jwt.verify(token, secret);
            console.log("token=======>", decodedToken);
            return decodedToken;
        }
        catch (error) {
            console.log("JWT====>", error);
        }
    }
}
