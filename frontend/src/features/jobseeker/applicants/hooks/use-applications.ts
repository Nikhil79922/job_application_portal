"use client"

import {
  useQuery,
} from "@tanstack/react-query"

import applicationService from "../services/application.service"

export const useApplications = () => {

  return useQuery({

    queryKey: [
      "applications",
    ],

    queryFn: () =>
      applicationService.getAllApplications(),

    retry: 1,

    staleTime:
      1000 * 60 * 5,

    refetchOnWindowFocus:
      false,
  })
}