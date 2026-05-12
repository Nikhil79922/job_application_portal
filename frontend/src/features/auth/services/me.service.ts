/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "@/services/axios"

import type {
  ApiSuccessResponse,
} from "@/types/api/response.types"

import { MeUser } from "../types/me.types"

interface MeResponse
  extends ApiSuccessResponse<MeUser> {
  }

  const meService = {

    getMe: async (
      accessToken: string
    ): Promise<MeResponse> => {
  
      const response =
        await api.get<MeResponse>(
          "/user/me",
          {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          }
        )
  
      return response.data
    },
  }

export default meService