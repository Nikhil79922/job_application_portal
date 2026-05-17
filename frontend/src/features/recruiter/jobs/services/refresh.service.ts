/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "@/services/axios"

import type {
  ApiSuccessResponse,
} from "@/types/api/response.types"

interface RefreshData {
  accessToken: string
}

interface RefreshResponse
  extends ApiSuccessResponse<RefreshData> {}

const refreshService = {

  refresh: async (): Promise<
    RefreshResponse
  > => {

    const response =
      await api.post<
        RefreshResponse
      >(
        "/auth/refreshToken"
      )

    return response.data
  },
}

export default refreshService