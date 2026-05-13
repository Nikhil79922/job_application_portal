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

  useEffect(() => {

    if (
      hasHydrated &&
      isAuthenticated
    ) {

      router.replace("/")
    }

  }, [
    hasHydrated,
    isAuthenticated,
    router,
  ])

  /* WAIT FOR HYDRATION */

  if (!hasHydrated) {
    return null
  }

  /* BLOCK FLASH */

  if (isAuthenticated) {
    return null
  }

  return children
}