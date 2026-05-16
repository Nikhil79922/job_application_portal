"use client"

import AppBackground from "@/components/shared/app-background"

import FuturisticLoader from "@/components/loaders/page-loader"

import {
    useProfile,
} from "../hooks/use-profile"

import ProfileHero from "./profile-hero"

import ProfileStatus from "./profile-status"

import ProfileAbout from "./profile-about"

import ProfileSkills from "./profile-skills"

import ProfileResume from "./profile-resume"

export default function ProfilePage() {

    const {
        data,
        isLoading,
    } = useProfile()

    if (isLoading) {
        return <FuturisticLoader />
    }

    if (!data) {
        return null
    }

    const isRecruiter =
        data.role ===
        "recruiter"

    /* PROFILE COMPLETION */

    const checks = [

        !!data.name,

        !!data.email,

        !!data.phone_number,

        !!data.profile_pic,

        data.profile_pic_upload_status ===
        "success",

        isRecruiter
            ? true
            : !!data.bio,

        isRecruiter
            ? true
            : !!data.resume,
    ]

    const completed =
        checks.filter(Boolean)
            .length

    const completion =
        Math.round(
            (
                completed /
                checks.length
            ) * 100
        )

    return (

        <AppBackground>

            <section className="relative min-h-screen overflow-hidden">

                {/* BACKGROUND */}

                <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="absolute right-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="absolute bottom-[-180px] left-[30%] h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />
                </div>

                {/* GRID */}

                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            `
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)
                            `,
                        backgroundSize:
                            "72px 72px",
                    }}
                />

                {/* HERO */}

                <div className="relative z-10 w-full px-4 pt-8 sm:px-6 lg:px-8">

                    <ProfileHero
                        user={data}
                    />
                </div>

                {/* CONTENT */}

                <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">

                    {/* MAIN GRID */}

                    <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

                        {/* ==================================== */}
                        {/* SIDEBAR */}
                        {/* ==================================== */}

                        <aside className="space-y-5 xl:sticky xl:top-8 xl:h-fit">

                            {/* ANALYTICS */}

                            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">

                                {/* LABEL */}

                                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-700 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">

                                    Profile Analytics
                                </div>

                                {/* TITLE */}

                                <h2 className="mt-4 text-2xl font-black tracking-[-2px] text-slate-950 dark:text-white">

                                    Visibility & Trust
                                </h2>

                                {/* DESC */}

                                <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-zinc-400">

                                    Your visibility is determined by profile completion and account credibility.
                                </p>

                                {/* COMPLETION */}

                                <div className="mt-6 h-full rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                                    <div className="flex items-end justify-between">

                                        <div>

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                                Completion
                                            </p>

                                            <h3 className="mt-2 text-5xl font-black tracking-[-4px] text-slate-950 dark:text-white">

                                                {completion}%
                                            </h3>
                                        </div>

                                        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

                                            Active
                                        </div>
                                    </div>

                                    {/* PROGRESS */}

                                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">

                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500"
                                            style={{
                                                width:
                                                    `${completion}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* ROLE */}

                                <div className="mt-5 h-full rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                        Account Role
                                    </p>

                                    <h3 className="mt-3 text-3xl font-black capitalize tracking-[-2px] text-slate-950 dark:text-white">

                                        {data.role}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-zinc-400">

                                        {
                                            isRecruiter
                                                ? "Recruiter account optimized for candidate sourcing and hiring."
                                                : "Professional candidate profile optimized for recruiter discovery."
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* STATUS */}

                            <ProfileStatus
                                user={data}
                            />
                        </aside>

                        {/* ==================================== */}
                        {/* WORKSPACE */}
                        {/* ==================================== */}

                        <main className="space-y-5">

                            {/* ABOUT */}

                            <ProfileAbout
                                user={data}
                            />

                            {/* JOBSEEKER */}

                            {!isRecruiter && (

                                <>
                                    {/* SKILLS */}

                                    <ProfileSkills
                                        user={data}
                                    />

                                    {/* RESUME */}

                                    <ProfileResume
                                        user={data}
                                    />
                                </>
                            )}

                            {/* RECRUITER */}

                            {isRecruiter && (

                                <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">

                                    {/* LABEL */}

                                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-violet-700 dark:border-violet-500/10 dark:bg-violet-500/10 dark:text-violet-400">

                                        Recruiter Workspace
                                    </div>

                                    {/* TITLE */}

                                    <h2 className="mt-4 text-4xl font-black tracking-[-3px] text-slate-950 dark:text-white">

                                        Hiring Presence
                                    </h2>

                                    {/* DESC */}

                                    <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-500 dark:text-zinc-400">

                                        Build a trusted recruiter identity to improve candidate trust, visibility, and hiring engagement.
                                    </p>

                                    {/* GRID */}

                                    <div className="mt-6 grid gap-5 md:grid-cols-3">

                                        {/* TRUST */}

                                        <div className="h-full rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                                Recruiter Trust
                                            </p>

                                            <h3 className="mt-3 text-4xl font-black tracking-[-3px] text-emerald-500">

                                                Strong
                                            </h3>
                                        </div>

                                        {/* VISIBILITY */}

                                        <div className="h-full rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                                Visibility
                                            </p>

                                            <h3 className="mt-3 text-4xl font-black tracking-[-3px] text-cyan-500">

                                                High
                                            </h3>
                                        </div>

                                        {/* WORKSPACE */}

                                        <div className="h-full rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                                Workspace
                                            </p>

                                            <h3 className="mt-3 text-4xl font-black tracking-[-3px] text-violet-500">

                                                Active
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </AppBackground>
    )
}