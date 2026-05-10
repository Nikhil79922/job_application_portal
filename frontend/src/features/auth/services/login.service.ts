import api from "@/services/axios"

import type {
  LoginPayload,
  LoginResponse,
} from "../types/logic.types"

const authService = {

  login: async (
    payload: LoginPayload
  ): Promise<LoginResponse> => {

    const response =
      await api.post<LoginResponse>(
        "/auth/login",
        payload
      )

    return response.data
  },
}

export default authService