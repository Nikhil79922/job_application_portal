"use client"

import {
    BrainCircuit,
    Sparkles,
    Wrench,
} from "lucide-react"

import {
    useAuthStore,
} from "@/stores/auth.store"

import type {
    MeUser,
} from "../types/me.types"

interface Props{
    user:MeUser
}

export default function ProfileSkills({
    user:initialUser,
}:Props){

    /* LIVE USER */

    const liveUser=
        useAuthStore(
            (state)=>state.user
        )

    const user=
        liveUser||
        initialUser

    const isJobseeker=
        user.role===
        "jobseeker"

    if(!isJobseeker){
        return null
    }

    const skills=
        user.skills||
        []

    return(

        <div className="space-y-6">

            {/* HEADER */}

            <div>

                <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                    Skills & Expertise
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                    Showcase your technical and professional capabilities.
                </p>
            </div>

            {/* CARD */}

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">

                {/* BG */}

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-transparent" />

                <div className="relative z-10">

                    {/* TOP */}

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                                <BrainCircuit className="h-6 w-6" />
                            </div>

                            <div>

                                <h3 className="text-xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                                    Professional Skills
                                </h3>

                                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                                    Skills visible to recruiters and AI recommendations.
                                </p>
                            </div>
                        </div>

                        {/* COUNT */}

                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">

                            <Sparkles className="h-4 w-4" />

                            {skills.length} Skills
                        </div>
                    </div>

                    {/* SKILLS */}

                    <div className="mt-8 flex flex-wrap gap-4">

                        {
                            skills.length>0
                                ?(

                                    skills.map((skill)=>(
                                        
                                        <div
                                            key={skill}
                                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
                                        >

                                            {/* HOVER BG */}

                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.08] to-emerald-500/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                            <div className="relative z-10 flex items-center gap-3">

                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                                                    <Wrench className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm font-bold tracking-wide text-slate-800 dark:text-zinc-200">

                                                    {skill}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )
                                :(

                                    <div className="w-full rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">

                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                                            <BrainCircuit className="h-7 w-7" />
                                        </div>

                                        <h4 className="mt-5 text-lg font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                                            No Skills Added Yet
                                        </h4>

                                        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-zinc-400">

                                            Add your professional and technical skills to improve recruiter visibility and AI-based recommendations.
                                        </p>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}