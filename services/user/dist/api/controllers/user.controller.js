import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
export const myProfile = TryCatch(async (req, res) => {
    sendResponse(res, 200, "Registered Successfully", req.user);
});
