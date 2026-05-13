import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios"

import env from "@/config/env"

import {
  ApiErrorResponse,
} from "@/types/api/response.types"

import {
  useAuthStore,
} from "@/stores/auth.store"

import refreshService from "@/features/auth/services/refresh.service"

/* -------------------------------- */
/* CUSTOM API ERROR */
/* -------------------------------- */

export class ApiError
  extends Error {

  success: boolean

  status: number

  constructor({
    message,
    status = 500,
  }: {
    message: string
    status?: number
  }) {

    super(message)

    this.name =
      "ApiError"

    this.success =
      false

    this.status =
      status
  }
}

/* -------------------------------- */
/* AXIOS INSTANCE */
/* -------------------------------- */

const api = axios.create({
  baseURL: env.API_URL,

  timeout: 15000,

  headers: {
    "Content-Type":
      "application/json",
  },

  withCredentials: true,
})

/* -------------------------------- */
/* REQUEST INTERCEPTOR */
/* -------------------------------- */

api.interceptors.request.use(

  (config) => {

    const token =
      useAuthStore
        .getState()
        .accessToken

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },

  () => {

    return Promise.reject(
      new ApiError({
        status: 500,

        message:
          "Request configuration failed.",
      })
    )
  }
)

/* -------------------------------- */
/* REFRESH STATE */
/* -------------------------------- */

let isRefreshing = false

let failedQueue: {
  resolve: (
    token: string
  ) => void

  reject: (
    error: unknown
  ) => void
}[] = []

const processQueue = (
  error: unknown,
  token: string | null = null
) => {

  failedQueue.forEach(
    (promise) => {

      if (error) {

        promise.reject(error)

      } else {

        promise.resolve(
          token as string
        )
      }
    }
  )

  failedQueue = []
}

/* -------------------------------- */
/* RESPONSE INTERCEPTOR */
/* -------------------------------- */

api.interceptors.response.use(

  (response) => response,

  async (
    error: AxiosError<
      ApiErrorResponse
    >
  ) => {

    const originalRequest =
      error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }

    /* ---------------------------- */
    /* TIMEOUT */
    /* ---------------------------- */

    if (
      error.code ===
      "ECONNABORTED"
    ) {

      return Promise.reject(
        new ApiError({
          status: 408,

          message:
            "Request timeout. Please try again.",
        })
      )
    }

    /* ---------------------------- */
    /* NETWORK ERROR */
    /* ---------------------------- */

    if (!error.response) {

      return Promise.reject(
        new ApiError({
          status: 503,

          message:
            "Unable to connect to server.",
        })
      )
    }

    /* ---------------------------- */
    /* AUTH ROUTES */
    /* ---------------------------- */

    const isAuthRoute =
      originalRequest.url?.includes("/auth/login") ||

      originalRequest.url?.includes("/auth/register") ||

      originalRequest.url?.includes("/auth/forgotPassword") ||

      originalRequest.url?.includes("/auth/verifyOtp") ||

      originalRequest.url?.includes("/auth/resetPassword")

    /* ---------------------------- */
    /* SHOULD REFRESH */
    /* ---------------------------- */

    const shouldRefresh =
      error.response.status === 401 &&

      !originalRequest._retry &&

      !originalRequest.url?.includes(
        "/auth/refreshToken"
      ) &&

      !isAuthRoute

    /* ---------------------------- */
    /* TOKEN REFRESH FLOW */
    /* ---------------------------- */

    if (shouldRefresh) {

      originalRequest._retry = true

      /* ALREADY REFRESHING */

      if (isRefreshing) {

        return new Promise(
          (
            resolve,
            reject
          ) => {

            failedQueue.push({
              resolve,
              reject,
            })
          }
        ).then((token) => {

          originalRequest.headers.Authorization =
            `Bearer ${token}`

          return api(
            originalRequest
          )
        })
      }

      isRefreshing = true

      try {

        /* REFRESH TOKEN */

        const refreshResponse =
          await refreshService.refresh()

        const newAccessToken =
          refreshResponse
            .data
            .accessToken

        /* UPDATE STORE */

        useAuthStore
          .getState()
          .setAuth(
            useAuthStore
              .getState()
              .user!,
            newAccessToken
          )

        /* PROCESS QUEUE */

        processQueue(
          null,
          newAccessToken
        )

        /* RETRY REQUEST */

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`

        return api(
          originalRequest
        )

      } catch {

        const sessionError =
          new ApiError({
            status: 401,

            message:
              "Session expired. Please login again.",
          })

        processQueue(
          sessionError,
          null
        )

        useAuthStore
          .getState()
          .logout()

        return Promise.reject(
          sessionError
        )

      } finally {

        isRefreshing = false
      }
    }

    /* ---------------------------- */
    /* DEFAULT ERROR */
    /* ---------------------------- */

    return Promise.reject(
      new ApiError({
        status:
          error.response.status,

        message:
          error.response.data
            ?.message ||

          "Something went wrong.",
      })
    )
  }
)

export default api