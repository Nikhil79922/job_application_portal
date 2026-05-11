import { create } from "zustand"

import { persist } from "zustand/middleware"

import {
  AuthState,
} from "@/types/global/auth/store.type"

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

        partialize: (state) => ({

          user: state.user,

          isAuthenticated:
            state.isAuthenticated,
        }),
      }
    )
  )