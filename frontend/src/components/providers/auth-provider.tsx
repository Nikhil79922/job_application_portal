"use client"

import {
  ReactNode,
} from "react"

import {
  useRestoreSession,
} from "@/features/auth/hooks/use-restore-session"
import FuturisticLoader from "../loaders/page-loader"

interface Props {
  children: ReactNode
}

export default function AuthProvider({
  children,
}: Props) {

  const {
    isRestoring,
    hasHydrated,
  } = useRestoreSession()

  /* WAIT FOR ZUSTAND HYDRATION */

  if (!hasHydrated) {
    return null
  }


  if (isRestoring) {
    return <FuturisticLoader />
  }

  return children
}