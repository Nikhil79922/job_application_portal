import { Handler, NextFunction, Request, Response } from "express";
import logger from "../../config/logger.js";
const TryCatch = (handle: Handler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handle(req,res,next);
        } catch (error:any) {
            logger.error(error.message, { error });
            next(error);
        }
    }
}
export default TryCatch;