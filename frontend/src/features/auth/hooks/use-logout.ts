"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import logoutService from "../services/logout.service"

import {
  useAuthStore,
} from "@/stores/auth.store"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useLogout = () => {

  const router = useRouter()

  const logout =
    useAuthStore(
      (state) => state.logout
    )

  return useMutation({

    mutationFn:
      logoutService.logout,

    onSuccess: (response) => {

      logout()

      toast.success(
        response.message
      )

      router.push("/")
    },

    onError: (
      error:
        ApiErrorResponse
    ) => {

      toast.error(
        error.message
      )
    },
  })
}