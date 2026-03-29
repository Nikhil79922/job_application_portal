import { Request, Response } from "express";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { AuthenticatedRequest } from "../../shared/types/user.type.js";
import AppError from "../../shared/errors/AppError.js";
import { createCompanySchema } from "../dtos/createCompany.schema.js";

// Helper function
const getClientIP = (req: Request) =>
  (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
  req.ip ||
  "unknown";

// Route Controller
export const createCompanyController = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
  const userData = req.user;

  if (!userData) {
    throw new AppError("Unauthorized", 401);
  }

  if (userData.role !== 'recruiter') {
    throw new AppError("Only recruiter can create a company", 403);
  }

  const dto = createCompanySchema.parse({
    ...req.body,
    file: req.file,
  })

  const resData = await
    sendResponse(res, 200, "Personal details fetched successfully", req.user);
});






// export const getUserProfile = TryCatch(async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const ip = getClientIP(req);

// //  light rate limit (read API)
// await rateLimit.checkReadLimit(ip);
//   const data = await getUserProfiles.getData(Number(userId));
//   sendResponse(res, 200, "User details fetched successfully", data);
// });




// export const updateUserProfile = TryCatch(async (req: AuthenticatedRequest, res: Response) => {
//   const userData = req.user;

//   if (!userData) {
//     throw new AppError("Unauthorized", 401);
//   }

//   const ip = getClientIP(req);

//   //  STRONG RATE LIMIT (user + ip)
//   await rateLimit.checkUpdateProfileLimit(
//     String(userData.user_id),
//     ip
//   );

//   const dto = updateUserProfileSchema.parse(req.body);

//   const resData = await updateUserProfiles.updateDetails(dto, userData);

//   sendResponse(res, 200, "User details updated successfully", resData);
// });



// export const updateProfilePic = TryCatch(
//   async (req: AuthenticatedRequest, res: Response) => {
//     const userData = req.user;

//     if (!userData) {
//       throw new AppError("Unauthorized", 401);
//     }

//     const ip = getClientIP(req);

//     //  Rate limit
//     if(req.file){
//       await rateLimit.checkUploadLimit(String(userData.user_id), ip);
//     }

//     // Normalize file (multer gives undefined if not present)
//     const fileData = req.file
//       ? {
//           mimetype: req.file.mimetype,
//           size: req.file.size,
//           originalname: req.file.originalname,
//         }
//       : undefined;

//     // Strict validation
//     const dto = updateProfilePicSchema.parse({
//       file: fileData,
//       checkUpload: req.body.checkUpload,
//     });

//     const resData: any = await updateProfilePics.updatePic(
//       {
//         file: req.file as Express.Multer.File, // actual file passed to service
//         checkUpload: dto.checkUpload,
//       },
//       userData
//     );

//     sendResponse(res, 200, resData.message, resData.data);
//   }
// );

// export const updateResume = TryCatch(
//   async (req: AuthenticatedRequest, res: Response) => {
//     const userData = req.user;

//     if (!userData) {
//       throw new AppError("Unauthorized", 401);
//     }

//     const ip = getClientIP(req);

//     if(req.file){
//       await rateLimit.checkUploadLimit(String(userData.user_id), ip);
//     }

//     // Normalize multer file
//     const fileData = req.file
//       ? {
//           mimetype: req.file.mimetype,
//           size: req.file.size,
//           originalname: req.file.originalname,
//         }
//       : undefined;

//     // Strict validation
//     const dto = updateResumeSchema.parse({
//       file: fileData,
//       checkUpload: req.body.checkUpload,
//     });

//     const resData = await updateResumesService.updateResume(
//       {
//         file: req.file as Express.Multer.File, // actual file passed to service
//         checkUpload: dto.checkUpload,
//       },
//       userData
//     );

//     sendResponse(res, 200, resData.message, resData.data);
//   }
// );
