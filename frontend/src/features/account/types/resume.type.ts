export interface UpdateResumePayload{
    file?:File
    checkUpload:boolean
  }
  
  export interface UpdateResumeResponse{
    success:boolean
    message:string
    data?:{
      user_id:number
      name:string
      resume:string
    }
  }
  
  export interface UpdateResumeServiceResponse{
    status:number
    success:boolean
    message:string
    data?:{
      user_id:number
      name:string
      resume:string
    }
  }