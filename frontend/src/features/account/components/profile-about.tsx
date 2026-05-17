"use client"

import {
  Briefcase,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import {
  useAuthStore,
} from "@/stores/auth.store"

import type {
  MeUser,
} from "../types/me.types"

interface Props {
  user: MeUser
}

export default function ProfileAbout({
  user: initialUser,
}: Props) {

  /* LIVE USER */

  const liveUser =
    useAuthStore(
      (state) => state.user
    )

  const user =
    liveUser ||
    initialUser

  const showBio =
    [
      "jobseeker",
      "recruiter",
    ].includes(
      user.role
    )

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

          About Profile
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

          Personal and professional information overview.
        </p>
      </div>

      {/* ABOUT CARD */}

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">

        {/* BG */}

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent" />

        <div className="relative z-10">

          {/* TOP */}

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>

              <h3 className="text-xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                Profile Summary
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                Core identity and communication details.
              </p>
            </div>
          </div>

          {/* GRID */}

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            {/* EMAIL */}

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                  <Mail className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                    Email Address
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-slate-950 dark:text-white">

                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* PHONE */}

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                  <Phone className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                    Phone Number
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">

                    {
                      user.phone_number ||
                      "Not added"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* ROLE */}

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                  <Briefcase className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                    Account Role
                  </p>

                  <p className="mt-1 text-sm font-semibold capitalize text-slate-950 dark:text-white">

                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            {/* PLAN */}

            <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">

                  <Sparkles className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                    Subscription
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">

                    {
                      user.subscription ||
                      "Free Plan"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BIO */}

          {
            showBio && (

              <div className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-white/[0.03]">

                {/* HEADER */}

                <div className="relative overflow-hidden border-b border-slate-200 px-6 py-5 dark:border-white/10">

                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

                  <div className="relative z-10 flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>

                      <h4 className="text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">

                        {
                          user.role ===
                          "recruiter"
                            ? "Company / Hiring Bio"
                            : "Professional Bio"
                        }
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-zinc-400">

                        {
                          user.role ===
                          "recruiter"

                            ? "Introduce your company culture, recruitment vision, and hiring goals."

                            : "Your public professional introduction visible to recruiters and employers."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-6">

                  {
                    user.bio ? (

                      <p className="whitespace-pre-wrap text-sm leading-8 text-slate-700 dark:text-zinc-300">

                        {user.bio}
                      </p>

                    ) : (

                      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center dark:border-white/10 dark:bg-black/20">

                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                          <Sparkles className="h-7 w-7" />
                        </div>

                        <h3 className="mt-5 text-lg font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                          No Bio Added Yet
                        </h3>

                        <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500 dark:text-zinc-400">

                          {
                            user.role ===
                            "recruiter"

                              ? "Add a hiring or company bio to improve employer branding and candidate trust."

                              : "Add a professional summary to improve recruiter engagement and profile visibility."
                          }
                        </p>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}