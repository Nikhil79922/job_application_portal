import api from "@/services/axios"

import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/reset-password.types"

const resetPasswordService = {

  resetPassword: async ({
    token,
    password,
  }: ResetPasswordPayload): Promise<
    ResetPasswordResponse
  > => {

    const response =
      await api.post<
        ResetPasswordResponse
      >(
        `/auth/resetPassword/${token}`,
        {
          password,
        }
      )

    return response.data
  },
}

export default resetPasswordService