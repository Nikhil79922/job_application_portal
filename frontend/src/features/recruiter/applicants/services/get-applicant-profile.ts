import axios from "@/services/axios"
import { ApplicantProfile, ApplicantProfileResponse } from "../types/ApplicantProfile.types"


export const getApplicantProfile = async (
  applicantId: number
): Promise<ApplicantProfile> => {
  const response = await axios.get<ApplicantProfileResponse>(
    `/user/${applicantId}`
  )
  return response.data.data
}