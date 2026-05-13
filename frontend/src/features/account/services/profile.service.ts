import meService from "./me.service"

const profileService = {

  getProfile: async (
    accessToken: string
  ) => {

    const response =
      await meService.getMe(
        accessToken
      )

    return response.data
  },
}

export default profileService