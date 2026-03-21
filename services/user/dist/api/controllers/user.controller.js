import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { getUserProfiles } from "../../containers/user/getUserProfile.container.js";
export const myProfile = TryCatch(async (req, res) => {
    sendResponse(res, 200, "Personal details fetched", req.user);
});
export const getUserProfile = TryCatch(async (req, res) => {
    const { userId } = req.params;
    const data = await getUserProfiles.getData(Number(userId));
    sendResponse(res, 200, "User details fetched Successfully ", data);
});
