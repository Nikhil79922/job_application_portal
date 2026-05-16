"use client"

import {
  ReactNode,
  useEffect,
} from "react"

import {
  useRouter,
  usePathname,
} from "next/navigation"

import {
  useAuthStore,
} from "@/stores/auth.store"

import FuturisticLoader from "../loaders/page-loader"

interface Props {
  children: ReactNode
}

export default function PrivateGuard({
  children,
}: Props) {

  const router =
    useRouter()

  const pathname =
    usePathname()

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

  /* REDIRECT UNAUTHENTICATED USER */

  useEffect(() => {

    if (!hasHydrated) {
      return
    }

    if (!isAuthenticated) {

      router.replace(
        `/login?redirect=${pathname}`
      )
    }

  }, [
    hasHydrated,
    isAuthenticated,
    pathname,
    router,
  ])

  /* WAIT FOR HYDRATION */

  if (!hasHydrated) {

    return (
      <FuturisticLoader />
    )
  }

  /* BLOCK FLASH */

  if (!isAuthenticated) {

    return (
      <FuturisticLoader />
    )
  }

  return children
}