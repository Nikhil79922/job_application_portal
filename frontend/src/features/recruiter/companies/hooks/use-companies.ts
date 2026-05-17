import {
    useQuery,
  } from "@tanstack/react-query"
  
  import {
    getAllCompanies,
  } from "../services/company.service"
  
  import type {
    Company,
  } from "../types/company.types"
  
  export function useCompanies() {
  
    return useQuery<Company[]>({
  
      queryKey: [
        "companies",
      ],
  
      queryFn:
        async () => {
  
          const response =
            await getAllCompanies()
  
          return response.data
        },
  
      staleTime:
        1000 * 60 * 5,
    })
  }