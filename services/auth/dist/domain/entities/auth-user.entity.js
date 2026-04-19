import AppError from "../../shared/errors/AppError.js";
export class AuthEntity {
    // 🔐 Register rules
    static ensureUserDoesNotExist(existingUser) {
        if (existingUser) {
            throw new AppError("User with this email already exists", 400);
        }
    }
    static ensureResumeForJobSeeker(role, file) {
        if (role === "jobseeker" && !file) {
            throw new AppError("Resume file is required", 400);
        }
    }
    static buildUserData(body, hashedPassword) {
        body.file = null;
        return {
            ...body,
            password: hashedPassword,
        };
    }
    static attachResume(url, publicId, uploadStatus) {
        return {
            resume: url,
            resume_public_id: publicId,
            resume_upload_status: uploadStatus
        };
    }
    // 🔐 Login rules
    static validateCredentials(user, isMatch) {
        if (!user || !isMatch) {
            throw new AppError("Invalid credentials", 400);
        }
    }
    static validateSessionLimit(sessionCount) {
        return sessionCount >= 3;
    }
    // 🔐 Reset rules 
    static validateResetToken(decoded) {
        if (!decoded || decoded.type !== "reset") {
            throw new AppError("Invalid or expired token", 400);
        }
    }
    static validateStoredToken(storedToken, token) {
        if (!storedToken || storedToken !== token) {
            throw new AppError("Invalid or expired token", 400);
        }
    }
    static ensureUserExists(user) {
        if (!user) {
            throw new AppError("User not found", 400);
        }
    }
    // 🔐 RefreshToken Rules
    static validateRefreshToken(tokenRow) {
        if (!tokenRow) {
            throw new AppError("Invalid refresh token", 400);
        }
        if (tokenRow.revoked) {
            throw new AppError("Invalid refresh token", 400);
        }
        if (new Date() > tokenRow.expires_at) {
            throw new AppError("Invalid refresh token", 400);
        }
    }
    static validateDeviceMatch(tokenDevice, currentDevice) {
        if (tokenDevice !== currentDevice) {
            throw new AppError("Device mismatch", 400);
        }
    }
}
