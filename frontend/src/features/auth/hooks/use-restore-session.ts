"use client"

import {
  useEffect,
} from "react"

import {
  useQuery,
} from "@tanstack/react-query"

import { toast } from "sonner"

import refreshService from "../services/refresh.service"

import meService from "../services/me.service"

import {
  useAuthStore,
} from "@/stores/auth.store"

export const useRestoreSession = () => {

  const hasHydrated =
    useAuthStore(
      (state) =>
        state.hasHydrated
    )

  const accessToken =
    useAuthStore(
      (state) =>
        state.accessToken
    )

  const setAuth =
    useAuthStore(
      (state) =>
        state.setAuth
    )

  const logout =
    useAuthStore(
      (state) =>
        state.logout
    )

  const query = useQuery({

    queryKey: [
      "restore-session",
    ],

    enabled:
      hasHydrated &&
      !accessToken,

    retry: false,

    staleTime: Infinity,

    queryFn: async () => {

      /* REFRESH TOKEN */

      const refreshResponse =
        await refreshService.refresh()

      const newAccessToken =
        refreshResponse
          .data
          .accessToken

      /* FETCH USER */

      const meResponse =
        await meService.getMe(
          newAccessToken
        )

      return {
        user:
          meResponse.data,

        accessToken:
          newAccessToken,
      }
    },
  })

  /* RESTORE AUTH */

  useEffect(() => {

    if (!query.data) {
      return
    }

    setAuth(
      query.data.user,
      query.data.accessToken
    )

  }, [
    query.data,
    setAuth,
  ])

  /* HANDLE FAILURE */

  useEffect(() => {

    if (!query.error) {
      return
    }

    logout()

    toast.error(
      "Session expired. Please login again."
    )

  }, [
    query.error,
    logout,
  ])

  return {
    isRestoring:
      query.isLoading,
      hasHydrated,
  }
}