import TryCatch from "../utlis/TryCatch.js";
import sendResponse from "../utlis/success.js";
import { Auth } from "../services/auth.js";
import { loginSchema } from "../dtos/authLogin.schema.js";
import { registerSchema } from "../dtos/authResgister.schema.js";
import { forgotSchema } from "../dtos/authForgot.schema copy.js";
import { ResetSchema } from "../dtos/authReset.schema copy.js";
export const registerUser = TryCatch(async (req, res) => {
    const dto = registerSchema.parse({
        ...req.body,
        file: req.file
    });
    const registeredUser = await Auth.resgister({ body: dto, file: req.file });
    sendResponse(res, 200, "Resgistered Successfull", registeredUser);
});
export const loginUser = TryCatch(async (req, res) => {
    const dto = loginSchema.parse(req.body);
    const LogedInUser = await Auth.logIn(dto);
    sendResponse(res, 200, "Login Successfull", LogedInUser);
});
export const forgotPassword = TryCatch(async (req, res) => {
    const dto = forgotSchema.parse(req.body);
    const forgotPassword = await Auth.forgotPassword(dto);
    sendResponse(res, 200, "ForgotPassword Successfull", forgotPassword);
});
export const resetPassword = TryCatch(async (req, res) => {
    const dto = ResetSchema.parse({ ...req.body, token: req.params.token });
    const ResetPassword = await Auth.ResetPassword(dto);
    sendResponse(res, 200, "Reset Password Successfull", ResetPassword);
});
