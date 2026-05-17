/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import {
  BrainCircuit,
  Plus,
  Sparkles,
  Trash2,
  ShieldCheck,
  Zap,
  Hash,
} from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { SkillsToUserDTO, SkillsToUserSchema } from "../schemas/skill.schema"
import { useAuthStore } from "@/stores/auth.store"
import { useSkill } from "../hooks/use-skill"
import type { MeUser } from "../types/me.types"
import { Button } from "@/components/ui/button"

interface Props {
  user: MeUser
}

// Colour cycle for skill pill accents — keeps them visually distinct
const SKILL_COLORS = [
  {
    ring: "border-emerald-200 dark:border-emerald-500/20",
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    hover: "hover:border-emerald-400/60 hover:shadow-[0_12px_36px_rgba(16,185,129,0.12)]",
    dot: "bg-emerald-500",
  },
  {
    ring: "border-cyan-200 dark:border-cyan-500/20",
    icon: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    hover: "hover:border-cyan-400/60 hover:shadow-[0_12px_36px_rgba(6,182,212,0.12)]",
    dot: "bg-cyan-500",
  },
  {
    ring: "border-violet-200 dark:border-violet-500/20",
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    hover: "hover:border-violet-400/60 hover:shadow-[0_12px_36px_rgba(139,92,246,0.12)]",
    dot: "bg-violet-500",
  },
  {
    ring: "border-yellow-200 dark:border-yellow-500/20",
    icon: "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
    hover: "hover:border-yellow-400/60 hover:shadow-[0_12px_36px_rgba(234,179,8,0.10)]",
    dot: "bg-yellow-400",
  },
  {
    ring: "border-rose-200 dark:border-rose-500/20",
    icon: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    hover: "hover:border-rose-400/60 hover:shadow-[0_12px_36px_rgba(244,63,94,0.10)]",
    dot: "bg-rose-500",
  },
]

export default function ProfileSkills({ user: initialUser }: Props) {
  const liveUser = useAuthStore((state) => state.user)
  const user     = liveUser ?? initialUser

  const { addSkill, deleteSkill } = useSkill()

  if (user.role !== "jobseeker") return null

  const skills = user.skills ?? []

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillsToUserDTO>({
    resolver: zodResolver(SkillsToUserSchema),
    defaultValues: { skillName: "" },
  })

  const onSubmit = (data: SkillsToUserDTO) => {
    const normalized = data.skillName.trim()
    const exists = skills.some(
      (s) => s.toLowerCase() === normalized.toLowerCase(),
    )
    if (exists) { toast.error("Skill already added"); return }
    addSkill.mutate({ skillName: normalized })
    reset()
  }

  return (
    <div className="space-y-6">

      {/* ── Section header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-700 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Profile
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">
            Skills &amp; Expertise
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Showcase your strongest skills to improve recruiter visibility and AI job matching.
          </p>
        </div>

        {/* Skills count badge */}
        <div className="flex shrink-0 items-center gap-3 rounded-[22px] border border-slate-200 bg-white px-5 py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#111111]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Total Skills
            </p>
            <p className="mt-0.5 text-2xl font-black leading-none tracking-[-1.5px] text-slate-950 dark:text-white">
              {skills.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main card ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#111111]">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-500/5" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-violet-500/8 blur-3xl dark:bg-violet-500/5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-violet-500/[0.03]" />

        <div className="relative z-10 p-6 lg:p-7">

          {/* Card top */}
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-cyan-500/20 to-violet-500/10 text-cyan-600 dark:text-cyan-400">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">
                Professional Skills
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-7 text-slate-500 dark:text-zinc-400">
                Skills are used for recruiter matching, AI recommendations, and profile scoring.
                Add skills one at a time or press Enter.
              </p>
            </div>
          </div>

          {/* ── Add skill form ──────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Input */}
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500">
                    <Hash className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, Product Design…"
                    {...register("skillName")}
                    className="h-13 w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-10 pr-12 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:font-normal placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-cyan-500/60 dark:focus:ring-cyan-500/10"
                  />
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-zinc-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={addSkill.isPending}
                  className="group relative flex h-13 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(6,182,212,0.25)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(6,182,212,0.35)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                >
                  {/* Shimmer */}
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-[200%]" />
                  <Plus className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">
                    {addSkill.isPending ? "Adding…" : "Add Skill"}
                  </span>
                </Button>
              </div>

              {errors.skillName && (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {errors.skillName.message}
                </p>
              )}

              <p className="mt-3 text-[11px] text-slate-400 dark:text-zinc-600">
                Press <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">Enter</kbd> to add instantly
              </p>
            </div>
          </form>

          {/* ── Skills grid ────────────────────────────────────────────────── */}
          <div className="mt-7">
            <AnimatePresence mode="popLayout">
              {skills.length > 0 ? (
                <motion.div
                  className="flex flex-wrap gap-3"
                  layout
                >
                  {skills.map((skill, index) => {
                    const color = SKILL_COLORS[index % SKILL_COLORS.length]
                    return (
                      <motion.div
                        key={skill}
                        layout
                        initial={{ opacity: 0, scale: 0.85, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -4 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 28,
                          delay: index * 0.025,
                        }}
                        className={`
                          group relative flex items-center gap-3 overflow-hidden rounded-[18px] border bg-white py-3 pl-4 pr-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5
                          dark:bg-white/[0.04]
                          ${color.ring} ${color.hover}
                        `}
                      >
                        {/* Icon */}
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${color.icon} transition-transform duration-200 group-hover:scale-110`}>
                          <Zap className="h-4 w-4" />
                        </div>

                        {/* Label */}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black tracking-[-0.3px] text-slate-900 dark:text-white">
                            {skill}
                          </p>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => deleteSkill.mutate({ skillName: skill })}
                          disabled={deleteSkill.isPending}
                          className="ml-1 cursor-pointer flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-transparent text-slate-300 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-40 dark:text-zinc-600 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                          title={`Remove ${skill}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-[26px] border border-dashed border-slate-300 bg-slate-50/70 p-12 text-center dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-500 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                  <h4 className="mt-5 text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">
                    No Skills Added Yet
                  </h4>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500 dark:text-zinc-400">
                    Add your strongest professional and technical skills to improve profile quality, recruiter visibility, and AI recommendations.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom meta row — only when skills exist */}
          {skills.length > 0 && (
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/[0.06]">
              <p className="text-[11px] text-slate-400 dark:text-zinc-600">
                {skills.length} skill{skills.length !== 1 ? "s" : ""} · actively used for job matching
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Profile Active
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}