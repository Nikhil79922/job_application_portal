import { RegisterDTO } from "../../api/dtos/authResgister.schema.js";
import AppError from "../../shared/errors/AppError.js";

export class AuthEntity {
    // 🔐 Register rules
    static ensureUserDoesNotExist(existingUser: boolean) {
      if (existingUser) {
        throw new AppError("User with this email already exists",400);
      }
    }
  
    static ensureResumeForJobSeeker(role: string, file?: Express.Multer.File) {
      if (role === "jobseeker" && !file) {
        throw new AppError("Resume file is required",400);
      }
    }

    static buildUserData(body: RegisterDTO, hashedPassword: string) {
      body.file=null;
        return {
          ...body,
          password: hashedPassword,
        };
      }
    
      static attachResume( url: string, publicId: string, uploadStatus:string) {
        return {
          resume: url,
          resume_public_id: publicId,
          resume_upload_status:uploadStatus
        };
      }
  
    // 🔐 Login rules
    static validateCredentials(user: any, isMatch: boolean) {
      if (!user || !isMatch) {
        throw new AppError("Invalid credentials",400);
      }
    }
  
    static validateSessionLimit(sessionCount: number) : boolean {
       return sessionCount >= 3
       
    }
  
    // 🔐 Reset rules 
    static validateResetToken(decoded: any) {
      if (!decoded || decoded.type !== "reset") {
        throw new AppError("Invalid or expired token",400);
      }
    }
  
    static validateStoredToken(storedToken: string | null, token: string) {
      if (!storedToken || storedToken !== token) {
        throw new AppError("Invalid or expired token",400);
      }
    }
  
    static ensureUserExists(user: any) {
      if (!user) {
        throw new AppError("User not found",400);
      }
    }

    // 🔐 RefreshToken Rules
    static validateRefreshToken(tokenRow: any) {
        if (!tokenRow) {
          throw new AppError("Invalid refresh token",400);
        }
      
        if (tokenRow.revoked) {
          throw new AppError("Invalid refresh token",400);
        }
      
        if (new Date() > tokenRow.expires_at) {
          throw new AppError("Invalid refresh token",400);
        }
      }
      
      static validateDeviceMatch(
        tokenDevice: string,
        currentDevice: string
      ) {
        if (tokenDevice !== currentDevice) {
          throw new AppError("Device mismatch",400);
        }
      }
      
  }