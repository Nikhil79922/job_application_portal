import { Handler, NextFunction, Request, Response } from "express";

const TryCatch = (handle: Handler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handle(req,res,next);
        } catch (error:any) {
            next(error);
        }
    }
}
export default TryCatch;