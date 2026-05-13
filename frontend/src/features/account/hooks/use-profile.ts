"use client"

import {
  useQuery,
} from "@tanstack/react-query"

import {
  useAuthStore,
} from "@/stores/auth.store"

import profileService from "../services/profile.service"

export const useProfile =
  () => {

    const accessToken =
      useAuthStore(
        (state) =>
          state.accessToken
      )

    return useQuery({

      queryKey: [
        "my-profile",
      ],

      enabled:
        !!accessToken,

      queryFn: async () => {

        return profileService
          .getProfile(
            accessToken!
          )
      },
    })
  }