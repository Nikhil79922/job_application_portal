import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import { getUserProfiles } from "../../composition-root/user/getUserProfile.container.js";
import AppError from "../../shared/errors/AppError.js";
import { updateUserProfileSchema } from "../dtos/updateUserProfile.schema.js";
import { updateUserProfiles } from "../../composition-root/user/updateUserProfile.container.js";
import { updateProfilePicSchema } from "../dtos/updateProfilePic.schema.js";
import { updateProfilePics } from "../../composition-root/user/updateProfilePic.container.js";
import { updateResumeSchema } from "../dtos/updateResume.schema.js";
import { updateResumesService } from "../../composition-root/user/updateResume.container.js";
import { rateLimit } from "../../composition-root/rateLimiting.container.js";
import { addSkillsToUserService } from "../../composition-root/user/addSkillsToUser.container.js";
import { SkillsToUserSchema } from "../dtos/SkillsToUser.schema.js";
import { deleteSkillsToUserService } from "../../composition-root/user/deleteSkillsToUser.container.js";

// Helper function
const getClientIP = (req: Request) =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
  req.ip ||
  "unknown";

 // Route Controller
export const myProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  sendResponse(res, 200, "Personal details fetched successfully", req.user);
});

export const getUserProfile = TryCatch(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const ip = getClientIP(req);

//  light rate limit (read API)
await rateLimit.checkReadLimit(ip);
  const data = await getUserProfiles.getData(Number(userId));
  sendResponse(res, 200, "User details fetched successfully", data);
});

export const updateUserProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  const ip = getClientIP(req);

  // 🔥 STRONG RATE LIMIT (user + ip)
  await rateLimit.checkUpdateProfileLimit(
    String(userData.user_id),
    ip
  );

  const dto = updateUserProfileSchema.parse(req.body);

  const resData = await updateUserProfiles.updateDetails(dto, userData);

  sendResponse(res, 200, "User details updated successfully", resData);
});

export const updateProfilePic = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  const ip = getClientIP(req);

  // 🔥 STRONG RATE LIMIT (upload)
  await rateLimit.checkUploadLimit(
    String(userData.user_id),
    ip
  );

  const dto = updateProfilePicSchema.parse({
    file: req.file,
  });

  const resData = await updateProfilePics.updatePic(dto.file, userData);

  sendResponse(res, 200, "User profile pic updated successfully", resData);
});

export const updateResume = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  const ip = getClientIP(req);

  //  STRONG RATE LIMIT (upload)
  await rateLimit.checkUploadLimit(
    String(userData.user_id),
    ip
  );

  const dto = updateResumeSchema.parse({
    file: req.file,
  });

  const resData = await updateResumesService.updateResume(dto.file, userData);

  sendResponse(res, 200, "User resume updated successfully", resData);
});

export const addSkillToUser = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  const ip = getClientIP(req);
  //  STRONG RATE LIMIT (insert)
  await rateLimit.checkInsertLimit(
    String(userData.user_id),
    ip
  );

  const dto = SkillsToUserSchema.parse(req.body);

  const resData = await addSkillsToUserService.updateDetails(dto, userData);
  sendResponse(res, 200, resData.message );
});

export const deleteSkillToUser = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  const dto = SkillsToUserSchema.parse(req.body);

  const resData = await deleteSkillsToUserService.updateDetails(dto, userData);
  sendResponse(res, 200, resData.message );
});