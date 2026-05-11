"use client"

import {
  ReactNode,
} from "react"

import {
  useRestoreSession,
} from "@/features/auth/hooks/use-restore-session"

interface Props {
  children: ReactNode
}

export default function AuthProvider({
  children,
}: Props) {

  const isRestoring =useRestoreSession()

  if (isRestoring) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-background">

        <div className="relative flex items-center justify-center">

          {/* OUTER GLOW */}
          <div className="absolute h-20 w-20 rounded-full bg-emerald-500/20 blur-2xl" />

          {/* SPINNER */}
          <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-emerald-500/20 border-t-emerald-500" />

        </div>

      </div>
    )
  }

  return children
}