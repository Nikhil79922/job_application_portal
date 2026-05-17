import { useQuery } from "@tanstack/react-query"
import { getCompanyDetail } from "../services/company.service"
import type { Company } from "../types/company.types"

interface Props {
  companyId: number | null
}

export function useCompanyDetail({ companyId }: Props) {
  const query = useQuery({
    queryKey: ["company-detail", companyId],
    enabled: !!companyId,           // fires as soon as companyId is a non-zero number
    queryFn: () => getCompanyDetail(companyId!),

    // getCompanyDetail returns an axios response whose .data is the API envelope:
    // { success: true, message: "...", data: Company }
    // Mirror exactly what useCompanyLogoPolling does:
    select: (response) => response.data as Company,

    staleTime: 0,                   // always re-fetch when modal opens
  })

  return {
    company: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}