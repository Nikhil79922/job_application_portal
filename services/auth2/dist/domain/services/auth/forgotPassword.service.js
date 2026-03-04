import { env } from "../../../config/env.js";
import { emailTemp } from "../../../shared/utils/emailTemplate.js";
export class authForgotPassword {
    constructor(userRepo, tokenService, cacheService, messageBroker) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
        this.cacheService = cacheService;
        this.messageBroker = messageBroker;
    }
    async forgotPassword(data) {
        const { email } = data;
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            return { message: "If this email exists, we have sent a reset link" };
        }
        const resetToken = await this.tokenService.generateAccessToken({
            email,
            type: "reset",
        });
        await this.cacheService.set(`forgot:${email}`, resetToken, 900);
        const resetLink = `${env.Frontend_Url}/reset/${resetToken}`;
        await this.messageBroker.publish("send-mail", {
            to: email,
            subject: "RESET YOUR PASSWORD - HireHeaven",
            html: emailTemp(resetLink),
        });
        return {
            message: "If this email exists, we have sent a reset link",
        };
    }
}
