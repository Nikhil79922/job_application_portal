    /* eslint-disable @typescript-eslint/no-explicit-any */
    "use client"

    import {
    useMutation,
    } from "@tanstack/react-query"

    import {
    toast,
    } from "sonner"

    import {
    useAuthStore,
    } from "@/stores/auth.store"

    import profileUpdateService from "../services/profileEdit.service"

    interface Payload{
    name:string
    phoneNumber:string
    bio:string
    }

    export const useUpdateProfile=()=>{

    const setAuth=
        useAuthStore(
        (state)=>state.setAuth
        )

    const accessToken=
        useAuthStore(
        (state)=>state.accessToken
        )

    return useMutation({

        retry:false,

        mutationFn:async(
        payload:Payload
        )=>{

        return profileUpdateService
            .updateProfile(
            payload
            )
        },

        onSuccess:(response)=>{

        const latestUser=
            useAuthStore.getState()
            .user

        if(latestUser){

            setAuth(
            {
                ...latestUser,

                name:
                response.data.name,

                phone_number:
                response.data.phone_number,

                bio:
                response.data.bio||
                "",
            },
            accessToken!
            )
        }

        toast.success(
            "Profile updated successfully"
        )
        },

        onError:(error:any)=>{

        toast.error(
            error?.response?.data?.message||
            error?.message||
            "Unable to update profile"
        )
        },
    })
    }