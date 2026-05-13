import api from "@/services/axios"

import {
  ApiError,
} from "@/services/axios"

import type {
  LoginPayload,
  LoginResponse,
} from "../types/logic.types"

const authService = {

  login: async (
    payload: LoginPayload
  ): Promise<LoginResponse> => {

    try {

      const response =
        await api.post<LoginResponse>(
          "/auth/login",
          payload
        )

      return response.data

    } catch (error) {

      /* CENTRALIZED API ERROR */

      if (
        error instanceof ApiError
      ) {
        throw error
      }

      /* FALLBACK UNKNOWN ERROR */

      throw new ApiError({
        status: 500,
        message:
          "Login failed. Please try again.",
      })
    }
  },
}

export default authService