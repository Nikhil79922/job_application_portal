/* eslint-disable @typescript-eslint/no-empty-object-type */
import api from "@/services/axios"

import type {
  ApiSuccessResponse,
} from "@/types/api/response.types"

interface LogoutResponse
  extends ApiSuccessResponse<null> {}

const logoutService = {

  logout: async (): Promise<
    LogoutResponse
  > => {

    const response =
      await api.post<
        LogoutResponse
      >(
        "/auth/logout"
      )

    return response.data
  },
}

export default logoutService