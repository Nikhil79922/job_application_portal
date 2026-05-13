"use client"

import {
    CheckCircle2,
    Clock3,
    Crown,
    ShieldCheck,
    Sparkles,
    UserCircle2,
    XCircle,
    FileText,
} from "lucide-react"

import type {
    MeUser,
} from "../types/me.types"

interface Props {
    user: MeUser
}

export default function ProfileStatus({
    user,
}: Props) {

    const getStatusConfig = (
        status:
            | "pending"
            | "success"
            | "fail"
    ) => {

        switch (status) {

            case "success":
                return {
                    icon:
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />,

                    badge:
                        "Success",

                    badgeClass:
                        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400",
                }

            case "pending":
                return {
                    icon:
                        <Clock3 className="h-5 w-5 text-yellow-500" />,

                    badge:
                        "Pending",

                    badgeClass:
                        "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400",
                }

            case "fail":
                return {
                    icon:
                        <XCircle className="h-5 w-5 text-red-500" />,

                    badge:
                        "Failed",

                    badgeClass:
                        "border-red-200 bg-red-50 text-red-700 dark:border-red-500/10 dark:bg-red-500/10 dark:text-red-400",
                }
        }
    }

    const profileStatus =
        getStatusConfig(
            user.profile_pic_upload_status
        )

    const resumeStatus =
        getStatusConfig(
            user.resume_upload_status
        )

    const isJobseeker =
        user.role ===
        "jobseeker"

    return (

        <div className="space-y-6">

            {/* HEADER */}

            <div>

                <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                    Account Status
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                    Monitor your verification and profile health status.
                </p>
            </div>

            {/* STATUS GRID */}

            <div className="space-y-5">

                {/* PROFILE PIC */}

                <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111]/90">

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent" />

                    <div className="relative z-10 flex items-center justify-between gap-4">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                                <UserCircle2 className="h-6 w-6" />
                            </div>

                            <div>

                                <h3 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                                    Profile Picture
                                </h3>

                                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">

                                    Avatar upload and approval status.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">

                            {profileStatus.icon}

                            <div className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${profileStatus.badgeClass}`}>

                                {profileStatus.badge}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESUME */}

                {isJobseeker && (

                    <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111]/90">

                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] via-transparent to-transparent" />

                        <div className="relative z-10 flex items-center justify-between gap-4">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                                    <FileText className="h-6 w-6" />
                                </div>

                                <div>

                                    <h3 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                                        Resume Verification
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">

                                        Resume upload and processing status.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">

                                {resumeStatus.icon}

                                <div className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${resumeStatus.badgeClass}`}>

                                    {resumeStatus.badge}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SUBSCRIPTION */}

                <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111]/90">

                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/[0.05] via-transparent to-transparent" />

                    <div className="relative z-10 flex items-center justify-between gap-4">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">

                                <Crown className="h-6 w-6" />
                            </div>

                            <div>

                                <h3 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                                    Subscription Plan
                                </h3>

                                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">

                                    Current account membership and benefits.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">

                            {user.subscription || "Free"}
                        </div>
                    </div>
                </div>

                {/* ACCOUNT */}

                <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111]/90">

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-transparent" />

                    <div className="relative z-10 flex items-center justify-between gap-4">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                                <ShieldCheck className="h-6 w-6" />
                            </div>

                            <div>

                                <h3 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                                    Account Type
                                </h3>

                                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">

                                    Your current platform role and permissions.
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-cyan-700 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">

                            <Sparkles className="h-3.5 w-3.5" />

                            {user.role}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}