import { Handler, NextFunction , Response } from "express";
import { AuthenticatedRequest } from "../types/user.type.js";

const TryCatch = (handle: Handler) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            await handle(req,res,next);
        } catch (error:any) {
            console.log(`Catched Error` , error)
            next(error);
        }
    }
}
export default TryCatch;