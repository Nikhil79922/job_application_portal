import { NextFunction, Request, Response } from "express";
import TryCatch from "../constants/tryCatch.js";
import AppError from "../errors/AppError.js";
import { JwtTokenService } from "../../infra/security/token.service.js";
import { AuthenticatedRequest, Users } from "../types/user.type.js";
import { PostgresUserRepository } from "../../infra/database/repository/user.repository.js";


export const verifyToken = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new AppError("Token Not Found", 401);
    }
    let token = auth.split(" ")[1];
    if (!token) {
        throw new AppError("Token Not Found", 401);
    }
    const tokenService = new JwtTokenService();
    let decodedData: any = tokenService.verify(token);
    if (!decodedData || !decodedData.userId) {
        throw new AppError("Unauthorized", 401);
    }
    const userRepo = new PostgresUserRepository()
    const userDetails = await userRepo.getUserWithSkills(decodedData.userId)
    if (!userDetails) {
        throw new AppError("User not found ", 401);
    }
    userDetails.skills= userDetails.skills  || [];
    req.user = userDetails as unknown as Users
    next();
})