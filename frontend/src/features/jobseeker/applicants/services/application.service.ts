import api from "@/services/axios"

import type {
  ApplicationsResponse,
} from "../types/application.types"

const applicationService = {

  getAllApplications:
    async (): Promise<ApplicationsResponse> => {

      const response =
        await api.get<
          ApplicationsResponse
        >(
          "/user/application/all"
        )

      return response.data
    },
}

export default applicationService