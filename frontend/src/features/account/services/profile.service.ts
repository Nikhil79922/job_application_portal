import api from "@/services/axios"

import type {
  ProfileResponse,
} from "../types/profile.types"

const profileService = {

  getProfile: async (): Promise<
    ProfileResponse
  > => {

    const response =
      await api.get<
        ProfileResponse
      >(
        "/user/me"
      )

    return response.data
  },
}

export default profileService