/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { toast } from "sonner"

import skillService from "../services/skill.service"

import {
  useAuthStore,
} from "@/stores/auth.store"

export const useSkill = () => {

  const queryClient =
    useQueryClient()

  const user =
    useAuthStore(
      (state) =>
        state.user
    )

  const setAuth =
    useAuthStore(
      (state) =>
        state.setAuth
    )

  const accessToken =
    useAuthStore(
      (state) =>
        state.accessToken
    )

  /* ADD SKILL */

  const addSkill =
    useMutation({

      mutationFn:
        skillService.addSkill,

      onMutate: async (
        payload
      ) => {

        if (!user) {
          return
        }

        const previousSkills =
          user.skills || []

        const exists =
          previousSkills.some(
            (skill) =>
              skill.toLowerCase() ===
              payload.skillName
                .toLowerCase()
          )

        if (exists) {

          toast.error(
            "Skill already exists"
          )

          return
        }

        /* OPTIMISTIC UPDATE */

        setAuth(
          {
            ...user,

            skills: [
              ...previousSkills,
              payload.skillName,
            ],
          },
          accessToken!
        )

        return {
          previousSkills,
        }
      },

      onSuccess: (
        response
      ) => {

        queryClient.invalidateQueries({
          queryKey: [
            "profile",
          ],
        })

        toast.success(
          response.message
        )
      },

      onError: (
        error: any,
        _payload,
        context
      ) => {

        if (!user) {
          return
        }

        /* ROLLBACK */
        setAuth(
          {
            ...user,

            skills:
              context
                ?.previousSkills ||
              [],
          },
          accessToken!
        )

        toast.error(
          error?.message ||
          "Failed to add skill"
        )
      },
    })

  /* DELETE SKILL */

  const deleteSkill =
    useMutation({

      mutationFn:
        skillService.deleteSkill,

      onMutate: async (
        payload
      ) => {

        if (!user) {
          return
        }

        const previousSkills =
          user.skills || []

        const updatedSkills =
          previousSkills.filter(
            (skill) =>
              skill !==
              payload.skillName
          )

        /* OPTIMISTIC UPDATE */

        setAuth(
          {
            ...user,

            skills:
              updatedSkills,
          },
          accessToken!
        )

        return {
          previousSkills,
        }
      },

      onSuccess: (
        response
      ) => {

        queryClient.invalidateQueries({
          queryKey: [
            "profile",
          ],
        })

        toast.success(
          response.message
        )
      },

      onError: (
        error: any,
        _payload,
        context
      ) => {

        if (!user) {
          return
        }

        setAuth(
          {
            ...user,

            skills:
              context
                ?.previousSkills ||
              [],
          },
          accessToken!
        )

        toast.error(
          error?.message ||
          "Failed to delete skill"
        )
      },
    })

  return {
    addSkill,
    deleteSkill,
  }
}