import { sql } from "../../library/neonDB/db.js";

export class RefreshTokenTable {
    static async insertToken(data: any) {
     return await sql`
        INSERT INTO refresh_tokens(
          user_id,
          token_hash,
          device,
          device_type,
          user_agent,
          expires_at
        )
        VALUES (
          ${data.user_id},
          ${data.token_hash},
          ${data.device},
          ${data.device_type},
          ${data.user_agent},
          ${data.expires_at}
        )
        RETURNING user_id , token_hash , device , device_type , user_agent, revoked , expires_at, created_at
      `;
    }
  }