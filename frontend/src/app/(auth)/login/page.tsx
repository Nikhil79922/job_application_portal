"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { toast } from "sonner"

import PublicGuard from "@/components/guards/public-guard"
import LoginPage from "@/features/auth/components/loginPage"

const Login = () => {

  const searchParams = useSearchParams()

  useEffect(() => {

    const logout = searchParams.get("logout")

    if (logout === "true") {
      toast.success("Logged out successfully")
    }

  }, [searchParams])

  return (
    <PublicGuard>
      <LoginPage />
    </PublicGuard>
  )
}

export default Login