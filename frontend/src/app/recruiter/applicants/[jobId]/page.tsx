import RoleGuard from "@/components/guards/role-guard"
import ApplicantsIndexView from "@/features/recruiter/applicants/components/applicants-index-view"

interface Props {
  params: Promise<{
    jobId: string
  }>
}

export default async function ApplicantPage({
  params,
}: Props) {

  const {
    jobId,
  } = await params

  return (
    <RoleGuard
      allowedRoles={[
        "recruiter",
      ]}
    >
      <ApplicantsIndexView
        jobId={Number(jobId)}
      />
    </RoleGuard>
  )
}