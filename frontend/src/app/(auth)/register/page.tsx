import PublicGuard from '@/components/guards/public-guard'
import RegisterPage from '@/features/auth/components/registerPage'
import React from 'react'

const registerPage = () => {
  return (
    <div>
      <PublicGuard>
        <RegisterPage />
      </PublicGuard>
    </div>
  )
}

export default registerPage
