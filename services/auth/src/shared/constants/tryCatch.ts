import { Handler, NextFunction, Request, Response } from "express";

const TryCatch = (handle: Handler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handle(req,res,next);
        } catch (error:any) {
            console.log(error.message);
            next(error);
        }
    }
}
export default TryCatch;