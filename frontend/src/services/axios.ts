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

const api = axios.create({
  baseURL: env.API_URL,

  timeout: 15000,

  headers: {
    "Content-Type":
      "application/json",
  },

  withCredentials: true,
})

/* REQUEST INTERCEPTOR */

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

  (error) =>
    Promise.reject(error)
)

/* REFRESH STATE */

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

/* RESPONSE INTERCEPTOR */

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

    /* TIMEOUT */

    if (
      error.code ===
      "ECONNABORTED"
    ) {

      return Promise.reject({
        success: false,

        message:
          "Request timeout. Please try again.",
      })
    }

    /* NETWORK ERROR */

    if (!error.response) {

      return Promise.reject({
        success: false,

        message:
          "Unable to connect to server.",
      })
    }

    /* TOKEN EXPIRED */

    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {

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

        processQueue(
          null,
          newAccessToken
        )

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`

        return api(
          originalRequest
        )

      } catch (refreshError) {

        processQueue(
          refreshError,
          null
        )

        useAuthStore
          .getState()
          .logout()

        return Promise.reject(
          refreshError
        )

      } finally {

        isRefreshing = false
      }
    }

    return Promise.reject(
      error.response.data
    )
  }
)

export default api