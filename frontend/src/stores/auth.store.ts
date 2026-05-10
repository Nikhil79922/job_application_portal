import { AuthState } from "@/types/global/auth/store.type"
import { create } from "zustand"

import { persist } from "zustand/middleware"

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,

        accessToken: null,

        isAuthenticated: false,

        setAuth: (
          user,
          accessToken
        ) =>
          set({
            user,
            accessToken,
            isAuthenticated: true,
          }),

        logout: () =>
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          }),
      }),

      {
        name: "auth-storage",
      }
    )
  )