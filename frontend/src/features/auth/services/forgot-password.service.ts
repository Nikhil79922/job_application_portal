import api from "@/services/axios"

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/forgot-password.types"

const forgotPasswordService = {

  forgotPassword: async (
    payload:
      ForgotPasswordPayload
  ): Promise<
    ForgotPasswordResponse
  > => {

    const response =
      await api.post<
        ForgotPasswordResponse
      >(
        "/auth/forgotPassword",
        payload
      )

    return response.data
  },
}

export default forgotPasswordService