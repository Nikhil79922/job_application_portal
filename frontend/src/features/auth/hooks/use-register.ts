"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  useMutation,
} from "@tanstack/react-query"
import registerService from "../services/register.service"
import meService from "../services/me.service"
import {
  useAuthStore,
} from "@/stores/auth.store"
import type {
  RegisterPayload,
  RegisterResponse,
} from "../types/register.types"
import type {
  ApiErrorResponse,
} from "@/types/api/response.types"
export const useRegister = () => {
  const router =
    useRouter()
  const setAuth =
    useAuthStore(
      (state) =>
        state.setAuth
    )

  return useMutation<
    RegisterResponse,
    ApiErrorResponse,
    RegisterPayload
  >({
    mutationFn:
      registerService.register,
    onSuccess: async (
      response
    ) => {

      try {
        const accessToken =response.data.accessToken

        const meResponse =await meService.getMe(accessToken)

        setAuth(meResponse.data,accessToken)

        toast.success(response.message)

        router.push("/")

      } catch {
        toast.error(
          "Failed to restore session."
        )
      }
    },

    onError: (
      error
    ) => {
      toast.error(
        error.message
      )
    },
  })
}