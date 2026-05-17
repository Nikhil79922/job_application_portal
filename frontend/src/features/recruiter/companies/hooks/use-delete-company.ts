/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import {
  toast,
} from "sonner"

import {
  deleteCompany,
} from "../services/company.service"

import type {
  Company,
} from "../types/company.types"

export function useDeleteCompany() {

  const queryClient =
    useQueryClient()

  return useMutation({

    mutationFn:
      deleteCompany,

    onSuccess: (
      _,
      variables,
    ) => {

      queryClient.setQueryData(
        ["companies"],
        (
          old:
            Company[] |
            undefined,
        ) => {

          /* EMPTY CACHE */

          if (
            !old
          ) {

            return []
          }

          /* SAFETY */

          if (
            !Array.isArray(old)
          ) {

            return []
          }

          /* REMOVE COMPANY */

          return old.filter(
            (
              company
            ) =>

              company.company_id !==
              variables.companyId
          )
        },
      )

      toast.success(
        "Company deleted successfully",
      )
    },

    onError: (
      error: any,
    ) => {

      toast.error(
        error?.response
          ?.data
          ?.message ||

        error?.message ||

        "Failed to delete company",
      )
    },
  })
}