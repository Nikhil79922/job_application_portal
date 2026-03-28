export interface CreateRefreshTokenDTO {
    user_id: number;
    token_hash: string;
    device: string;
    device_type: string;
    user_agent: string;
    expires_at: Date;
  }

export interface IRefreshTokenRepository {
    create(data:CreateRefreshTokenDTO , tx?:any): Promise<any>,
    find(conditions: Record<string, any>, selectFields?: string[]):Promise<any | null>;
    update(conditions: Record<string, any>, data: Record<string, any>):Promise<any>;
    // count(conditions: Record<string, any>):Promise<any>;
    revokeAll(userId: string): Promise<any>;
}