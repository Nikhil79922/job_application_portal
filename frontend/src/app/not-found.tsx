"use client"

import Link from "next/link"

import {
  ArrowLeft,
  Compass,
  Search,
  Sparkles,
} from "lucide-react"

import AppBackground from "@/components/shared/app-background"

import { Button } from "@/components/ui/button"

export default function NotFound() {

  return (

    <AppBackground>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">

        {/* BACKGROUND GLOW */}

        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        {/* CARD */}

        <div className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.88] shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:bg-[#0d0d0d]/90 dark:shadow-[0_30px_100px_rgba(0,0,0,0.55)]">

          {/* TOP LINE */}

          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          <div className="relative flex flex-col items-center px-7 py-14 text-center sm:px-10 sm:py-16">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              404 Error
            </div>

            {/* NUMBER */}

            <div className="relative mt-8">

              <h1 className="text-[110px] font-black leading-none tracking-[-8px] text-slate-950 sm:text-[140px] dark:text-white">
                404
              </h1>

              <div className="absolute inset-0 text-[110px] font-black leading-none tracking-[-8px] text-emerald-500/10 blur-sm sm:text-[140px]">
                404
              </div>
            </div>

            {/* ICON */}

            <div className="mt-3 flex h-20 w-20 items-center justify-center rounded-[28px] border border-emerald-500/10 bg-emerald-500/10 text-emerald-500 backdrop-blur-xl">
              <Compass className="h-9 w-9" />
            </div>

            {/* CONTENT */}

            <div className="mt-8 max-w-xl">

              <h2 className="text-3xl font-black tracking-[-2px] text-slate-950 dark:text-white">
                Page not found
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-500 dark:text-zinc-400">
                The page you are looking for may have been moved, deleted, or is temporarily unavailable.
              </p>
            </div>

            {/* ACTIONS */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link href="/">
                <Button className="group h-14 rounded-2xl bg-emerald-500 px-7 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-1 hover:bg-emerald-600">

                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

                  Back To Homepage
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>
    </AppBackground>
  )
}
