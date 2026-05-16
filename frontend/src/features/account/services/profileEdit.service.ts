/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/services/axios"

export interface UpdateProfilePayload{
  name?:string
  phoneNumber?:string
  bio?:string
}

export interface UpdateProfileResponse{
  success:boolean
  message:string
  data:{
    user_id:number
    name:string
    email:string
    phone_number:string
    bio?:string|null
  }
}

const profileUpdateService={

  updateProfile:async(
    payload:UpdateProfilePayload
  ):Promise<UpdateProfileResponse>=>{

    const response=
      await api.put<
        UpdateProfileResponse
      >(
        "/user/update/profile",
        payload
      )

    return response.data
  },
}

export default profileUpdateService