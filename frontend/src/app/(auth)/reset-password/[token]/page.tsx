import PublicGuard from "@/components/guards/public-guard"
import ResetPasswordPage from "@/features/auth/components/resetPasswordPage"

interface Props {
  params: {
    token: string
  }
}

export default function Page({
  params,
}: Props) {

  return (
    <PublicGuard>
    <ResetPasswordPage
      token={params.token}
    />
    </PublicGuard>
  )
}