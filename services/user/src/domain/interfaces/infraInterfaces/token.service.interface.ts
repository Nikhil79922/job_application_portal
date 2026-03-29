export interface ITokenService {
    generateAccessToken(payload: any): Promise<string>;
    generateRefreshToken(): string;
    hashToken(token: string): string;
    verify(token:string): any;
}