import PrivateGuard from '@/components/guards/private-guard'
import ProfilePage from '@/features/account/components/profile-page'
import React from 'react'

const profilePage = () => {
  return (
    <div>
      <PrivateGuard>
      <ProfilePage  />
      </PrivateGuard>
          </div>
  )
}

export default profilePage
