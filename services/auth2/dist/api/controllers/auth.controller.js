import TryCatch from "../../shared/constants/tryCatch.js";
import sendResponse from "../../shared/constants/successRes.js";
import { authService } from "../../containers/authService.container.js";
import { loginSchema } from "../dtos/authLogin.schema.js";
import { registerSchema } from "../dtos/authResgister.schema.js";
import { forgotSchema } from "../dtos/authForgot.schema copy.js";
import { ResetSchema } from "../dtos/authReset.schema copy.js";
import AppError from "../../shared/errors/AppError.js";
import { clearRefreshCookie, setRefreshCookie } from "../../infra/http/cookies.js";
import { rateLimit } from "../../containers/rateLimiting.container.js";
export const registerUser = TryCatch(async (req, res) => {
    const dto = registerSchema.parse({
        ...req.body,
        file: req.file,
    });
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.ip;
    await rateLimit.checkRegisterLimit(ip, dto.email);
    const result = await authService.register({
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
    const result = await authService.login({
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
    await authService.forgotPassword(dto);
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
    const result = await authService.resetPassword(dto);
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
    const result = await authService.refreshToken({
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
        await authService.logout(refreshToken);
    }
    clearRefreshCookie(res);
    sendResponse(res, 200, "Logged out successfully");
});
