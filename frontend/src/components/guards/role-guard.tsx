"use client"

import {
  ReactNode,
  useEffect,
} from "react"

import {
  useRouter,
} from "next/navigation"

import {
  useAuthStore,
} from "@/stores/auth.store"

import FuturisticLoader from "../loaders/page-loader"

interface Props {
  children: ReactNode

  allowedRoles: (
    | "jobseeker"
    | "recruiter"
  )[]
}

export default function RoleGuard({
  children,
  allowedRoles,
}: Props) {

  const router =
    useRouter()

  const user =
    useAuthStore(
      (state) =>
        state.user
    )

  const hasHydrated =
    useAuthStore(
      (state) =>
        state.hasHydrated
    )

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    )

  useEffect(() => {

    if (
      hasHydrated &&
      !isAuthenticated
    ) {

      router.replace(
        "/login"
      )

      return
    }

    if (
      hasHydrated &&
      user &&
      !allowedRoles.includes(
        user.role
      )
    ) {

      router.replace("/")
    }

  }, [
    hasHydrated,
    isAuthenticated,
    user,
    allowedRoles,
    router,
  ])

  /* WAIT FOR HYDRATION */

  if (!hasHydrated) {
    return <FuturisticLoader />
  }

  /* WAIT FOR AUTH */

  if (!isAuthenticated) {
    return <FuturisticLoader />
  }

  /* BLOCK UNAUTHORIZED FLASH */

  if (
    user &&
    !allowedRoles.includes(
      user.role
    )
  ) {

    return <FuturisticLoader />
  }

  return children
}