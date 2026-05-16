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
}

export default function PublicGuard({
  children,
}: Props) {

  const router =
    useRouter()

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    )

  const hasHydrated =
    useAuthStore(
      (state) =>
        state.hasHydrated
    )

  /* REDIRECT AUTHENTICATED USER */

  useEffect(() => {

    if (!hasHydrated) {
      return
    }

    if (isAuthenticated) {

      router.replace("/")
    }

  }, [
    hasHydrated,
    isAuthenticated,
    router,
  ])

  /* WAIT FOR HYDRATION */

  if (!hasHydrated) {

    return (
      <FuturisticLoader />
    )
  }

  /* BLOCK FLASH */

  if (isAuthenticated) {

    return (
      <FuturisticLoader />
    )
  }

  return children
}