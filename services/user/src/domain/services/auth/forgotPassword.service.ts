import { forgotDTO } from "../../../api/dtos/authForgot.schema copy.js";
import { env } from "../../../config/env.js";
import { emailTemp } from "../../../shared/utils/emailTemplate.js";
import { ICacheService } from "../../interfaces/cache.interface.js";
import { IMessageBroker } from "../../interfaces/message-broker.interface.js";
import { ITokenService } from "../../interfaces/token.service.interface.js";
import { IUserRepository } from "../../interfaces/user.repository.interface.js";

export class authForgotPassword{
    constructor(
        private userRepo: IUserRepository,
        private tokenService: ITokenService,
        private cacheService: ICacheService,
        private messageBroker: IMessageBroker,
    ){}

    async forgotPassword(data: forgotDTO) {
        const { email } = data;
    
        const user = await this.userRepo.findByEmail(email);
    
        if (!user) {
          return { message: "If this email exists, we have sent a reset link" };
        }
    
        const resetToken = await this.tokenService.generateAccessToken({
          email,
          type: "reset",
        });
    
        await this.cacheService.set(
          `forgot:${email}`,
          resetToken,
          900
        );
    
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