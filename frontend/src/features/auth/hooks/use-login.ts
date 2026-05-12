"use client"

import { useRouter } from "next/navigation"

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import authService from "../services/login.service"

import type {
  LoginPayload,
  LoginResponse,
} from "../types/logic.types"

import { useAuthStore } from "@/stores/auth.store"

import {
  ApiErrorResponse,
} from "@/types/api/response.types"

export const useLogin = () => {

  const router = useRouter()

  const setAuth =
    useAuthStore(
      (state) => state.setAuth
    )

  return useMutation<
    LoginResponse,
    ApiErrorResponse,
    LoginPayload
  >({

    mutationFn: authService.login,

    onSuccess: (response) => {

      setAuth(
        response.data.user,
        response.data.accessToken
      )

      toast.success(
        response.message
      )

      router.push("/")
    },

    onError: (error) => {

      toast.error(
        error.message
      )
    },
  })
}