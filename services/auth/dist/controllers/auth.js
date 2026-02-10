import TryCatch from "../utlis/TryCatch.js";
import sendResponse from "../utlis/success.js";
import { Auth } from "../services/auth.js";
import { registerSchema } from "../dtos/auth.schema.js";
export const registerUser = TryCatch(async (req, res) => {
    const dto = registerSchema.parse(req.body);
    const registeredUser = await Auth.resgister({ body: dto, file: req.file });
    sendResponse(res, 200, "Resgistered Successfull", registeredUser);
});
