/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  useRouter,
} from "next/navigation"

import {
  useMutation,
} from "@tanstack/react-query"

import {
  toast,
} from "sonner"

import logoutService from "../services/logout.service"

import {
  useAuthStore,
} from "@/stores/auth.store"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useLogout =
  () => {

    const router =
      useRouter()

    const logout =
      useAuthStore(
        (state) =>
          state.logout
      )

    const setHasTriedRestore =
      useAuthStore(
        (state) =>
          state.setHasTriedRestore
      )

    return useMutation({

      mutationFn:
        logoutService.logout,

      retry: false,

      onSuccess: (
        response: any
      ) => {

        /* SUCCESS TOAST */

        toast.success(
          response?.message ||
          "Logged out successfully"
        )

        /* CLEAR AUTH */

        logout()

        /* RESET RESTORE STATE */

        setHasTriedRestore(
          false
        )

        /* REDIRECT */

        setTimeout(() => {

          router.replace(
            "/login?logout=true"
          )

        }, 300)
      },

      onError: (
        error:
          ApiErrorResponse
      ) => {

        toast.error(
          error?.message ||
          "Failed to logout"
        )
      },
    })
  }