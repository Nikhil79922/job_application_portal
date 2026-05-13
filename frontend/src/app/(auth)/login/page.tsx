import PublicGuard from '@/components/guards/public-guard'
import LoginPage from '@/features/auth/components/loginPage'
import React from 'react'

const loginPage = () => {
  return (
    <div>
      <PublicGuard>
        <LoginPage />
      </PublicGuard>
    </div>
  )
}

export default loginPage
