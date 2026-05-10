"use client"

import Link from "next/link"

import {
  ArrowRight,
  BriefcaseBusiness,
  
  Building2,
  Search,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section className="relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-white dark:bg-[#09090B]" />

      {/* GRADIENT LIGHT */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5" />

      {/* GRID */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />

      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-16 px-4 py-20 md:px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          {/* BADGE */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

            <Sparkles className="h-4 w-4" />

            AI Powered Hiring Platform
          </div>

          {/* HEADING */}
          <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-[-3px] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">

            Build Your
            <span className="block text-emerald-600">
              Dream Career
            </span>

            With Confidence
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-zinc-400">
            Discover thousands of premium opportunities,
            connect with world-class companies, and
            accelerate your professional journey with
            Talent Forge.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111] sm:flex-row">

            {/* INPUT */}
            <div className="flex h-14 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-zinc-900">

              <Search className="h-5 w-5 text-slate-400 dark:text-zinc-500" />

              <input
                type="text"
                placeholder="Job title, keyword, or company"
                className="h-full w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
              />
            </div>

            {/* BUTTON */}
            <Button className="group h-14 rounded-2xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-emerald-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.32)]">

              Find Jobs

              <ArrowRight className="ml-2 h-4 w-4 transition-all duration-500 group-hover:translate-x-[3px]" />
            </Button>
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

            {/* GLOW */}
            <div className="absolute inset-0 rounded-[40px] bg-emerald-500/10 blur-3xl" />

            {/* CARD */}
            <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#111111]">

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
            <div className="absolute -left-10 bottom-20 hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#111111] lg:block">

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
  )
}

export default Hero