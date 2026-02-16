import { jwtPayload, } from '../types/jwtType.js'
import jwt, { SignOptions,JwtPayload } from "jsonwebtoken";
import AppError from "./AppError.js";

interface ResetTokenPayload extends JwtPayload {
    email: string;
    type: string;
  }
  
export default class jwtToken {
    static async JWTtoken(payload: jwtPayload, secret: string, expires: SignOptions["expiresIn"]) {
        const token = jwt.sign(payload, secret, { expiresIn: expires, })
        return token
    }

    static JWTtokenVerify(token: string, secret: string): ResetTokenPayload {
        try {
          return jwt.verify(token, secret) as ResetTokenPayload;
        } catch (error) {
          throw new AppError("Invalid or expired token", 400);
        }
      }
      
} 
