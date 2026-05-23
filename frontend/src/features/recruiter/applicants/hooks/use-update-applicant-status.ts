import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query"
  
  import {
    updateApplicantStatus,
    type UpdateApplicantStatusDTO,
  } from "../services/update-applicant-status"
import { toast } from "sonner"
  
// ─── toast helpers ─────────────────────────────────────────────────────────────

const STATUS_TOAST: Record<
  ApplicationStatus,
  { label: string; style: Parameters<typeof toast>[1] }
> = {
  Submitted: {
    label: "Submitted",
    style: {},
  },
  Hired: {
    label: "Hired 🎉",
    style: {
      style: {
        background: "#ecfdf5",
        border: "1px solid #a7f3d0",
        color: "#065f46",
      },
    },
  },
  Rejected: {
    label: "Rejected",
    style: {
      style: {
        background: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#991b1b",
      },
    },
  },
}

type ApplicationStatus = "Submitted" | "Hired" | "Rejected"
  export const useUpdateApplicantStatus =
    () => {
  
      return useMutation({
        mutationFn: (
          payload: UpdateApplicantStatusDTO
        ) =>
          updateApplicantStatus(payload),
  
            onSuccess: (_data, variables) => {
              const { label, style } = STATUS_TOAST[variables.status as ApplicationStatus] ?? {
                label: variables.status,
                style: {},
              }
              toast.success(`Applicant marked as ${label}`, style)
            },
            onError: () => {
              toast.error("Failed to update status. Please try again.")
            },
      })
    }