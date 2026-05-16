import api from "@/services/axios"

import type {
  UpdateProfilePicPayload,
  UpdateProfilePicResponse,
} from "../types/profileImage.type"

const profileImageService={

  updateProfileImage:async(
    payload:UpdateProfilePicPayload
  )=>{

    const formData=
      new FormData()

    formData.append(
      "checkUpload",
      String(payload.checkUpload)
    )

    if(payload.file){

      formData.append(
        "file",
        payload.file,
        payload.file.name
      )
    }

    const response=
      await api.request<
        UpdateProfilePicResponse
      >({
        method:"POST",

        url:"/user/update/pic",

        data:formData,

        transformRequest:[
          (data)=>data,
        ],

        headers:{
          Accept:"application/json",
        },
      })

    return{
      status:response.status,
      data:response.data.data,
      message:response.data.message,
      success:response.data.success,
    }
  },
}

export default profileImageService