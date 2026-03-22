import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { getUserProfiles } from "../../composition-root/user/getUserProfile.container.js";
import AppError from "../../shared/errors/AppError.js";
import { updateUserProfileSchema } from "../dtos/updateUserProfile.schema.js";
import { updateUserProfiles } from "../../composition-root/user/updateUserProfile.container.js";
import { updateProfilePicSchema } from "../dtos/updateProfilePic.schema.js";
import { updateProfilePics } from "../../composition-root/user/updateProfilePic.container.js";
import { updateResumeSchema } from "../dtos/updateResume.schema.js";
import { updateResumesService } from "../../composition-root/user/updateResume.container.js";
export const myProfile = TryCatch(async (req, res) => {
    sendResponse(res, 200, "Personal details fetched successfully", req.user);
});
export const getUserProfile = TryCatch(async (req, res) => {
    const { userId } = req.params;
    const data = await getUserProfiles.getData(Number(userId));
    sendResponse(res, 200, "User details fetched successfully", data);
});
export const updateUserProfile = TryCatch(async (req, res) => {
    const userData = req.user;
    if (!userData) {
        throw new AppError("Unauthorized", 401);
    }
    const dto = updateUserProfileSchema.parse(req.body);
    const resData = await updateUserProfiles.updateDetails(dto, userData);
    sendResponse(res, 200, "User details updated successfully", resData);
});
export const updateProfilePic = TryCatch(async (req, res) => {
    const userData = req.user;
    if (!userData) {
        throw new AppError("Unauthorized", 401);
    }
    const dto = updateProfilePicSchema.parse({
        file: req.file,
    });
    const resData = await updateProfilePics.updatePic(dto.file, userData);
    sendResponse(res, 200, "User profile pic updated successfully", resData);
});
export const updateResume = TryCatch(async (req, res) => {
    const userData = req.user;
    if (!userData) {
        throw new AppError("Unauthorized", 401);
    }
    const dto = updateResumeSchema.parse({
        file: req.file,
    });
    const resData = await updateResumesService.updateResume(dto.file, userData);
    sendResponse(res, 200, "User resume updated successfully", resData);
});
