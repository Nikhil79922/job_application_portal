/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"

import {
  BriefcaseBusiness,
  Building2,
  Sparkles,
  Users,
} from "lucide-react"

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa"
import AppBackground from "@/components/shared/app-background"

const AboutPage = () => {
  return (
    <AppBackground>
    <section className="relative ">

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-6 lg:px-8">

        {/* HERO SECTION */}
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            {/* BADGE */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

              <Sparkles className="h-4 w-4" />

              About The Creator
            </div>

            {/* HEADING */}
            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-[-3px] text-slate-950 dark:text-white sm:text-6xl">

              Crafting
              <span className="block text-emerald-600">
                Modern Digital
              </span>

              Experiences
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-zinc-400">
              Talent Forge is a futuristic recruitment platform built and
              designed by Nikhil Singh with a focus on premium UI systems,
              modern hiring experiences, intelligent workflows, and scalable
              full-stack architecture.
            </p>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-500 dark:text-zinc-400">
              The platform combines elegant frontend experiences with modern
              backend technologies to create seamless recruitment workflows
              for both candidates and organizations.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-10 flex flex-wrap items-center gap-5">

              {/* LINKEDIN */}
              <Link
                href="https://www.linkedin.com/in/nikhil-kumar-singh-a167b2279/"
                target="_blank"
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] dark:border-white/10 dark:bg-[#111111] dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.03]"
              >

                {/* GLOW */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center gap-4">

                  {/* ICON */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A66C2]/10 text-[#0A66C2]">

                    <FaLinkedin className="h-5 w-5 transition-all duration-500 group-hover:scale-110" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      LinkedIn Profile
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                      Connect professionally
                    </p>
                  </div>
                </div>
              </Link>

              {/* GITHUB */}
              <Link
                href="https://github.com/Nikhil79922"
                target="_blank"
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] dark:border-white/10 dark:bg-[#111111] dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/[0.03]"
              >

                {/* GLOW */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-center gap-4">

                  {/* ICON */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">

                    <FaGithub className="h-5 w-5 transition-all duration-500 group-hover:scale-110" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      GitHub Portfolio
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                      Explore repositories
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-14 flex flex-wrap items-center gap-8">

              <div>
                <h3 className="text-3xl font-black text-slate-950 dark:text-white">
                  MERN
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  Full Stack Expertise
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-950 dark:text-white">
                  Next.js
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  Modern Frontend
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-950 dark:text-white">
                  UI/UX
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  Design Focused
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center">

            {/* GLOW */}
            <div className="absolute inset-0 rounded-[40px] bg-emerald-500/10 blur-3xl" />

            {/* IMAGE CARD */}
            <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#111111]">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                alt="Developer Workspace"
                className="h-[620px] w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* FLOATING CARD */}
              <div className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Full Stack Developer
                    </h4>

                    <p className="text-xs text-zinc-300">
                      Building Modern Web Systems
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD */}
              <div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

                <div className="flex items-center gap-5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
                    <Users className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Creative
                    </h3>

                    <p className="text-sm text-zinc-300">
                      UI Engineering
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
                    Talent Forge
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-zinc-400">
                    Recruitment Platform
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

export default AboutPage