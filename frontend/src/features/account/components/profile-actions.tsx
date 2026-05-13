"use client"

import {
    Camera,
    FileText,
    Pencil,
    UploadCloud,
    AlertTriangle,
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

export default function ProfileActions({
    user,
}: Props) {

    const isJobseeker =
        user.role ===
        "jobseeker"

    const shouldShowProfileUpload =
        user.profile_pic_upload_status ===
        "pending" ||

        user.profile_pic_upload_status ===
        "fail"

    const shouldShowResumeUpload =
        isJobseeker &&
        (
            user.resume_upload_status ===
            "pending" ||

            user.resume_upload_status ===
            "fail"
        )

    return (

        <div className="space-y-6">

            {/* TITLE */}

            <div>

                <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                    Action Center
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                    Manage and complete your profile information.
                </p>
            </div>

            {/* ACTION GRID */}

            <div className="grid gap-5">

                {/* EDIT PROFILE */}

                <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-[#111111]/90">

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex items-start justify-between gap-4">

                        <div className="flex gap-4">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                                <Pencil className="h-6 w-6" />
                            </div>

                            <div>

                                <h3 className="text-lg font-black tracking-[-1px] text-slate-950 dark:text-white">

                                    Edit Profile
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-zinc-400">

                                    Update your personal details, skills, and professional information.
                                </p>
                            </div>
                        </div>

                        <Button className="h-11 rounded-2xl bg-cyan-500 px-5 text-sm font-semibold text-white hover:bg-cyan-600">

                            Update
                        </Button>
                    </div>
                </div>

                {/* PROFILE IMAGE */}

                <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-[#111111]/90">

                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex items-start justify-between gap-4">

                        <div className="flex gap-4">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                                <Camera className="h-6 w-6" />
                            </div>

                            <div>

                                <div className="flex flex-wrap items-center gap-2">

                                    <h3 className="text-lg font-black tracking-[-1px] text-slate-950 dark:text-white">

                                        Profile Picture
                                    </h3>

                                    {shouldShowProfileUpload && (

                                        <div className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">

                                            <AlertTriangle className="h-3 w-3" />

                                            Action Required
                                        </div>
                                    )}
                                </div>

                                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-zinc-400">

                                    Upload a professional avatar to improve profile trust and visibility.
                                </p>
                            </div>
                        </div>

                        <Button className="h-11 rounded-2xl bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-600">

                            <UploadCloud className="mr-2 h-4 w-4" />

                            {
                                user.profile_pic
                                    ? "Change"
                                    : "Upload"
                            }
                        </Button>
                    </div>
                </div>

                {/* RESUME */}

                {isJobseeker && (

                    <div className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-[#111111]/90">

                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative z-10 flex items-start justify-between gap-4">

                            <div className="flex gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                                    <FileText className="h-6 w-6" />
                                </div>

                                <div>

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h3 className="text-lg font-black tracking-[-1px] text-slate-950 dark:text-white">

                                            Resume Management
                                        </h3>

                                        {shouldShowResumeUpload && (

                                            <div className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">

                                                <AlertTriangle className="h-3 w-3" />

                                                Action Required
                                            </div>
                                        )}
                                    </div>

                                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-zinc-400">

                                        Upload or replace your latest resume for recruiters and AI matching systems.
                                    </p>
                                </div>
                            </div>

                            <Button className="h-11 rounded-2xl bg-violet-500 px-5 text-sm font-semibold text-white hover:bg-violet-600">

                                <UploadCloud className="mr-2 h-4 w-4" />

                                {
                                    user.resume
                                        ? "Replace"
                                        : "Upload"
                                }
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}