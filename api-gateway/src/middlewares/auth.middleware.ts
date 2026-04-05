// src/middlewares/auth.middleware.ts

import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const verifyToken = async (req: any, reply: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({
      message: "Unauthorized - No token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;

  } catch (err) {
    return reply.status(403).send({
      message: "Invalid or expired token",
    });
  }
};