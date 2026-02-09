import TryCatch from "../utlis/TryCatch.js";
import sendResponse from "../utlis/success.js";
import { Auth } from "../services/auth.js";
export const registerUser = TryCatch(async (req, res) => {
    const registeredUser = await Auth.resgister({ body: req.body, file: req.file });
    sendResponse(res, 200, "Resgistered Successfull", registeredUser);
});
