import axios, {
  AxiosError,
} from "axios"

import env from "@/config/env"

import {
  ApiErrorResponse,
} from "@/types/api/response.types"
import { useAuthStore } from "@/stores/auth.store"

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

/* RESPONSE INTERCEPTOR */

api.interceptors.response.use(

  (response) => response,

  (
    error: AxiosError<
      ApiErrorResponse
    >
  ) => {

    /* TIMEOUT */

    if (
      error.code ===
      "ECONNABORTED"
    ) {

      return Promise.reject({
        success: false,

        message:
          "Request timeout. Please try again.",
      } satisfies ApiErrorResponse)
    }

    /* NETWORK ERROR */

    if (!error.response) {

      return Promise.reject({
        success: false,

        message:
          "Unable to connect to server.",
      } satisfies ApiErrorResponse)
    }

    /* API ERROR */

    return Promise.reject(
      error.response.data
    )
  }
)

export default api