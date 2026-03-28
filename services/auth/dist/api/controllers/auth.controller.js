import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { authRefreshService } from "../../composition-root/auth/refreshToken.container.js";
import { authLoginService } from "../../composition-root/auth/login.container.js";
import { authRegisterService } from "../../composition-root/auth/register.container.js";
import { authResetService } from "../../composition-root/auth/reset.container.js";
import { authLogoutService } from "../../composition-root/auth/logout.container.js";
import { authForgotPasswordService } from "../../composition-root/auth/forgotPassword.container.js";
import { loginSchema } from "../dtos/authLogin.schema.js";
import { registerSchema } from "../dtos/authResgister.schema.js";
import { forgotSchema } from "../dtos/authForgot.schema copy.js";
import { ResetSchema } from "../dtos/authReset.schema copy.js";
import AppError from "../../shared/errors/AppError.js";
import { clearRefreshCookie, setRefreshCookie } from "../../infra/http/cookies.js";
import { rateLimit } from "../../composition-root/rateLimiting.container.js";
export const registerUser = TryCatch(async (req, res) => {
    const dto = registerSchema.parse({
        ...req.body,
        file: req.file,
    });
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    await rateLimit.checkRegisterLimit(ip, dto.email);
    const result = await authRegisterService.register({
        body: dto,
        file: req.file,
        deviceInfo: req.deviceInfo,
        userAgent: req.userAgentString,
    });
    const { refreshToken, ...responseData } = result;
    setRefreshCookie(res, refreshToken);
    sendResponse(res, 200, "Registered Successfully", responseData);
});
export const loginUser = TryCatch(async (req, res) => {
    const dto = loginSchema.parse(req.body);
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    await rateLimit.checkLoginLimit(ip, dto.email);
    const result = await authLoginService.login({
        dto,
        deviceInfo: req.deviceInfo,
        userAgent: req.userAgentString,
    });
    const { refreshToken, ...responseData } = result;
    setRefreshCookie(res, refreshToken);
    sendResponse(res, 200, "Login Successful", responseData);
});
export const forgotPassword = TryCatch(async (req, res) => {
    const dto = forgotSchema.parse(req.body);
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    // rate limit protection
    await rateLimit.checkForgotPasswordLimit(ip, dto.email);
    await authForgotPasswordService.forgotPassword(dto);
    // always generic response
    sendResponse(res, 200, "If the account exists, a reset link has been sent");
});
export const resetPassword = TryCatch(async (req, res) => {
    const dto = ResetSchema.parse({
        ...req.body,
        token: req.params.token,
    });
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    // Rate limit protection
    await rateLimit.checkResetPasswordLimit(ip);
    const result = await authResetService.resetPassword(dto);
    sendResponse(res, 200, "Password reset successful", result);
});
export const refreshToken = TryCatch(async (req, res) => {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
        throw new AppError("Refresh token missing", 401);
    }
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    // Rate limit refresh attempts
    await rateLimit.checkRefreshLimit(ip);
    const result = await authRefreshService.refreshToken({
        refreshToken: oldRefreshToken,
        deviceInfo: req.deviceInfo,
        userAgent: req.userAgentString,
    });
    setRefreshCookie(res, result.refreshToken);
    sendResponse(res, 200, "Token refreshed", {
        accessToken: result.accessToken,
    });
});
export const logout = TryCatch(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        await authLogoutService.logout(refreshToken);
    }
    clearRefreshCookie(res);
    sendResponse(res, 200, "Logged out successfully");
});
