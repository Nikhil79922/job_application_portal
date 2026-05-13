"use client"

import Image from "next/image"

import {
    Briefcase,
    Crown,
    Sparkles,
    User2,
    Pencil,
} from "lucide-react"

import {
    Button,
} from "@/components/ui/button"

import type {
    MeUser,
} from "../types/me.types"

interface Props {
    user: MeUser
}

export default function ProfileHero({
    user,
}: Props) {

    const completionItems = [

        !!user.profile_pic,

        !!user.phone_number,

        !!user.skills.length,

        user.role === "recruiter"
            ? true
            : !!user.bio,

        user.role === "recruiter"
            ? true
            : !!user.resume,
    ]

    const completed =
        completionItems.filter(Boolean)
            .length

    const completion =
        Math.round(
            (
                completed /
                completionItems.length
            ) * 100
        )

    return (

        <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111111]/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

            {/* BG */}

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-cyan-500/[0.05]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}

                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">

                    {/* IMAGE */}

                    <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />

                        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-emerald-500/20 bg-slate-100 dark:bg-zinc-900">

                            {user.profile_pic ? (

                                <Image
                                    src={user.profile_pic}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />

                            ) : (

                                <User2 className="h-12 w-12 text-slate-400" />
                            )}
                        </div>
                    </div>

                    {/* DETAILS */}

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

                            <Sparkles className="h-4 w-4" />

                            Talent Forge Profile
                        </div>

                        <h1 className="mt-4 text-4xl font-black tracking-[-2px] text-slate-950 dark:text-white">

                            {user.name}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-3">

                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold capitalize text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">

                                <Briefcase className="h-4 w-4 text-emerald-500" />

                                {user.role}
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">

                                <Crown className="h-4 w-4 text-yellow-500" />

                                {user.subscription || "Free Plan"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}

                <div className="w-full max-w-sm rounded-[30px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">

                                Profile Completion
                            </p>

                            <h2 className="mt-1 text-3xl font-black tracking-[-2px] text-slate-950 dark:text-white">

                                {completion}%
                            </h2>
                        </div>

                        <Button className="h-11 rounded-2xl bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-600">

                            <Pencil className="mr-2 h-4 w-4" />

                            Edit Profile
                        </Button>
                    </div>

                    {/* PROGRESS */}

                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                            style={{
                                width:
                                    `${completion}%`,
                            }}
                        />
                    </div>

                    <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-zinc-400">

                        Complete your profile to increase visibility and improve recruiter engagement.
                    </p>
                </div>
            </div>
        </div>
    )
}