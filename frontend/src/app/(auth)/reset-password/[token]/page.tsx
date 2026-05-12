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

    <ResetPasswordPage
      token={params.token}
    />
  )
}