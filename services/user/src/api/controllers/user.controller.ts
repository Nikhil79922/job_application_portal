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
import { rateLimit } from "../../composition-root/helper/rateLimiting.container.js";
import { addSkillsToUserService } from "../../composition-root/user/addSkillsToUser.container.js";
import { SkillsToUserSchema } from "../dtos/SkillsToUser.schema.js";
import { deleteSkillsToUserService } from "../../composition-root/user/deleteSkillsToUser.container.js";
import { applyForJobService } from "../../composition-root/user/appliedForJob.container.js";
import { allJobApplicationService } from "../../composition-root/user/getAllJobApplications.container.js";

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

  //  STRONG RATE LIMIT (user + ip)
  await rateLimit.checkUpdateProfileLimit(
    String(userData.user_id),
    ip
  );

  const dto = updateUserProfileSchema.parse(req.body);

  const resData = await updateUserProfiles.updateDetails(dto, userData);

  sendResponse(res, 200, "User details updated successfully", resData);
});



export const updateProfilePic = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const userData = req.user;

    if (!userData) {
      throw new AppError("Unauthorized", 401);
    }

    const ip = getClientIP(req);

    //  Rate limit
    if(req.file){
      await rateLimit.checkUploadLimit(String(userData.user_id), ip);
    }

    // Normalize file (multer gives undefined if not present)
    const fileData = req.file
      ? {
          mimetype: req.file.mimetype,
          size: req.file.size,
          originalname: req.file.originalname,
        }
      : undefined;

    // Strict validation
    const dto = updateProfilePicSchema.parse({
      file: fileData,
      checkUpload: req.body.checkUpload,
    });

    const resData: any = await updateProfilePics.updatePic(
      {
        file: req.file as Express.Multer.File, // actual file passed to service
        checkUpload: dto.checkUpload,
      },
      userData
    );

    sendResponse(res, 200, resData.message, resData.data);
  }
);



export const updateResume = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const userData = req.user;

    if (!userData) {
      throw new AppError("Unauthorized", 401);
    }

    const ip = getClientIP(req);

    if(req.file){
      await rateLimit.checkUploadLimit(String(userData.user_id), ip);
    }

    // Normalize multer file
    const fileData = req.file
      ? {
          mimetype: req.file.mimetype,
          size: req.file.size,
          originalname: req.file.originalname,
        }
      : undefined;

    // Strict validation
    const dto = updateResumeSchema.parse({
      file: fileData,
      checkUpload: req.body.checkUpload,
    });

    const resData = await updateResumesService.updateResume(
      {
        file: req.file as Express.Multer.File, // actual file passed to service
        checkUpload: dto.checkUpload,
      },
      userData
    );

    sendResponse(res, 200, resData.message, resData.data);
  }
);



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


export const applyForJobController = TryCatch(async (req: AuthenticatedRequest, res: Response)=>{
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'jobseeker') {
    throw new AppError("Forbidden you are not allowed for applying the job ", 403);
  }

  const resume = userData.resume;
  if(!resume || resume==''){
    throw new AppError("Resume is required for this job, Please add your resume in your profile", 400);
  };
  const {jobId} =req.body;
  if (!jobId) {
    throw new AppError("Job ID is required", 400);
  }

  if (!/^\d+$/.test(jobId)) {
    throw new AppError("Job ID must be a valid number", 400);
  }

  if (Number(jobId) <= 0) {
    throw new AppError("Job ID must be a positive integer", 400);
  }

  if ( Number(jobId) > 1_000_000_000) {
    throw new AppError("job ID too large", 400);
  }
const resData = await applyForJobService.addApplicant(Number(jobId),userData)
sendResponse(res, 200, resData.message, resData.data );
});

export const getAllJobApplicationsController = TryCatch(async (req: AuthenticatedRequest, res: Response)=>{
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'jobseeker') {
    throw new AppError("Forbidden you are not allowed for applying the job ", 403);
  }

const resData = await allJobApplicationService.getAllApplications(userData)
sendResponse(res, 200, resData.message, resData.data );
});