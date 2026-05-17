/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import AppBackground from "@/components/shared/app-background"
import FuturisticLoader from "@/components/loaders/page-loader"
import { useAuthStore } from "@/stores/auth.store"
import { useProfile } from "../hooks/use-profile"

import ProfileHero from "./profile-hero"
import ProfileAbout from "./profile-about"
import ProfileSkills from "./profile-skills"
import ProfileResume from "./profile-resume"
import { RecruiterWorkspace } from "./recruiter/recruiter-workspace"
import { RecruiterSidebar } from "./recruiter/recruiter-sidebar"
import { JobseekerSidebar } from "./joobseeker/jobseeker-sidebar"


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { data: initialData, isLoading } = useProfile()

  // Live store subscription — sidebar + hero re-render on edit
  const storeUser = useAuthStore((state) => state.user)
  const data      = storeUser ?? initialData

  if (isLoading || !data || !data.skills) {
    return <FuturisticLoader />
  }

  const isRecruiter = data.role === "recruiter"

  // ── Completion checks ────────────────────────────────────────────────────────

  const jobseekerChecks = [
    { done: !!data.name,                                            label: "Full name added",          sublabel: "Displayed on your profile" },
    { done: !!data.email,                                           label: "Email verified",            sublabel: "Required for applications" },
    { done: !!data.phone_number,                                    label: "Phone number added",        sublabel: "Enables recruiter contact" },
    { done: !!data.profile_pic,                                     label: "Profile photo uploaded",    sublabel: "Increases visibility 3×" },
    { done: data.profile_pic_upload_status === "success",           label: "Photo verified",            sublabel: "AI processing complete" },
    { done: !!data.bio,                                             label: "Bio / summary written",     sublabel: "Shown to recruiters" },
    { done: !!data.resume,                                          label: "Resume uploaded",           sublabel: "Required for applications" },
    { done: data.resume_upload_status === "success",                label: "Resume ATS verified",       sublabel: "AI parsing complete" },
    { done: Array.isArray(data.skills) && data.skills.length > 0,  label: "Skills added",             sublabel: "Used for job matching" },
  ]

  const recruiterChecks = [
    { done: !!data.name,         label: "Full name added",       sublabel: "Visible to candidates" },
    { done: !!data.email,        label: "Email verified",         sublabel: "Candidate contact" },
    { done: !!data.phone_number, label: "Phone number added",     sublabel: "Direct candidate line" },
    { done: !!data.profile_pic,  label: "Profile photo uploaded", sublabel: "Builds trust with candidates" },
    { done: !!data.bio,          label: "Company bio written",    sublabel: "Sets context for applicants" },
  ]

  const checks     = isRecruiter ? recruiterChecks : jobseekerChecks
  const completed  = checks.filter((c) => c.done).length
  const completion = Math.round((completed / checks.length) * 100)

  return (
    <AppBackground>
      <section className="relative min-h-screen overflow-hidden">

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute right-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[30%] h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Hero — full width */}
        <div className="relative z-10 w-full px-4 pt-8 sm:px-6 lg:px-8">
          <ProfileHero user={data as any} completion={completion} />
        </div>

        {/* Main content grid */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

            {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
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

            {/* ── MAIN WORKSPACE ──────────────────────────────────────────── */}
            <main className="space-y-6">
              {/* About — both roles */}
              <ProfileAbout user={data as any} />

              {/* Jobseeker-only */}
              {!isRecruiter && (
                <>
                  <ProfileSkills user={data as any} />
                  <ProfileResume user={data as any} />
                </>
              )}

              {/* Recruiter-only workspace */}
              {isRecruiter && (
                <RecruiterWorkspace user={data as any} />
              )}
            </main>
          </div>
        </div>
      </section>
    </AppBackground>
  )
}