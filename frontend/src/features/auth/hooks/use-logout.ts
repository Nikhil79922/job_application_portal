"use client"

import { useRouter }
from "next/navigation"

import { useMutation }
from "@tanstack/react-query"

import logoutService
from "../services/logout.service"

import {
  useAuthStore,
} from "@/stores/auth.store"

import type {
  ApiErrorResponse,
} from "@/types/api/response.types"

import { toast }
from "sonner"

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

      onSuccess: () => {

        /* CLEAR AUTH */

        logout()

        /* RESET RESTORE STATE */

        setHasTriedRestore(
          false
        )

        /* REDIRECT */

        router.replace(
          "/login?logout=true"
        )
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