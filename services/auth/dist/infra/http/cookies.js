import { env } from "../../config/env.js";
export function setRefreshCookie(res, token) {
    res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });
}
export function clearRefreshCookie(res) {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax"
    });
}
