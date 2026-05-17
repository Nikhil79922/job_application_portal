import { useAuthStore } from "@/stores/auth.store"
import { Briefcase, Building2, CheckCircle2, CircleDashed, ShieldCheck, TrendingUp, Users, Zap } from "lucide-react"

export function RecruiterWorkspace({ user }: { user: ReturnType<typeof useAuthStore.getState>["user"] }) {
    if (!user) return null
  
    // Profile strength items — mirrored from recruiterChecks
    const profileItems = [
      { done: !!user.name,         label: "Full name",         sublabel: "Visible to all candidates" },
      { done: !!user.phone_number, label: "Phone number",      sublabel: "Direct candidate line" },
      { done: !!user.profile_pic,  label: "Profile photo",     sublabel: "3× more candidate trust" },
      { done: !!user.bio,          label: "Company bio",       sublabel: "Sets hiring context" },
      { done: !!user.email,        label: "Email verified",    sublabel: "Required for applications" },
    ]
    const profileDone       = profileItems.filter((i) => i.done).length
    const profileCompletion = Math.round((profileDone / profileItems.length) * 100)
  
    // Hiring readiness sections
    const hiringReadiness = [
      {
        icon: <Users className="h-5 w-5" />,
        title: "Candidate Pipeline",
        desc: "Browse, filter, and shortlist job seekers that match your open roles. Use filters like skills, location, and experience to find the right fit.",
        accent:    "border-cyan-200/80 dark:border-cyan-500/20",
        iconBg:    "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
        glow:      "bg-cyan-500/[0.04]",
        badge:     "Explore Candidates",
        badgeCls:  "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/15 dark:bg-cyan-500/10 dark:text-cyan-400",
        stat:      "0 Active",
        statLabel: "Candidates tracked",
      },
      {
        icon: <Briefcase className="h-5 w-5" />,
        title: "Job Postings",
        desc: "Create targeted job listings and publish them to a pool of vetted, active job seekers. Set requirements, deadlines, and salary ranges.",
        accent:    "border-violet-200/80 dark:border-violet-500/20",
        iconBg:    "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
        glow:      "bg-violet-500/[0.04]",
        badge:     "Create Listing",
        badgeCls:  "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-400",
        stat:      "0 Live",
        statLabel: "Job postings active",
      },
      {
        icon: <TrendingUp className="h-5 w-5" />,
        title: "Hiring Analytics",
        desc: "Track application volume, profile view rates, shortlist conversion, and time-to-hire across all your active job listings.",
        accent:    "border-emerald-200/80 dark:border-emerald-500/20",
        iconBg:    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        glow:      "bg-emerald-500/[0.04]",
        badge:     "View Insights",
        badgeCls:  "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-400",
        stat:      "—",
        statLabel: "Analytics available",
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: "AI Candidate Matching",
        desc: "Our AI automatically surfaces the highest-fit candidates for your open roles based on skills, experience, bio, and ATS-verified resumes.",
        accent:    "border-yellow-200/80 dark:border-yellow-500/20",
        iconBg:    "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
        glow:      "bg-yellow-500/[0.03]",
        badge:     "Enable Matching",
        badgeCls:  "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-500/15 dark:bg-yellow-500/10 dark:text-yellow-400",
        stat:      "New",
        statLabel: "AI-powered feature",
      },
    ]
  
    return (
      <div className="space-y-5">
  
        {/* ── Hiring Presence header card ───────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-500/6 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.025] via-transparent to-cyan-500/[0.025]" />
  
          <div className="relative z-10 p-6 lg:p-7">
            {/* Section label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-700 dark:border-violet-500/10 dark:bg-violet-500/10 dark:text-violet-400">
              <Building2 className="h-3.5 w-3.5" />
              Recruiter Workspace
            </div>
  
            {/* Title row */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">
                  Hiring Presence
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  Manage your recruiter identity, job listings, and candidate pipeline from one place.
                </p>
              </div>
  
              {/* Profile strength mini-meter */}
              <div className="shrink-0 rounded-[20px] border border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                      Profile Strength
                    </p>
                    <p className="mt-1 text-3xl font-black leading-none tracking-[-2px] text-slate-950 dark:text-white">
                      {profileCompletion}%
                    </p>
                  </div>
                  <div
                    className="relative h-12 w-12"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <svg viewBox="0 0 36 36" className="h-12 w-12">
                      <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-200 dark:text-white/10" />
                      <circle
                        cx="18" cy="18" r="15" fill="none"
                        stroke="url(#recruiter-grad)" strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(profileCompletion / 100) * 94.2} 94.2`}
                      />
                      <defs>
                        <linearGradient id="recruiter-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-700"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>
            </div>
  
            {/* Hiring feature rows */}
            <div className="mt-7 space-y-3">
              {hiringReadiness.map((item) => (
                <div
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[22px] border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] dark:bg-white/[0.03] ${item.accent}`}
                >
                  {/* Subtle bg tint */}
                  <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.glow} rounded-[22px]`} />
  
                  <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Left: icon + text */}
                    <div className="flex flex-1 items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${item.iconBg}`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black tracking-[-0.3px] text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-zinc-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
  
                    {/* Right: stat + badge */}
                    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                      <div className="text-right">
                        <p className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">
                          {item.stat}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-zinc-600">
                          {item.statLabel}
                        </p>
                      </div>
                      <span className={`whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${item.badgeCls}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* ── Profile Trust & Credibility ───────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.025] via-transparent to-transparent" />
  
          <div className="relative z-10 p-6 lg:p-7">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">
                  Trust &amp; Credibility
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                  A complete recruiter profile builds confidence with candidates and increases application rates by up to 3×.
                </p>
              </div>
            </div>
  
            {/* Two-column checklist grid */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profileItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-[18px] border p-4 transition-all ${
                    item.done
                      ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-500/15 dark:bg-emerald-500/[0.05]"
                      : "border-slate-200 bg-slate-50/60 dark:border-white/10 dark:bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      item.done
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "border-slate-200 bg-white text-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-700"
                    }`}
                  >
                    {item.done ? <CheckCircle2 className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold ${item.done ? "text-slate-800 dark:text-zinc-100" : "text-slate-400 dark:text-zinc-600"}`}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-600">{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Bottom meta */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/[0.06]">
              <p className="text-[11px] text-slate-400 dark:text-zinc-600">
                {profileDone} of {profileItems.length} profile items complete
              </p>
              {profileDone === profileItems.length ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Fully Verified
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  </span>
                  In Progress
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }