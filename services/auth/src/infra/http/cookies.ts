import { Response } from "express";
import { env } from "../../config/env.js";

export function setRefreshCookie(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" ,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearRefreshCookie(res: Response) {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax"
    });
  }