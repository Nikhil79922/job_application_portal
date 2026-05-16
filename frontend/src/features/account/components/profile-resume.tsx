"use client"

import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Download,
    FileText,
    ShieldCheck,
    UploadCloud,
    XCircle,
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

export default function ProfileResume({
    user,
}: Props) {

    const isJobseeker =
        user.role ===
        "jobseeker"

    if (!isJobseeker) {
        return null
    }

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
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />,

                    badge:
                        "Verified",

                    badgeClass:
                        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400",

                    glow:
                        "from-emerald-500/[0.05]",
                }

            case "pending":
                return {
                    icon:
                        <Clock3 className="h-4 w-4 text-yellow-500" />,

                    badge:
                        "Pending",

                    badgeClass:
                        "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400",

                    glow:
                        "from-yellow-500/[0.05]",
                }

            case "fail":
                return {
                    icon:
                        <XCircle className="h-4 w-4 text-red-500" />,

                    badge:
                        "Rejected",

                    badgeClass:
                        "border-red-200 bg-red-50 text-red-700 dark:border-red-500/10 dark:bg-red-500/10 dark:text-red-400",

                    glow:
                        "from-red-500/[0.05]",
                }
        }
    }

    const status =
        getStatusConfig(
            user.resume_upload_status
        )

    const shouldShowUploadCTA =
        user.resume_upload_status ===
        "pending" ||

        user.resume_upload_status ===
        "fail"

    return (

        <div className="space-y-5">

            {/* HEADER */}

            <div>

                <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                    Resume Management
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                    Upload, verify, and manage your professional resume.
                </p>
            </div>

            {/* CARD */}

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90 sm:p-6">

                {/* BG */}

                <div className={`absolute inset-0 bg-gradient-to-br ${status.glow} via-transparent to-transparent`} />

                <div className="relative z-10">

                    {/* TOP SECTION */}

                    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

                        {/* LEFT */}

                        <div className="flex items-start gap-4 min-w-0">

                            {/* ICON */}

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                                <FileText className="h-6 w-6" />
                            </div>

                            {/* CONTENT */}

                            <div className="min-w-0 flex-1">

                                {/* TITLE */}

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                                    <h3 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                                        Professional Resume
                                    </h3>

                                    <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${status.badgeClass}`}>

                                        {status.icon}

                                        {status.badge}
                                    </div>
                                </div>

                                {/* DESCRIPTION */}

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-zinc-400">

                                    Your resume is used for recruiter visibility, AI analysis, and intelligent job recommendations.
                                </p>
                            </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row xl:flex-col">

                            {/* VIEW */}

                            {user.resume && (

                                <a
                                    href={user.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto"
                                >

                                    <Button className="h-12 w-full rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">

                                        <Download className="mr-2 h-4 w-4" />

                                        View Resume
                                    </Button>
                                </a>
                            )}

                            {/* UPLOAD */}

                            <Button className="h-12 w-full rounded-2xl bg-violet-500 px-5 text-sm font-semibold text-white hover:bg-violet-600 sm:w-auto">

                                <UploadCloud className="mr-2 h-4 w-4" />

                                {
                                    user.resume
                                        ? "Replace Resume"
                                        : "Upload Resume"
                                }
                            </Button>
                        </div>
                    </div>

                    {/* ALERT */}

                    {shouldShowUploadCTA && (

                        <div className="mt-6 rounded-[24px] border border-yellow-200 bg-yellow-50/80 p-5 dark:border-yellow-500/10 dark:bg-yellow-500/10">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">

                                    <AlertTriangle className="h-5 w-5" />
                                </div>

                                <div>

                                    <h4 className="text-base font-black tracking-[-0.5px] text-yellow-900 dark:text-yellow-300">

                                        Resume Attention Required
                                    </h4>

                                    <p className="mt-2 text-sm leading-7 text-yellow-700 dark:text-yellow-200/80">

                                        Your resume is either pending verification or failed validation. Upload an updated professional resume to improve profile approval and recruiter engagement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INFO GRID */}

                    <div className="mt-6 grid gap-4 md:grid-cols-2">

                        {/* STATUS */}

                        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                        Verification Status
                                    </p>

                                    <p className="mt-1 text-sm font-semibold capitalize text-slate-950 dark:text-white">

                                        {user.resume_upload_status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* TYPE */}

                        <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                                    <FileText className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-500">

                                        Resume Type
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">

                                        ATS Optimized Resume
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EMPTY */}

                    {!user.resume && (

                        <div className="mt-6 rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center dark:border-white/10 dark:bg-white/[0.03] sm:p-10">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                                <FileText className="h-7 w-7" />
                            </div>

                            <h4 className="mt-5 text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                                No Resume Uploaded
                            </h4>

                            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-zinc-400">

                                Upload a professional ATS-friendly resume to unlock AI-powered job matching and recruiter visibility.
                            </p>

                            <Button className="mt-6 h-12 rounded-2xl bg-violet-500 px-6 text-sm font-semibold text-white hover:bg-violet-600">

                                <UploadCloud className="mr-2 h-4 w-4" />

                                Upload Resume
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}