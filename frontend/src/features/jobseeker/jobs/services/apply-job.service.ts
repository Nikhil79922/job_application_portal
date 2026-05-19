import api from "@/services/axios"

import type {
  ApiSuccessResponse,
} from "@/types/api/response.types"

interface ApplyJobPayload {
  jobId: number
}

interface ApplyJobResponse {
  applied: boolean
}

const applyJobService = {

  apply: async (
    payload: ApplyJobPayload
  ): Promise<
    ApiSuccessResponse<ApplyJobResponse>
  > => {

    const response =
      await api.post<
        ApiSuccessResponse<ApplyJobResponse>
      >(
        "/user/apply/job",
        payload
      )

    return response.data
  },
}

export default applyJobService