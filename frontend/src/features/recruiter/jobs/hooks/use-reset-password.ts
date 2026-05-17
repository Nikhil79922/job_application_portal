"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import {
  useMutation,
} from "@tanstack/react-query"

import resetPasswordService from "../services/reset-password.service"

import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../types/reset-password.types"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useResetPassword =
  () => {

    const router =
      useRouter()

    return useMutation<
      ResetPasswordResponse,
      ApiErrorResponse,
      ResetPasswordPayload
    >({

      mutationFn:
        resetPasswordService
          .resetPassword,

      onSuccess: (
        response
      ) => {

        toast.success(
          response.message
        )

        router.push(
          "/login"
        )
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