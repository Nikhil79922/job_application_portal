"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import {
  X,
  User2,
  Phone,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react"

import { useUpdateProfile } from "../hooks/use-profileEdit"
import type { MeUser } from "../types/me.types"
import { Button } from "@/components/ui/button"

interface Props {
  user: MeUser
  onClose: () => void
}

interface FormState {
  name: string
  phoneNumber: string
  bio: string
}

interface FieldErrors {
  name?: string
  phoneNumber?: string
  bio?: string
}

// ── Validators ────────────────────────────────────────────────────────────────

function validate(form: FormState, role: string): FieldErrors {
  const errors: FieldErrors = {}
  if (!form.name.trim()) {
    errors.name = "Name is required"
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }
  if (form.phoneNumber && !/^\+?[\d\s\-()]{7,15}$/.test(form.phoneNumber)) {
    errors.phoneNumber = "Enter a valid phone number"
  }
  if (role === "jobseeker" && form.bio && form.bio.length > 500) {
    errors.bio = "Bio must be under 500 characters"
  }
  return errors
}

// ── Animated field wrapper ────────────────────────────────────────────────────

function Field({
  label,
  icon,
  error,
  hint,
  children,
}: {
  label: string
  icon: React.ReactNode
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="group flex flex-col gap-1.5">
      <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500 animate-[fadeSlideUp_0.2s_ease_both]">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-slate-400 dark:text-zinc-600">{hint}</p>
      )}
    </div>
  )
}

// ── Base input classes ────────────────────────────────────────────────────────

const inputBase =
  "w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-300 focus:ring-2 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-700"

const inputNormal =
  "border-slate-200 focus:border-emerald-400 focus:ring-emerald-500/20 dark:border-white/10 dark:focus:border-emerald-500/60 dark:focus:ring-emerald-500/10"

const inputError =
  "border-red-300 focus:border-red-400 focus:ring-red-500/20 dark:border-red-500/30 dark:focus:border-red-500 dark:focus:ring-red-500/10"

// ── Main modal ────────────────────────────────────────────────────────────────

export function EditProfileModal({ user, onClose }: Props) {
  const { mutate: updateProfile, isPending } = useUpdateProfile()

  const initial: FormState = {
    name: user.name ?? "",
    phoneNumber: user.phone_number ?? "",
    bio: user.bio ?? "",
  }

  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [saveSuccess, setSaveSuccess] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus first input on mount
  useEffect(() => {
    const t = setTimeout(() => firstInputRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  // Dirty check — has anything changed?
  const isDirty =
    form.name !== initial.name ||
    form.phoneNumber !== initial.phoneNumber ||
    form.bio !== initial.bio

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setTouched((t) => ({ ...t, [key]: true }))
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = () => {
    const errs = validate(form, user.role)
    if (Object.keys(errs).length) {
      setErrors(errs)
      setTouched({ name: true, phoneNumber: true, bio: true })
      return
    }

    updateProfile(
      {
        name: form.name.trim(),
        phoneNumber: form.phoneNumber.trim(),
        bio: form.bio.trim(),
      },
      {
        onSuccess: () => {
          setSaveSuccess(true)
          setTimeout(() => {
            setSaveSuccess(false)
            onClose()
          }, 1200)
        },
      }
    )
  }

  const showError = (key: keyof FormState) =>
    touched[key] ? errors[key] : undefined

  const bioLen = form.bio.length
  const bioMax = 500

  return createPortal(
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .modal-backdrop { animation: backdropIn 0.2s ease both; }
        .modal-panel    { animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop fixed inset-0 z-[998] bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="modal-panel pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_32px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 opacity-80" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">
                  Edit Profile
                </h2>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                  Changes save to your Talent Forge account
                </p>
              </div>
            </div>
            <Button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-500 dark:hover:bg-white/[0.07] dark:hover:text-zinc-300"
            >
              <X className="!h-3.5 !w-3.5 shrink-0" />
            </Button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-5 px-6 py-6">

            {/* Name */}
            <Field
              label="Full Name"
              icon={<User2 className="h-3 w-3" />}
              error={showError("name")}
            >
              <input
                ref={firstInputRef}
                type="text"
                value={form.name}
                onChange={set("name")}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="e.g. Nikhil Singh"
                className={`${inputBase} ${showError("name") ? inputError : inputNormal}`}
              />
            </Field>

            {/* Phone */}
            <Field
              label="Phone Number"
              icon={<Phone className="h-3 w-3" />}
              error={showError("phoneNumber")}
              hint="Optional · used for recruiter contact"
            >
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={set("phoneNumber")}
                onBlur={() => setTouched((t) => ({ ...t, phoneNumber: true }))}
                placeholder="e.g. +91 99999 99999"
                className={`${inputBase} ${showError("phoneNumber") ? inputError : inputNormal}`}
              />
            </Field>

            {/* Bio — jobseekers only */}
            {user.role === "jobseeker" && (
              <Field
                label="Bio"
                icon={<FileText className="h-3 w-3" />}
                error={showError("bio")}
                hint="A short professional summary visible to recruiters"
              >
                <div className="relative">
                  <textarea
                    value={form.bio}
                    onChange={set("bio")}
                    onBlur={() => setTouched((t) => ({ ...t, bio: true }))}
                    placeholder="I'm a MERN stack developer with 3 years of experience…"
                    rows={4}
                    className={`${inputBase} resize-none leading-6 ${showError("bio") ? inputError : inputNormal}`}
                  />
                  {/* Char counter */}
                  <span
                    className={`absolute bottom-3 right-3 text-[10px] font-semibold tabular-nums transition-colors ${bioLen > bioMax
                        ? "text-red-400"
                        : bioLen > bioMax * 0.85
                          ? "text-yellow-400"
                          : "text-slate-300 dark:text-zinc-700"
                      }`}
                  >
                    {bioLen}/{bioMax}
                  </span>
                </div>
              </Field>
            )}

            {/* Dirty hint */}
            {!isDirty && !isPending && !saveSuccess && (
              <p className="text-center text-[11px] text-slate-300 dark:text-zinc-700">
                Make a change above to enable saving
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 dark:border-white/[0.06]">
            <Button
              onClick={onClose}
              disabled={isPending}
              className="flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!isDirty || isPending || saveSuccess}
              className={`
                relative flex h-11 min-w-[140px] items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-bold text-white transition-all duration-200
                ${saveSuccess
                  ? "bg-emerald-500"
                  : isDirty && !isPending
                    ? "bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
                    : "bg-slate-300 cursor-not-allowed dark:bg-white/10"
                }
              `}
            >
              {/* Shimmer while saving */}
              {isPending && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-y-0 w-24 animate-[shimmer_1.2s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              )}

              <span className="relative z-10 flex items-center gap-2">
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Saved!
                  </>
                ) : isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
