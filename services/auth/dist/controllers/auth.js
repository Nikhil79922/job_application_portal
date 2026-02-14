import TryCatch from "../utlis/TryCatch.js";
import sendResponse from "../utlis/success.js";
import { Auth } from "../services/auth.js";
import { loginSchema } from "../dtos/authLogin.schema.js";
import { registerSchema } from "../dtos/authResgister.schema.js";
export const registerUser = TryCatch(async (req, res) => {
    const dto = registerSchema.parse({
        ...req.body,
        file: req.file
    });
    const registeredUser = await Auth.resgister({ body: dto, file: req.file });
    sendResponse(res, 200, "Resgistered Successfull", registeredUser);
});
export const LoginUser = TryCatch(async (req, res) => {
    const dto = loginSchema.parse(req.body);
    const LogedInUser = await Auth.logIn(dto);
    sendResponse(res, 200, "Login Successfull", LogedInUser);
});
