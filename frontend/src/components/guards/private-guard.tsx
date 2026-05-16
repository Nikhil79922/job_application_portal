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

import {
  useRestoreSession,
} from "@/features/auth/hooks/use-restore-session"

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

  /* RESTORE SESSION */

  const {
    isRestoring,
  } = useRestoreSession()

  /* REDIRECT */

  useEffect(() => {

    if (
      !hasHydrated ||
      isRestoring
    ) {

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
    isRestoring,
    pathname,
    router,
  ])

  /* LOADING */

  if (
    !hasHydrated ||
    isRestoring
  ) {

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