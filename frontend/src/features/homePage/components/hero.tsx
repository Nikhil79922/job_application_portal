"use client"

import Link from "next/link"

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import AppBackground from "@/components/shared/app-background"

import { useAuthStore } from "@/stores/auth.store"

const Hero = () => {

  const user =
    useAuthStore(
      (state) => state.user
    )

  const role =
    user?.role

  const isRecruiter =
    role === "recruiter"

  return (

    <AppBackground>

      <section className="relative overflow-hidden">

        {/* ambient */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-3xl" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-3xl" />
        </div>

        <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-16 px-4 py-17 md:px-6 lg:grid-cols-2 lg:px-8">

          {/* LEFT CONTENT */}

          <div className="relative z-10">

            {/* BADGE */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/70 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur-xl dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

              <Sparkles className="h-4 w-4" />

              AI Powered Hiring Platform
            </div>

            {/* HEADING */}

            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-[-3px] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">

              {
                isRecruiter
                  ? (
                    <>
                      Discover Top
                      <span className="block text-emerald-600 dark:text-emerald-500">

                        Companies
                      </span>

                      & Hiring Trends
                    </>
                  )
                  : (
                    <>
                      Build Your

                      <span className="block text-emerald-600 dark:text-emerald-500">

                        Dream Career
                      </span>

                      With Confidence
                    </>
                  )
              }
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-zinc-400">

              {
                isRecruiter
                  ? (
                    <>
                      Explore leading companies,
                      discover hiring opportunities,
                      and connect with the best talent
                      ecosystem through Talent Forge.
                    </>
                  )
                  : (
                    <>
                      Discover thousands of premium opportunities,
                      connect with world-class companies, and
                      accelerate your professional journey with
                      Talent Forge.
                    </>
                  )
              }
            </p>

            {/* CTA BUTTONS */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              {/* PRIMARY */}

              <Link
                href={
                  isRecruiter
                    ? "/recruiter/companies"
                    : "/jobs"
                }
              >

                <Button
                  className="
                    group relative

                    h-14
                    overflow-hidden

                    rounded-2xl

                    border border-emerald-400/20

                    bg-emerald-600

                    px-8

                    text-sm
                    font-semibold

                    text-white

                    shadow-[0_10px_30px_rgba(16,185,129,0.25)]

                    transition-all duration-500

                    hover:-translate-y-[2px]
                    hover:bg-emerald-500

                    hover:shadow-[0_18px_40px_rgba(16,185,129,0.32)]
                  "
                >

                  {/* shine */}

                  <div
                    className="
                      absolute inset-0

                      translate-x-[-120%]

                      bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.10),transparent)]

                      transition-transform duration-1000

                      group-hover:translate-x-[120%]
                    "
                  />

                  <span
                    className="
                      relative z-10
                      flex items-center
                    "
                  >

                    {
                      isRecruiter
                        ? "See Companies"
                        : "Find Jobs"
                    }

                    <ArrowRight
                      className="
                        ml-2 h-4 w-4

                        transition-all duration-500

                        group-hover:translate-x-[3px]
                      "
                    />
                  </span>
                </Button>
              </Link>


            </div>

            {/* MINI INFO */}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-zinc-400">

              <span>
                Remote
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-600" />

              <span>
                Full-Time
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-600" />

              <span>
                AI Matching
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-600" />

              <span>
                Premium Companies
              </span>
            </div>

            {/* STATS */}

            <div className="mt-12 flex flex-wrap items-center gap-8">

              <div>

                <h3 className="text-3xl font-black text-slate-950 dark:text-white">

                  25K+
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                  Active Jobs
                </p>
              </div>

              <div>

                <h3 className="text-3xl font-black text-slate-950 dark:text-white">

                  12K+
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                  Companies
                </p>
              </div>

              <div>

                <h3 className="text-3xl font-black text-slate-950 dark:text-white">

                  48K+
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                  Hires Made
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="relative flex items-center justify-center">

            {/* MAIN IMAGE CARD */}

            <div className="relative w-full max-w-[580px]">

              {/* CARD */}

              <div className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-white/70 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.03]">

                {/* IMAGE */}

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
                  alt="Team Collaboration"
                  className="h-[650px] w-full object-cover"
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* FLOATING CARD 1 */}

                <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">

                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <div>

                      <h4 className="text-sm font-semibold text-white">

                        Product Designer
                      </h4>

                      <p className="text-xs text-zinc-300">

                        Remote • Full Time
                      </p>
                    </div>
                  </div>
                </div>

                {/* FLOATING CARD 2 */}

                <div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                  <div className="flex items-center gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">

                      <Users className="h-6 w-6" />
                    </div>

                    <div>

                      <h3 className="text-2xl font-black text-white">

                        98%
                      </h3>

                      <p className="text-sm text-zinc-300">

                        Hiring Success
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING MINI CARD */}

              <div className="absolute -left-10 bottom-20 hidden rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.03] lg:block">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                    <Building2 className="h-6 w-6" />
                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">

                      500+
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-zinc-400">

                      Top Companies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppBackground>
  )
}

export default Hero