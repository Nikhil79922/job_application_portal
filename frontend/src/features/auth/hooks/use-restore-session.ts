"use client"

import {
  useEffect,
  useState,
} from "react"

import { toast } from "sonner"

import refreshService from "../services/refresh.service"

import meService from "../services/me.service"

import {
  useAuthStore,
} from "@/stores/auth.store"

export const useRestoreSession = () => {

  const [isRestoring, setIsRestoring] =useState(true)

  const accessToken =
    useAuthStore(
      (state) => state.accessToken
    )

  const setAuth =
    useAuthStore(
      (state) => state.setAuth
    )

  const logout =
    useAuthStore(
      (state) => state.logout
    )

  useEffect(() => {

    const restoreSession =
      async () => {
        try {
          if (accessToken) {
            setIsRestoring(false)
            return
          }

          const refreshResponse =
            await refreshService.refresh()

          const newAccessToken =
            refreshResponse
              .data
              .accessToken

          const meResponse =
            await meService.getMe()

          setAuth(
            meResponse.data,
            newAccessToken
          )

        } catch {

          logout()

          toast.error(
            "Session expired. Please login again."
          )

        } finally {

          setIsRestoring(false)
        }
      }

    restoreSession()

  }, [
    accessToken,
    setAuth,
    logout,
  ])

  return isRestoring
}