// src/middlewares/auth.middleware.ts

import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const verifyToken = async (req: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err: any = new Error("Unauthorized - No token");
    err.statusCode = 401;
    throw err;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.headers.authDetails = decoded;
  } catch {
    const err: any = new Error("Invalid or expired token");
    err.statusCode = 403;
    throw err;
  }
};