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

        hasHydrated: false,

        setHasHydrated: (
          state
        ) =>
          set({
            hasHydrated: state,
          }),

        setAuth: (
          user,
          accessToken
        ) =>
          set({
            user,
            accessToken,
            isAuthenticated: true,
            hasTriedRestore: false,
          }),

        logout: () =>
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            hasTriedRestore: true,
          }),

        hasTriedRestore: false,

        setHasTriedRestore:
          (state) =>
            set({
              hasTriedRestore: state,
            }),
      }),

      {
        name: "auth-storage",

        partialize: (state) => ({

          user: state.user,

          isAuthenticated:
            state.isAuthenticated,
        }),

        onRehydrateStorage:
          () => (state) => {

            state?.setHasHydrated(
              true
            )
          },
      }
    )
  )