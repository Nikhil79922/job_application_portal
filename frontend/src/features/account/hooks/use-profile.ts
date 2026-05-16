"use client"

import {
  useQuery,
} from "@tanstack/react-query"

import profileService from "../services/profile.service"

export const useProfile = () => {

  return useQuery({

    queryKey: [
      "profile",
    ],

    queryFn:
      async () => {

        const response =
          await profileService
            .getProfile()

        return response.data
      },

    staleTime: 0,

    gcTime: 0,

    retry: false,

    refetchOnMount: true,

    refetchOnWindowFocus: false,
  })
}