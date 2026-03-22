import { RegisterDTO } from "../../api/dtos/authResgister.schema.js";

export class AuthEntity {
    // 🔐 Register rules
    static ensureUserDoesNotExist(existingUser: boolean) {
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
    }
  
    static ensureResumeForJobSeeker(role: string, file?: Express.Multer.File) {
      if (role === "jobseeker" && !file) {
        throw new Error("Resume file is required");
      }
    }

    static buildUserData(body: RegisterDTO, hashedPassword: string) {
        return {
          ...body,
          password: hashedPassword,
        };
      }
    
      static attachResume(bodyData: any, url: string, publicId: string) {
        return {
          ...bodyData,
          file: url,
          resumePublicId: publicId,
        };
      }
  
    // 🔐 Login rules
    static validateCredentials(user: any, isMatch: boolean) {
      if (!user || !isMatch) {
        throw new Error("Invalid credentials");
      }
    }
  
    static validateSessionLimit(sessionCount: number) {
      if (sessionCount > 10) {
        throw new Error("Too many active sessions");
      }
    }
  
    // 🔐 Reset rules 
    static validateResetToken(decoded: any) {
      if (!decoded || decoded.type !== "reset") {
        throw new Error("Invalid or expired token");
      }
    }
  
    static validateStoredToken(storedToken: string | null, token: string) {
      if (!storedToken || storedToken !== token) {
        throw new Error("Invalid or expired token");
      }
    }
  
    static ensureUserExists(user: any) {
      if (!user) {
        throw new Error("User not found");
      }
    }

    // 🔐 RefreshToken Rules
    static validateRefreshToken(tokenRow: any) {
        if (!tokenRow) {
          throw new Error("Invalid refresh token");
        }
      
        if (tokenRow.revoked) {
          throw new Error("Invalid refresh token");
        }
      
        if (new Date() > tokenRow.expires_at) {
          throw new Error("Invalid refresh token");
        }
      }
      
      static validateDeviceMatch(
        tokenDevice: string,
        currentDevice: string
      ) {
        if (tokenDevice !== currentDevice) {
          throw new Error("Device mismatch");
        }
      }
      
  }