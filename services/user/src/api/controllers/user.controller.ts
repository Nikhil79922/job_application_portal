import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import { getUserProfiles } from "../../containers/user/getUserProfile.container.js";
import { number } from "zod";

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  sendResponse(res, 200, "Personal details fetched", req.user);
});

export const getUserProfile = TryCatch(async (req: Request, res: Response) => {
 const  {userId}= req.params;
 const data = await getUserProfiles.getData(Number(userId))
 sendResponse(res, 200 , "User details fetched Successfully ",data)
});