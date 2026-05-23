import { useQuery } from "@tanstack/react-query"
import { getApplicantProfile } from "../services/get-applicant-profile"

export const useApplicantProfile = (applicantId: number) => {
  return useQuery({
    queryKey: ["applicant-profile", applicantId],
    queryFn: () => getApplicantProfile(applicantId),
    enabled: !!applicantId,
  })
}