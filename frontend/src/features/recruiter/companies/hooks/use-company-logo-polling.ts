/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    useEffect,
  } from "react"
  
  import {
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query"
  
  import {
    getCompanyDetail,
  } from "../services/company.service"
  
  import {
    hasLogoReady,
    hasLogoFailed,
  } from "../utils/company.utils"
  
  import type {
    Company,
  } from "../types/company.types"
  
  interface Props {
  
    companyId?: number
  
    enabled?: boolean
  }
  
  export function useCompanyLogoPolling({
    companyId,
    enabled = true,
  }: Props) {
  
    const queryClient =
      useQueryClient()
  
    const query =
      useQuery({
  
        queryKey: [
          "company-logo",
          companyId,
        ],
  
        enabled:
          !!companyId &&
          enabled,
  
        queryFn:
          async () => {
  
            return getCompanyDetail(
              companyId!
            )
          },
  
        /* IMPORTANT */
  
        select: (
          response
        ) =>
          response.data,
  
        refetchInterval: (
          query
        ) => {
  
          const company =
            query.state
              .data
  
          if (
            !company
          ) {
  
            return 3000
          }
  
          /* FIXED */
  
          if (
            company.data.logo_upload_status ===
            "pending"
          ) {
  
            return 3000
          }
  
          return false
        },
  
        staleTime: 0,
      })
  
    useEffect(() => {
  
      const company =
        query.data
  
      if (
        !company
      ) {
  
        return
      }
  
      /* SUCCESS */
  
      if (
        hasLogoReady(
          company
        )
      ) {
  
        queryClient.setQueryData(
          ["companies"],
          (
            old:
              Company[] |
              undefined,
          ) => {
  
            if (
              !old ||
              !Array.isArray(old)
            ) {
  
              return []
            }
  
            return old.map(
              (
                item
              ) =>
  
                item.company_id ===
                company.company_id
  
                  ? company
  
                  : item
            )
          },
        )
      }
  
      /* FAILED */
  
      if (
        hasLogoFailed(
          company
        )
      ) {
  
        queryClient.setQueryData(
          ["companies"],
          (
            old:
              Company[] |
              undefined,
          ) => {
  
            if (
              !old ||
              !Array.isArray(old)
            ) {
  
              return []
            }
  
            return old.map(
              (
                item
              ) =>
  
                item.company_id ===
                company.company_id
  
                  ? company
  
                  : item
            )
          },
        )
      }
  
    }, [
      query.data,
      queryClient,
    ])
  
    return {
  
      company:
        query.data,
  
      isPolling:
        query.isFetching,
    }
  }