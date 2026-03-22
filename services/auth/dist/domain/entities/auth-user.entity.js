export class AuthEntity {
    // 🔐 Register rules
    static ensureUserDoesNotExist(existingUser) {
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
    }
    static ensureResumeForJobSeeker(role, file) {
        if (role === "jobseeker" && !file) {
            throw new Error("Resume file is required");
        }
    }
    static buildUserData(body, hashedPassword) {
        return {
            ...body,
            password: hashedPassword,
        };
    }
    static attachResume(bodyData, url, publicId) {
        return {
            ...bodyData,
            file: url,
            resumePublicId: publicId,
        };
    }
    // 🔐 Login rules
    static validateCredentials(user, isMatch) {
        if (!user || !isMatch) {
            throw new Error("Invalid credentials");
        }
    }
    static validateSessionLimit(sessionCount) {
        if (sessionCount > 10) {
            throw new Error("Too many active sessions");
        }
    }
    // 🔐 Reset rules 
    static validateResetToken(decoded) {
        if (!decoded || decoded.type !== "reset") {
            throw new Error("Invalid or expired token");
        }
    }
    static validateStoredToken(storedToken, token) {
        if (!storedToken || storedToken !== token) {
            throw new Error("Invalid or expired token");
        }
    }
    static ensureUserExists(user) {
        if (!user) {
            throw new Error("User not found");
        }
    }
    // 🔐 RefreshToken Rules
    static validateRefreshToken(tokenRow) {
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
    static validateDeviceMatch(tokenDevice, currentDevice) {
        if (tokenDevice !== currentDevice) {
            throw new Error("Device mismatch");
        }
    }
}
