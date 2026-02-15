import axios from "axios";
import { jwtPayload, } from '../dtos/authLogin.schema.js'
import jwt, { SignOptions } from "jsonwebtoken";

export default class jwtToken {
    static async JWTtoken(payload: jwtPayload, secret: string, expires: SignOptions["expiresIn"]) {
        const token = jwt.sign(payload, secret, { expiresIn: expires, })
        return token
    }

    static async JWTtokenVerify(token:string, secret:string) {
        try {
            const decodedToken = jwt.verify(token, secret)
            console.log("token=======>",decodedToken)
            return decodedToken 
        } catch (error) {
           console.log("JWT====>",error)
        }
    }
} 
