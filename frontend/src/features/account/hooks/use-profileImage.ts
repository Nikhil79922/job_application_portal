/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect,useMemo,useState } from "react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import profileImageService from "../services/profileImage.service"

import { useAuthStore } from "@/stores/auth.store"
import { usePolling } from "@/hooks/use-polling"

export const useUpdateProfileImage=()=>{

  const setAuth=useAuthStore(
    (state)=>state.setAuth
  )

  const accessToken=useAuthStore(
    (state)=>state.accessToken
  )

  const [previewUrl,setPreviewUrl]=
    useState<string|null>(null)

  const [confirmedImage,setConfirmedImage]=
    useState<string|null>(
      useAuthStore.getState()
        .user?.profile_pic||null
    )

  const [isProcessing,setIsProcessing]=
    useState(false)

  const imageSrc=useMemo(()=>{

    return(
      previewUrl||
      confirmedImage||
      useAuthStore.getState()
        .user?.profile_pic||
      null
    )

  },[
    previewUrl,
    confirmedImage,
  ])

  useEffect(()=>{

    return()=>{

      if(previewUrl){

        URL.revokeObjectURL(
          previewUrl
        )
      }
    }

  },[
    previewUrl,
  ])

  const {
    startPolling,
    stopPolling,
  }=usePolling({

    interval:3000,

    pollingFn:async()=>{

      try{

        const response=
          await profileImageService
            .updateProfileImage({
              checkUpload:true,
            })

        /* STILL PROCESSING */

        if(
          response.status===202
        ){
          return
        }

        /* SUCCESS */

        if(
          response.status===200 &&
          response.data
        ){

          const latestUser=
            useAuthStore.getState()
              .user

          setConfirmedImage(
            response.data.profile_pic
          )

          setAuth(
            {
              ...latestUser!,
              profile_pic:
                response.data.profile_pic,
              profile_pic_upload_status:
                "success",
            },
            accessToken!
          )

          stopPolling()

          requestAnimationFrame(()=>{

            setPreviewUrl(null)

          })

          setIsProcessing(false)

          toast.success(
            "Profile image updated successfully"
          )
        }

      }catch(error:any){

        const latestUser=
          useAuthStore.getState()
            .user

        stopPolling()

        setPreviewUrl(null)

        setConfirmedImage(
          latestUser?.profile_pic||
          null
        )

        setIsProcessing(false)

        if(latestUser){

          setAuth(
            {
              ...latestUser,
              profile_pic_upload_status:
                "fail",
            },
            accessToken!
          )
        }

        toast.error(
          error?.response?.data?.message||
          error?.message||
          "Image processing failed"
        )
      }
    },
  })

  const mutation=useMutation({

    retry:false,

    mutationFn:async(
      file:File
    )=>{

      return profileImageService
        .updateProfileImage({
          file,
          checkUpload:false,
        })
    },

    onMutate:async(file)=>{

      if(previewUrl){

        URL.revokeObjectURL(
          previewUrl
        )
      }

      const latestUser=
        useAuthStore.getState()
          .user

      const localPreview=
        URL.createObjectURL(file)

      setPreviewUrl(
        localPreview
      )

      setIsProcessing(true)

      if(latestUser){

        setAuth(
          {
            ...latestUser,
            profile_pic_upload_status:
              "pending",
          },
          accessToken!
        )
      }
    },

    onSuccess:()=>{

      toast.success(
        "Image upload started"
      )

      startPolling()
    },

    onError:(error:any)=>{

      const latestUser=
        useAuthStore.getState()
          .user

      stopPolling()

      setPreviewUrl(null)

      setConfirmedImage(
        latestUser?.profile_pic||
        null
      )

      setIsProcessing(false)

      if(latestUser){

        setAuth(
          {
            ...latestUser,
            profile_pic_upload_status:
              "fail",
          },
          accessToken!
        )
      }

      toast.error(
        error?.response?.data?.message||
        error?.message||
        "Upload failed"
      )
    },
  })

  return{
    updateImage:
      mutation.mutate,
    isUploading:
      mutation.isPending,
    isProcessing,
    previewUrl,
    imageSrc,
  }
}