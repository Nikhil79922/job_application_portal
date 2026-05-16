"use client"

import {
  useState,
} from "react"

import {
  BrainCircuit,
  Plus,
  Sparkles,
  Trash2,
  Wrench,
} from "lucide-react"

import {
  toast,
} from "sonner"

import {
  useAuthStore,
} from "@/stores/auth.store"

import {
  useSkill,
} from "../hooks/use-skill"

import type {
  MeUser,
} from "../types/me.types"

import {
  Button,
} from "@/components/ui/button"

interface Props {
  user: MeUser
}

export default function ProfileSkills({
  user: initialUser,
}: Props) {

  const [skillInput,
    setSkillInput] =
    useState("")

  /* LIVE USER */

  const liveUser =
    useAuthStore(
      (state) =>
        state.user
    )

  const user =
    liveUser ||
    initialUser

  const {
    addSkill,
    deleteSkill,
  } = useSkill()

  const isJobseeker =
    user.role ===
    "jobseeker"

  if (!isJobseeker) {
    return null
  }

  const skills =
    user.skills || []

  /* ADD */

  const handleAddSkill =
    () => {

      const trimmed =
        skillInput.trim()

      if (!trimmed) {

        toast.error(
          "Please enter a skill"
        )

        return
      }

      const exists =
        skills.some(
          (skill) =>
            skill.toLowerCase() ===
            trimmed.toLowerCase()
        )

      if (exists) {

        toast.error(
          "Skill already exists"
        )

        return
      }

      addSkill.mutate({
        skillName:
          trimmed,
      })

      setSkillInput("")
    }

  /* ENTER KEY */

  const handleKeyDown = (
    e: React.KeyboardEvent<
      HTMLInputElement
    >
  ) => {

    if (
      e.key === "Enter"
    ) {

      e.preventDefault()

      handleAddSkill()
    }
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">

            Skills & Expertise
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

            Showcase your technical and professional capabilities.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">

          <Sparkles className="h-4 w-4" />

          {skills.length} Skills
        </div>
      </div>

      {/* CARD */}

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90">

        {/* BG */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-transparent" />

        <div className="relative z-10">

          {/* TOP */}

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-600 dark:border-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-400">

              <BrainCircuit className="h-6 w-6" />
            </div>

            <div>

              <h3 className="text-xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                Professional Skills
              </h3>

              <p className="mt-1 text-sm leading-7 text-slate-500 dark:text-zinc-400">

                Add skills that recruiters and AI recommendation systems can recognize instantly.
              </p>
            </div>
          </div>

          {/* ADD */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">

              <input
                type="text"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Type a skill and press Enter"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 pr-12 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-500"
              />

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500">

                <Wrench className="h-4 w-4" />
              </div>
            </div>

            <Button
              onClick={
                handleAddSkill
              }
              disabled={
                addSkill.isPending
              }
              className="h-12 rounded-2xl bg-cyan-500 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:shadow-cyan-500/40 disabled:opacity-50"
            >

              <Plus className="mr-2 h-4 w-4" />

              {
                addSkill.isPending
                  ? "Adding..."
                  : "Add Skill"
              }
            </Button>
          </div>

          {/* SKILLS */}

          <div className="mt-8 flex flex-wrap gap-3">

            {
              skills.length > 0
                ? (

                  skills.map(
                    (skill) => (

                      <div
                        key={skill}
                        className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-500/20 dark:hover:bg-cyan-500/[0.04]"
                      >

                        {/* ICON */}

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                          <Wrench className="h-4 w-4" />
                        </div>

                        {/* TEXT */}

                        <div>

                          <p className="text-sm font-bold tracking-wide text-slate-800 dark:text-zinc-200">

                            {skill}
                          </p>

                          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500">

                            Verified Skill
                          </p>
                        </div>

                        {/* DELETE */}

                        <Button
                          onClick={() =>
                            deleteSkill
                              .mutate({
                                skillName:
                                  skill,
                              })
                          }
                          disabled={
                            deleteSkill
                              .isPending
                          }
                          size="icon"
                          className="ml-1 h-9 w-9 rounded-xl bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white disabled:opacity-50 dark:bg-red-500/10"
                        >

                          <Trash2 className="h-4 w-4 shrink-0" />
                        </Button>
                      </div>
                    )
                  )
                )
                : (

                  <div className="w-full rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center dark:border-white/10 dark:bg-white/[0.03]">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                      <BrainCircuit className="h-7 w-7" />
                    </div>

                    <h4 className="mt-5 text-lg font-black tracking-[-0.5px] text-slate-950 dark:text-white">

                      No Skills Added Yet
                    </h4>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500 dark:text-zinc-400">

                      Add your professional and technical skills to improve recruiter visibility and AI recommendations.
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