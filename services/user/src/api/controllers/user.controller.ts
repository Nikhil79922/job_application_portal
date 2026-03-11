import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  sendResponse(res, 200, "Registered Successfully", req.user);
});
