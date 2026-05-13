import PublicGuard from '@/components/guards/public-guard'
import ForgotPasswordPage from '@/features/auth/components/forgotPasswordPage'
import React from 'react'

const forgetPassword = () => {
  return (
    <div>
      <PublicGuard>
        <ForgotPasswordPage />
      </PublicGuard>
    </div>
  )
}

export default forgetPassword
