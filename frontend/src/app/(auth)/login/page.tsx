"use client"

import {
  useEffect,
  useRef,
} from "react"

import {
  useRouter,
  useSearchParams,
} from "next/navigation"

import {
  toast,
} from "sonner"

import PublicGuard from "@/components/guards/public-guard"

import LoginPage from "@/features/auth/components/loginPage"

const Login = () => {

  const router =
    useRouter()

  const searchParams =
    useSearchParams()

  const hasShownToast =
    useRef(false)

  useEffect(() => {

    const logout =
      searchParams.get("logout")

    if (
      logout === "true" &&
      !hasShownToast.current
    ) {

      hasShownToast.current = true

      toast.success(
        "Logged out successfully"
      )

      /* REMOVE QUERY PARAM */

      router.replace(
        "/login"
      )
    }

  }, [
    searchParams,
    router,
  ])

  return (
    <PublicGuard>
      <LoginPage />
    </PublicGuard>
  )
}

export default Login