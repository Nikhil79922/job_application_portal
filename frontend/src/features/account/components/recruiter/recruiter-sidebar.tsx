/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeCheck, Building2,  Globe, Mail, Phone, ShieldCheck, Star } from "lucide-react";
import ProfileStatus from "../profile-status";
import { useAuthStore } from "@/stores/auth.store";
import { CheckItem } from "../checker/check-items";
import { StatTile } from "../checker/stat-tile";




export function RecruiterSidebar({
    user,
    checks,
    completion,
  }: {
    user: NonNullable<ReturnType<typeof useAuthStore.getState>["user"]>
    checks: { done: boolean; label: string; sublabel?: string }[]
    completion: number
  }) {
    return (
      <div className="space-y-5">
  
        {/* ── Analytics card — mirrors jobseeker sidebar exactly ──────────── */}
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">
          <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-violet-500/8 blur-3xl dark:bg-violet-500/5" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/5" />
  
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700 dark:border-violet-500/10 dark:bg-violet-500/10 dark:text-violet-400">
              <Building2 className="h-3 w-3" />
              Recruiter Analytics
            </div>
  
            <h2 className="mt-4 text-2xl font-black tracking-[-1.5px] text-slate-950 dark:text-white">
              Hiring Presence
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">
              Your recruiter visibility is determined by profile completeness and account credibility.
            </p>
  
            {/* Completion meter */}
            <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                    Profile Score
                  </p>
                  <h3 className="mt-1.5 text-5xl font-black leading-none tracking-[-4px] text-slate-950 dark:text-white">
                    {completion}%
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:border-violet-500/10 dark:bg-violet-500/10 dark:text-violet-400">
                    Recruiter
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-600">
                    {checks.filter((c) => c.done).length}/{checks.length} complete
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 transition-all duration-700"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
  
            {/* Quick stats — recruiter-relevant */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatTile
                icon={<Star className="h-4 w-4" />}
                label="Plan"
                value={user.subscription ?? "Free"}
                accent="violet"
              />
              <StatTile
                icon={<BadgeCheck className="h-4 w-4" />}
                label="Account"
                value="Verified"
                accent="emerald"
              />
              <StatTile
                icon={<Phone className="h-4 w-4" />}
                label="Contact"
                value={user.phone_number ? "Set" : "Missing"}
                accent={user.phone_number ? "emerald" : "yellow"}
              />
              <StatTile
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Trust"
                value={completion >= 80 ? "High" : completion >= 50 ? "Medium" : "Low"}
                accent={completion >= 80 ? "emerald" : completion >= 50 ? "cyan" : "yellow"}
              />
            </div>
          </div>
        </div>
  
        {/* ── Trust checklist ────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-[-0.4px] text-slate-950 dark:text-white">
                Trust Checklist
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                Complete to build confidence with candidates
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {checks.map((c) => (
              <CheckItem key={c.label} {...c} />
            ))}
          </div>
          {/* Bottom status */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
            <p className="text-[11px] text-slate-400 dark:text-zinc-600">
              {checks.filter((c) => c.done).length}/{checks.length} items complete
            </p>
            {checks.every((c) => c.done) ? (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Complete
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400" />
                </span>
                In Progress
              </div>
            )}
          </div>
        </div>
  
        {/* ── Contact info card ─────────────────────────────────────────────── */}
        {(user.email || user.phone_number) && (
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-[-0.4px] text-slate-950 dark:text-white">
                  Contact Info
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                  Visible to shortlisted candidates
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {user.email && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" />
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-zinc-200">{user.email}</p>
                </div>
              )}
              {user.phone_number && (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" />
                  <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">{user.phone_number}</p>
                </div>
              )}
            </div>
          </div>
        )}
  
        <ProfileStatus user={user as any} />
      </div>
    )
  }