import { IRefreshTokenRepository } from "../../interfaces/refreshToken.interface.js";
import { ITokenService } from "../../interfaces/token.service.interface.js";

export class authLogout{
    constructor(
        private tokenService: ITokenService,
        private refreshRepo: IRefreshTokenRepository,
    ){}

    async logout(refreshToken: string) {
        const tokenHash = this.tokenService.hashToken(refreshToken);
    
        const tokenRow = await this.refreshRepo.find({
          token_hash: tokenHash,
        });
    
        if (!tokenRow) {
          return; // silent logout
        }
    
        await this.refreshRepo.update(
          { token_hash: tokenHash },
          { revoked: true }
        );
      }
}