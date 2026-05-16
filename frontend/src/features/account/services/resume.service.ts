import api from "@/services/axios"

import type{
  UpdateResumePayload,
  UpdateResumeResponse,
  UpdateResumeServiceResponse,
} from "../types/resume.type"

const resumeService={

  updateResume:async(
    payload:UpdateResumePayload
  ):Promise<UpdateResumeServiceResponse>=>{

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
        UpdateResumeResponse
      >({
        method:"POST",

        url:"/user/update/resume",

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
      success:response.data.success,
      message:response.data.message,
      data:response.data.data,
    }
  },
}

export default resumeService