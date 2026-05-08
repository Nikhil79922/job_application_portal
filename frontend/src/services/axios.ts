import axios from "axios"

import env from "@/config/env"
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
      localStorage.getItem("token")

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

/* -------------------------------- */
/* RESPONSE INTERCEPTOR */
/* -------------------------------- */

api.interceptors.response.use(

  (response) => response,

  (error) => {

    // TIMEOUT
    if (
      error.code === "ECONNABORTED"
    ) {

      console.error(
        "Request Timeout"
      )
    }

    // NETWORK ERROR
    if (!error.response) {

      return Promise.reject({
        success: false,
        message:
          "Unable to connect to server",
      })
    }

    return Promise.reject(
      error.response.data
    )
  }
)

export default api