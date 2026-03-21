import { ParamsDictionary } from "express-serve-static-core";
import AppError from "../../../shared/errors/AppError.js";
import { IUserRepository } from "../../interfaces/user.repository.interface.js";

export class getUserProfileData{
    constructor ( private userRepo : IUserRepository){}
    
   async getData(userId:number){
        const userDetails = await this.userRepo.getUserWithSkills(userId)
        if (!userDetails) {
            throw new AppError("User not found ", 401);
        }
        userDetails.skills= userDetails.skills  || [];
        return userDetails;
    }
}