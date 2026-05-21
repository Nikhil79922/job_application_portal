import api from "@/services/axios"

import type {
    UpdateJobDTO,
  } from "../schemas/update-job.schemas"
  
  import type {
    Job,
  } from "../types/job.types"
  
  import type {
    ApiSuccessResponse,
  } from "@/types/api/response.types"

  const jobService = {

    update: async (
        payload: UpdateJobDTO
      ): Promise<ApiSuccessResponse<Job>> => {
      
        const response =
          await api.put<
            ApiSuccessResponse<Job>
          >(
            "/job/update",
            payload
          )
      
        return response.data
      },
  }
  
  export default jobService