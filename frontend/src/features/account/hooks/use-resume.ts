/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect,useState } from "react"

import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"

import resumeService from "../services/resume.service"

import { useAuthStore } from "@/stores/auth.store"

import { usePolling } from "@/hooks/use-polling"

export const useUpdateResume=()=>{

  const setAuth=
    useAuthStore(
      (state)=>state.setAuth
    )

  const accessToken=
    useAuthStore(
      (state)=>state.accessToken
    )

  const [isProcessing,
    setIsProcessing]=
    useState(false)

  /* CLEANUP */

  useEffect(()=>{

    return()=>{

      // eslint-disable-next-line react-hooks/immutability
      stopPolling()

    }

  },[])

  /* POLLING */

  const {
    startPolling,
    stopPolling,
  }=usePolling({

    interval:3000,

    maxAttempts:20,

    pollingFn:async()=>{

      try{

        const response=
          await resumeService
            .updateResume({
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
          response.status===200&&
          response.data
        ){

          const latestUser=
            useAuthStore.getState()
              .user

          const latestResume=
            response.data.resume

          setAuth(
            {
              ...latestUser!,
              resume:
                latestResume,
              resume_upload_status:
                "success",
            },
            accessToken!
          )

          stopPolling()

          setIsProcessing(false)

          toast.success(
            "Resume updated successfully"
          )

          return
        }

      }catch(error:any){

        const latestUser=
          useAuthStore.getState()
            .user

        stopPolling()

        setIsProcessing(false)

        if(latestUser){

          setAuth(
            {
              ...latestUser,
              resume_upload_status:
                "fail",
            },
            accessToken!
          )
        }

        toast.error(
          error?.response?.data?.message||
          error?.message||
          "Resume processing failed"
        )
      }
    },
  })

  /* UPLOAD */

  const mutation=
    useMutation({

      retry:false,

      mutationFn:async(
        file:File
      )=>{

        return resumeService
          .updateResume({
            file,
            checkUpload:false,
          })
      },

      onMutate:()=>{

        const latestUser=
          useAuthStore.getState()
            .user

        setIsProcessing(true)

        if(latestUser){

          setAuth(
            {
              ...latestUser,
              resume_upload_status:
                "pending",
            },
            accessToken!
          )
        }
      },

      onSuccess:()=>{

        toast.success(
          "Resume upload started"
        )

        startPolling()
      },

      onError:(error:any)=>{

        const latestUser=
          useAuthStore.getState()
            .user

        stopPolling()

        setIsProcessing(false)

        if(latestUser){

          setAuth(
            {
              ...latestUser,
              resume_upload_status:
                "fail",
            },
            accessToken!
          )
        }

        toast.error(
          error?.response?.data?.message||
          error?.message||
          "Resume upload failed"
        )
      },
    })

  return{

    updateResume:
      mutation.mutate,

    isUploading:
      mutation.isPending,

    isProcessing,
  }
}