/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/stores/auth.store";
import ProfileStatus from "../profile-status";
import { StatTile } from "../checker/stat-tile";
import { BadgeCheck, Eye, FileText, Globe, Layers, Mail, Phone, Rocket, Star } from "lucide-react";
import { CheckItem } from "../checker/check-items";

export function JobseekerSidebar({
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
      {/* Analytics card */}
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">
        <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/8 blur-3xl dark:bg-emerald-500/5" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/5" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">
            <Eye className="h-3 w-3" />
            Profile Analytics
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-[-1.5px] text-slate-950 dark:text-white">
            Visibility &amp; Trust
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">
            Your visibility is determined by profile completion and account credibility.
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
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Active
                </div>
                <p className="text-[10px] text-slate-400 dark:text-zinc-600">
                  {checks.filter((c) => c.done).length}/{checks.length} complete
                </p>
              </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 transition-all duration-700"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <StatTile
              icon={<FileText className="h-4 w-4" />}
              label="Resume"
              value={user.resume_upload_status === "success" ? "Verified" : "Pending"}
              accent={user.resume_upload_status === "success" ? "emerald" : "yellow"}
            />
            <StatTile
              icon={<Layers className="h-4 w-4" />}
              label="Skills"
              value={user.skills?.length ?? 0}
              accent="cyan"
            />
            <StatTile
              icon={<Star className="h-4 w-4" />}
              label="Plan"
              value={user.subscription ?? "Free"}
              accent="violet"
            />
            <StatTile
              icon={<Rocket className="h-4 w-4" />}
              label="AI Match"
              value={user.skills?.length ? "On" : "Off"}
              accent={user.skills?.length ? "emerald" : "yellow"}
            />
          </div>
        </div>
      </div>

      {/* Checklist card */}
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-[-0.4px] text-slate-950 dark:text-white">
              Profile Checklist
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-zinc-500">
              Complete all items to maximise recruiter reach
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {checks.map((c) => (
            <CheckItem key={c.label} {...c} />
          ))}
        </div>
      </div>

      {/* Contact info card — only if at least one filled */}
      {(user.email || user.phone_number) && (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-base font-black tracking-[-0.4px] text-slate-950 dark:text-white">
              Contact Info
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            {user.email && (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <Mail className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" />
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-zinc-200">
                  {user.email}
                </p>
              </div>
            )}
            {user.phone_number && (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.03]">
                <Phone className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" />
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                  {user.phone_number}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ProfileStatus component */}
      <ProfileStatus user={user as any} />
    </div>
  )
}