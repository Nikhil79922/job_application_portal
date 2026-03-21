import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import { getUserProfiles } from "../../containers/user/getUserProfile.container.js";
import AppError from "../../shared/errors/AppError.js";
import { updateUserProfileSchema } from "../dtos/updateUserProfile.schema.js";
import { updateUserProfiles } from "../../containers/user/updateUserProfile.container.js";
import { updateProfilePicSchema } from "../dtos/updateProfilePic.schema.js";
import { updateProfilePics } from "../../containers/user/updateProfilePic.container.js";

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  sendResponse(res, 200, "Personal details fetched successfully", req.user);
});

export const getUserProfile = TryCatch(async (req: Request, res: Response) => {
 const  {userId}= req.params;
 const data = await getUserProfiles.getData(Number(userId))
 sendResponse(res, 200 , "User details fetched successfully",data)
});

export const updateUserProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
 const userData= req.user;
 if (!userData) {
  throw new AppError("Unauthorized", 401);
}
const dto = updateUserProfileSchema.parse(req.body)

const resData= await updateUserProfiles.updateDetails(dto,userData)
  sendResponse(res, 200 , "User details updated successfully",resData)
 });


 export const updateProfilePic = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData= req.user;
  if (!userData) {
   throw new AppError("Unauthorized", 401);
 }
 const dto = updateProfilePicSchema.parse({
  file: req.file,
});
 
 const resData= await updateProfilePics.updatePic(dto.file,userData)
   sendResponse(res, 200 , "User profile pic updated successfully",resData)
  });