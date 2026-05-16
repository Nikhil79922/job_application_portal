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

import {
  useRestoreSession,
} from "@/features/auth/hooks/use-restore-session"

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

  /* RESTORE SESSION */

  const {
    isRestoring,
  } = useRestoreSession()

  /* REDIRECT AUTHENTICATED USER */

  useEffect(() => {

    if (
      !hasHydrated ||
      isRestoring
    ) {

      return
    }

    if (isAuthenticated) {

      router.replace("/")
    }

  }, [
    hasHydrated,
    isAuthenticated,
    isRestoring,
    router,
  ])

  /* WAIT FOR HYDRATION + RESTORE */

  if (
    !hasHydrated ||
    isRestoring
  ) {

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