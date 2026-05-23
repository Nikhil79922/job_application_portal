import axios from "@/services/axios"

export interface UpdateApplicantStatusDTO {
  application_id: number
  status: "Submitted" | "Rejected" | "Hired"
}

export const updateApplicantStatus =
  async ({
    application_id,
    status,
  }: UpdateApplicantStatusDTO) => {

    const response =
      await axios.put(
        `/job/applications/update/${application_id}`,
        {
          status,
        }
      )

    return response.data
  }