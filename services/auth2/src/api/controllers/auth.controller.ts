import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { Auth } from "../services/auth.js";
import { loginSchema } from "../dtos/authLogin.schema.js";
import { registerSchema } from "../dtos/authResgister.schema.js"
import { forgotSchema } from "../dtos/authForgot.schema copy.js";
import { ResetSchema } from "../dtos/authReset.schema copy.js";
import AppError from "../../shared/errors/AppError.js";
import { UserAgentParser } from "../../shared/utils/reqUserAgent.entity.js";
import { clearRefreshCookie, setRefreshCookie } from "../../infra/http/cookies.js";

export const registerUser = TryCatch(async (req: Request, res: Response) => {
    const dto = registerSchema.parse({
        ...req.body,
        file: req.file
    });
    const userAgentString = req.headers["user-agent"] || "unknown";
    const useragent = new UserAgentParser();
    let ua = useragent.parse(userAgentString);
    const registeredUser = await Auth.resgister({ body: dto, file: req.file, ua, userAgent: userAgentString });
    const { refreshToken, ...responseData } = registeredUser;
    setRefreshCookie(res, refreshToken)

    sendResponse(res, 200, "Registered Successfully", responseData);
})


export const loginUser = TryCatch(async (req: Request, res: Response) => {
    const dto = loginSchema.parse(req.body);
    const userAgentString = req.headers["user-agent"] || "unknown";
    const useragent = new UserAgentParser();
    let ua = useragent.parse(userAgentString);
    const LogedInUser = await Auth.logIn({ dto, ua, userAgent: userAgentString })
    const { refreshToken, ...responseData } = LogedInUser;
    setRefreshCookie(res, refreshToken)
    sendResponse(res, 200, "Login Successfull", responseData)
})

export const forgotPassword = TryCatch(async (req: Request, res: Response) => {
    const dto = forgotSchema.parse(req.body);
    const forgotPassword = await Auth.forgotPassword(dto)
    sendResponse(res, 200, "ForgotPassword Successfull", forgotPassword)
})

export const resetPassword = TryCatch(async (req: Request, res: Response) => {
    const dto = ResetSchema.parse({ ...req.body, token: req.params.token });
    const ResetPassword = await Auth.ResetPassword(dto)
    sendResponse(res, 200, "Reset Password Successfull", ResetPassword)
})

export const refreshToken = TryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError("Refresh token missing", 401);
    }
    const userAgentString = req.headers["user-agent"] || "unknown";
    const useragent = new UserAgentParser();
    let ua = useragent.parse(userAgentString);
    const result = await Auth.refreshToken({ refreshToken, ua, userAgent: userAgentString });
    // Rotate refresh token (important)
    setRefreshCookie(res, refreshToken)

    sendResponse(res, 200, "Refresh Token Re-Invoked", result.accessToken)
})

export const logout = TryCatch(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new AppError("Refresh token missing", 401);
    }

    await Auth.logout(refreshToken);
    clearRefreshCookie(res)

    sendResponse(res, 200, "Logged out successfully",);
});
