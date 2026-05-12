"use client"

import { toast } from "sonner"

import {
  useMutation,
} from "@tanstack/react-query"

import forgotPasswordService from "../services/forgot-password.service"

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/forgot-password.types"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useForgotPassword =
  () => {

    return useMutation<
      ForgotPasswordResponse,
      ApiErrorResponse,
      ForgotPasswordPayload
    >({

      mutationFn:
        forgotPasswordService
          .forgotPassword,

      onSuccess: (
        response
      ) => {

        toast.success(
          response.message
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