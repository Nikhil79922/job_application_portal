import { Request, Response, NextFunction } from "express";

export const sessions = new Map<string, { expires: number }>();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.split("session=")[1]?.split(";")[0];
  if (!token || !sessions.has(token) || sessions.get(token)!.expires < Date.now()) {
    if (req.path.startsWith("/api/")) return res.status(401).json({ error: "Unauthorized" });
    return res.redirect("/login");
  }
  next();
};
