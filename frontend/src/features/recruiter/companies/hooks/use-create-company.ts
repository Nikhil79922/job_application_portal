/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query"
  
  import {
    toast,
  } from "sonner"
  
  import {
    createCompany,
  } from "../services/company.service"
  
  import type {
    Company,
  } from "../types/company.types"
  
  export function useCreateCompany() {
  
    const queryClient =
      useQueryClient()
  
    return useMutation({
  
      mutationFn:
        createCompany,
  
      onSuccess: (
        response
      ) => {
  
        const newCompany:
          Company =
            response.data
  
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
  
              return [
                newCompany,
              ]
            }
  
            /* SAFETY */
  
            if (
              !Array.isArray(old)
            ) {
  
              return [
                newCompany,
              ]
            }
  
            /* PREPEND */
  
            return [
              newCompany,
              ...old,
            ]
          },
        )
  
        toast.success(
          "Company created successfully",
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
  
          "Failed to create company",
        )
      },
    })
  }