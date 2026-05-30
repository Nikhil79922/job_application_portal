/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"                          // kept for modal toast z-fix only

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
  Zap,
} from "lucide-react"

import { createPortal } from "react-dom"

import AppBackground      from "@/components/shared/app-background"
import FuturisticLoader   from "@/components/loaders/page-loader"

import { useAuthStore }   from "@/stores/auth.store"
import { useProfile }     from "../hooks/use-profile"
import { usePayment }     from "../hooks/use-payment"

import ProfileHero        from "./profile-hero"
import ProfileAbout       from "./profile-about"
import ProfileSkills      from "./profile-skills"
import ProfileResume      from "./profile-resume"

import { RecruiterWorkspace } from "./recruiter/recruiter-workspace"
import { RecruiterSidebar }   from "./recruiter/recruiter-sidebar"
import { JobseekerSidebar }   from "./jobseeker/jobseeker-sidebar"

// ─── Subscription Modal ───────────────────────────────────────────────────────

interface SubscriptionModalProps {
  onClose: () => void
  onActivate: () => void
  isLoading: boolean
}

function SubscriptionModal({
  onClose,
  onActivate,
  isLoading,
}: SubscriptionModalProps) {

  const perks = [
    {
      label: "Priority application visibility",
      sub:   "Get seen by recruiters first",
    },
    {
      label: "Direct recruiter access",
      sub:   "Message hiring managers directly",
    },
    {
      label: "AI-powered resume boost",
      sub:   "Stand out with smart suggestions",
    },
    {
      label: "Unlimited job applications",
      sub:   "Apply with no monthly cap",
    },
  ]

  return createPortal(
    <>
      {/*
        Sonner mounts its toaster at z ~9999 by default.
        The modal backdrop sits at z-[2147483647] which buries it.
        This bumps the Sonner viewport one level above the modal.
      */}
      <style>{`[data-sonner-toaster]{z-index:2147483648!important}`}</style>

      <div
        className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4"
        style={{
          background:     "rgba(0,0,0,0.72)",
          backdropFilter: "blur(12px)",
        }}
        onClick={(e) =>
          e.target === e.currentTarget && onClose()
        }
      >
        <div
          className="relative w-full max-w-lg overflow-hidden rounded-[32px]"
          style={{
            background:  "linear-gradient(145deg, #ffffff 0%, #f8fffe 100%)",
            border:      "1px solid rgba(16,185,129,0.15)",
            boxShadow:   "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(16,185,129,0.08)",
          }}
        >
          {/* top shimmer */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

          {/* dark mode overlay */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                "linear-gradient(145deg, #0f1a14 0%, #0a1210 100%)",
            }}
          />

          {/* ── Header ── */}
          <div
            className="relative z-10 flex items-start justify-between gap-4 px-7 pt-7 pb-5"
            style={{ borderBottom: "1px solid rgba(16,185,129,0.1)" }}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Sparkles className="h-3 w-3" />
                  Premium Subscription
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-600 dark:text-amber-400">
                  <Zap className="h-2.5 w-2.5" />
                  Best Value
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-950 dark:text-white">
                Unlock Premium Features
              </h2>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-400">
                Everything you need to land your next job faster.
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-200 border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-400 dark:hover:bg-white/[0.09]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="relative z-10 px-7 py-6 space-y-6">

            {/* Price */}
            <div className="flex items-center justify-between rounded-2xl px-5 py-4 border border-emerald-500/15 bg-emerald-50/60 dark:bg-emerald-500/[0.07]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                  Monthly plan
                </p>
                <div className="mt-1 flex items-end gap-1.5">
                  <span className="text-4xl font-black tracking-[-0.06em] text-slate-950 dark:text-white">
                    ₹119
                  </span>
                  <span className="mb-1.5 text-sm text-slate-400 dark:text-zinc-500">
                    / month
                  </span>
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            {/* Perks */}
            <div className="space-y-3">
              {perks.map((perk) => (
                <div
                  key={perk.label}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      {perk.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">
                      {perk.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/[0.06]" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onActivate}
                disabled={isLoading}
                className="group/btn relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-emerald-400/20 bg-[#07130F] h-12 px-6 text-sm font-semibold tracking-[0.02em] text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-[#0A1B15] hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                  <div className="absolute inset-y-0 left-0 w-[40%] bg-emerald-400/15 blur-2xl" />
                </div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] transition-transform duration-1000 group-hover/btn:translate-x-[120%]" />

                <span className="relative z-10 text-emerald-50">
                  {isLoading ? "Processing…" : "Activate Now"}
                </span>
                {!isLoading && (
                  <ArrowRight className="relative z-10 h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                )}
              </button>

              <button
                onClick={onClose}
                className="flex h-12 items-center justify-center rounded-2xl px-5 border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {

  const { data: initialData, isLoading } = useProfile()

  const storeUser = useAuthStore((state) => state.user)
  const setAuth = useAuthStore((state) => state.setAuth)
  const accessToken = useAuthStore((state) => state.accessToken)
  const data = initialData ?? storeUser

  useEffect(() => {
    if (initialData && accessToken) {
      setAuth(initialData as any, accessToken)
    }
  }, [initialData, accessToken, setAuth])

  const { initiateCheckout, isLoading: checkoutLoading } = usePayment()

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  if (isLoading || !data) {
    return <FuturisticLoader />
  }

  const isRecruiter = data.role === "recruiter"

  // ─── Completion checks ────────────────────────────────────────────────────────

  const jobseekerChecks = [
    {
      done:     !!data.name,
      label:    "Full name added",
      sublabel: "Displayed on your profile",
    },
    {
      done:     !!data.email,
      label:    "Email verified",
      sublabel: "Required for applications",
    },
    {
      done:     !!data.phone_number,
      label:    "Phone number added",
      sublabel: "Enables recruiter contact",
    },
    {
      done:     !!data.profile_pic,
      label:    "Profile photo uploaded",
      sublabel: "Increases visibility 3×",
    },
    {
      done:     data.profile_pic_upload_status === "success",
      label:    "Photo verified",
      sublabel: "AI processing complete",
    },
    {
      done:     !!data.bio,
      label:    "Bio / summary written",
      sublabel: "Shown to recruiters",
    },
    {
      done:     !!data.resume,
      label:    "Resume uploaded",
      sublabel: "Required for applications",
    },
    {
      done:     data.resume_upload_status === "success",
      label:    "Resume ATS verified",
      sublabel: "AI parsing complete",
    },
    {
      done:     Array.isArray(data.skills) && data.skills.length > 0,
      label:    "Skills added",
      sublabel: "Used for job matching",
    },
  ]

  const recruiterChecks = [
    {
      done:     !!data.name,
      label:    "Full name added",
      sublabel: "Visible to candidates",
    },
    {
      done:     !!data.email,
      label:    "Email verified",
      sublabel: "Candidate contact",
    },
    {
      done:     !!data.phone_number,
      label:    "Phone number added",
      sublabel: "Direct candidate line",
    },
    {
      done:     !!data.profile_pic,
      label:    "Profile photo uploaded",
      sublabel: "Builds trust with candidates",
    },
    {
      done:     !!data.bio,
      label:    "Company bio written",
      sublabel: "Sets context for applicants",
    },
  ]

  const checks     = isRecruiter ? recruiterChecks : jobseekerChecks
  const completed  = checks.filter((c) => c.done).length
  const completion = Math.round((completed / checks.length) * 100)

  // Active when subscription date exists and is in the future
  const isSubscribed =
    !!data.subscription &&
    new Date(data.subscription) > new Date()

  const subscriptionExpiry = isSubscribed
    ? new Date(data.subscription!).toLocaleDateString("en-IN", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
      })
    : null

  const teaserPerks = [
    "Priority application visibility",
    "Direct recruiter access",
  ]

  const activePerks = [
    "Priority application visibility",
    "Direct recruiter access",
    "AI-powered resume boost",
    "Unlimited job applications",
  ]

  const handleActivate = async () => {
    try {
      // Add smooth fade-out feeling
      document.body.style.pointerEvents = "none"
  
      // Start closing modal
      setShowSubscriptionModal(false)
  
      // Wait for modal animation/unmount
      requestAnimationFrame(async () => {
        requestAnimationFrame(async () => {
          // Restore interactions
          document.body.style.pointerEvents = ""
  
          // Open Razorpay smoothly
          await initiateCheckout()
        })
      })
    } catch (error) {
      document.body.style.pointerEvents = ""
  
      console.error("Checkout failed:", error)
      toast.error("Unable to start payment. Please try again.")
    }
  }

  return (
    <AppBackground>
      <section className="relative min-h-screen overflow-hidden">

        {/* ── Background glows ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute right-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[30%] h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        {/* ── Subtle grid ── */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* ── Hero ── */}
        <div className="relative z-10 w-full px-4 pt-8 sm:px-6 lg:px-8">
          <ProfileHero
            user={data as any}
            completion={completion}
          />
        </div>

        {/* ── Main grid ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

            {/* ── Sidebar ── */}
            <aside className="xl:sticky xl:top-8 xl:h-fit">
              {isRecruiter ? (
                <RecruiterSidebar
                  user={data as any}
                  checks={recruiterChecks}
                  completion={completion}
                />
              ) : (
                <JobseekerSidebar
                  user={data as any}
                  checks={jobseekerChecks}
                  completion={completion}
                />
              )}
            </aside>

            {/* ── Main workspace ── */}
            <main className="space-y-6">
              <ProfileAbout user={data as any} />

              {!isRecruiter && (
                <>
                  <ProfileSkills user={data as any} />

                  {/* ─────────────── SUBSCRIPTION CARD (active or teaser) ─────────────── */}
                  {isSubscribed ? (

                    /* ── ACTIVE STATE ── */
                    <div
                      className="
                        relative overflow-hidden rounded-[30px]
                        border border-emerald-200/60 bg-white
                        shadow-[0_12px_40px_rgba(16,185,129,0.08)]
                        dark:border-emerald-500/20 dark:bg-[#0b1a12]
                      "
                    >
                      {/* top shimmer — always visible when active */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
                      {/* subtle glow */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-cyan-500/[0.04]" />

                      <div className="relative z-10 p-6 sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                          {/* Left */}
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300">
                                <CheckCircle2 className="h-3 w-3" />
                                Active
                              </div>
                              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <Sparkles className="h-3 w-3" />
                                Premium
                              </div>
                            </div>

                            <div>
                              <h3 className="text-[20px] font-black leading-tight tracking-[-0.05em] text-slate-950 dark:text-white">
                                You&apos;re on Premium
                              </h3>
                              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                                All features unlocked. Renews on{" "}
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                  {subscriptionExpiry}
                                </span>
                              </p>
                            </div>

                            {/* All 4 perks */}
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {activePerks.map((perk) => (
                                <div
                                  key={perk}
                                  className="flex items-center gap-2"
                                >
                                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <span className="text-xs font-medium text-slate-600 dark:text-zinc-300">
                                    {perk}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right — expiry ring */}
                          <div className="shrink-0 flex flex-col items-center justify-center rounded-2xl border border-emerald-200/60 bg-emerald-50/80 px-6 py-4 dark:border-emerald-500/15 dark:bg-emerald-500/[0.08] min-w-[120px]">
                            <Sparkles className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mb-2" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
                              Expires
                            </p>
                            <p className="mt-0.5 text-sm font-black text-slate-900 dark:text-white text-center">
                              {subscriptionExpiry}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  ) : (

                    /* ── TEASER STATE ── */
                    <div
                      className="
                        group relative overflow-hidden
                        rounded-[30px]
                        border border-slate-200 bg-white
                        shadow-[0_12px_40px_rgba(15,23,42,0.06)]
                        transition-all duration-300
                        hover:border-emerald-300/40
                        hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
                        dark:border-white/10 dark:bg-[#111111]
                        dark:hover:border-emerald-500/20
                        dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                      "
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-cyan-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10 p-6 sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                          {/* Left */}
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <Sparkles className="h-3 w-3" />
                                Premium Subscription
                              </div>
                              <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-600 dark:text-amber-400">
                                <Zap className="h-2.5 w-2.5" />
                                Best Value
                              </div>
                            </div>

                            <div>
                              <h3 className="text-[20px] font-black leading-tight tracking-[-0.05em] text-slate-950 dark:text-white">
                                Unlock Premium Features
                              </h3>
                              <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-400">
                                Priority applications and direct recruiter access.
                              </p>
                            </div>

                            <div className="flex items-end gap-1.5">
                              <span className="text-3xl font-black tracking-[-0.06em] text-slate-950 dark:text-white">
                                ₹119
                              </span>
                              <span className="mb-1 text-sm text-slate-400 dark:text-zinc-500">
                                / month
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                              {teaserPerks.map((perk) => (
                                <div
                                  key={perk}
                                  className="flex items-center gap-1.5"
                                >
                                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10">
                                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                                    {perk}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right — opens modal */}
                          <div className="shrink-0">
                            <button
                              onClick={() => setShowSubscriptionModal(true)}
                              className="
                                group/btn relative flex items-center justify-center gap-2
                                overflow-hidden rounded-2xl
                                border border-emerald-400/20 bg-[#07130F]
                                h-12 px-7 text-sm font-semibold tracking-[0.02em] text-white
                                shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                                transition-all duration-300 ease-out
                                hover:-translate-y-0.5
                                hover:border-emerald-400/40 hover:bg-[#0A1B15]
                                hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)]
                                active:scale-[0.985]
                                whitespace-nowrap
                              "
                            >
                              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                                <div className="absolute inset-y-0 left-0 w-[40%] bg-emerald-400/15 blur-2xl" />
                              </div>
                              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
                              <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] transition-transform duration-1000 group-hover/btn:translate-x-[120%]" />

                              <span className="relative z-10 text-emerald-50">View Plan</span>
                              <ArrowRight className="relative z-10 h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  )}

                  <ProfileResume user={data as any} />
                </>
              )}

              {isRecruiter && (
                <RecruiterWorkspace user={data as any} />
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ── Subscription modal — only for non-subscribers ── */}
      {showSubscriptionModal && !isSubscribed && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onActivate={handleActivate}
          isLoading={checkoutLoading}
        />
      )}
    </AppBackground>
  )
}