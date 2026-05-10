/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { KeyboardEvent, useState } from "react"
import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Sparkles,
  Upload,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CareerGuidanceResponse } from "../../ai-pages/career-guide/types/ai-career.types"
import { ResumeAnalyserResponse } from "../../ai-pages/resumer-analyser/types/resume-analysis.types"
import ButtonLoader from "@/components/loaders/button-loader"
import aiCareerGuideService from "../../ai-pages/career-guide/services/ai-career.service"
import aiResumeAnalyserService from "../../ai-pages/resumer-analyser/services/resume-analysis.service"
import CareerRoadmapModal from "@/features/ai-pages/career-guide/components/career-roadmap-model"
import ResumeAnalysisModal from "@/features/ai-pages/resumer-analyser/components/resume-analysis-model"
import AppBackground from "@/components/shared/app-background"

const MAX_SKILLS = 10
const MAX_CHARACTERS = 20

const CareerGuide = () => {
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [resumeName, setResumeName] = useState("")
  const [response, setResponse] = useState<CareerGuidanceResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)
  const [resumeResponse, setResumeResponse] = useState<ResumeAnalyserResponse | null>(null)
  const [resumeLoading, setResumeLoading] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [openResumePreview, setOpenResumePreview] = useState(false)

  // ADD SKILL
  const addSkill = () => {
    const trimmedSkill =
      skillInput.trim()
    if (
      !trimmedSkill ||
      skills.includes(trimmedSkill) ||
      skills.length >= MAX_SKILLS
    ) {
      return
    }
    setSkills((prev) => [
      ...prev,
      trimmedSkill,
    ])

    setSkillInput("")
  }

  // REMOVE SKILL
  const removeSkill = (skill: string) => {

    setSkills((prev) =>
      prev.filter((item) => item !== skill)
    )
  }

  // ENTER + SPACE HANDLER
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {

    // ADD ON ENTER
    if (e.key === "Enter") {

      e.preventDefault()

      addSkill()
    }

    // ADD ON SPACE
    if (
      e.key === " " &&
      skillInput.trim().length > 0
    ) {

      e.preventDefault()

      addSkill()
    }

    // REMOVE LAST SKILL
    if (
      e.key === "Backspace" &&
      !skillInput &&
      skills.length
    ) {

      setSkills((prev) =>
        prev.slice(0, -1)
      )
    }
  }

  // GENERATE CAREER GUIDE
  const generateCareerGuide = async () => {
    try {
      if (!skills.length) {
        toast.error("Please add at least one skill")
        return
      }
      setLoading(true)
      const data =
        await aiCareerGuideService.generateCareerGuide(
          skills
        )
      setResponse(data)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.__careerGuideResponse =
        data
      setOpenPreview(true)
      setSkills([])
      // SUCCESS TOAST
      toast.success(
        "Career guide generated successfully",
        {
          id: "career-guide",
        }
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      console.log(error)

      toast.error(
        error?.message ||
        "Something went wrong",
        {
          id: "career-guide",
        }
      )

    } finally {

      setLoading(false)
    }
  }

  const analyseResume =
    async () => {
      try {
        if (!resumeFile) {
          toast.error("Please upload a resume")
          return
        }
        setResumeLoading(true)
        const reader =
          new FileReader()
        reader.readAsDataURL(resumeFile)
        reader.onload =
          async () => {
            try {
              const base64 =
                reader.result as string
              const data =
                await aiResumeAnalyserService.analyseResume(base64)
              setResumeResponse(data)
              setOpenResumePreview(true)
              toast.success("Resume analysed successfully")
            } catch (error: any) {
              toast.error(
                error.message ||
                "Failed to analyse resume"
              )
            } finally {
              setResumeLoading(
                false
              )
            }
          }

      } catch (error: any) {

        setResumeLoading(false)

        toast.error(
          error.message ||
          "Something went wrong"
        )
      }
    }

  return (
    <AppBackground>

      <section className="relative">

        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">

          {/* HERO */}
          <div className="mx-auto max-w-4xl text-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

              <Sparkles className="h-4 w-4" />

              AI Career Intelligence
            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-3px] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">

              Build A Smarter
              <span className="block text-emerald-600">
                Career Journey
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-400">
              Get AI-powered career guidance,
              discover the best opportunities
              based on your skills, and analyze
              your resume to improve your
              chances of landing premium roles.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="mt-20 grid gap-8 lg:grid-cols-2">

            {/* CAREER GUIDANCE */}
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-[4px] hover:shadow-[0_25px_80px_rgba(16,185,129,0.10)] dark:border-white/10 dark:bg-[#111111]">

              <div>

                {/* ICON */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">

                  <BrainCircuit className="h-8 w-8" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-8">

                  <h2 className="text-3xl font-black tracking-[-1px] text-slate-950 dark:text-white">
                    AI Career Guidance
                  </h2>

                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-400">
                    Add your skills to receive
                    AI-powered career guidance,
                    roadmap suggestions, and
                    industry recommendations.
                  </p>
                </div>

                {/* FORM */}
                <div className="relative mt-8">

                  <label className="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
                    Add Skills
                  </label>

                  {/* INPUT CONTAINER */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 focus-within:border-emerald-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-100 dark:border-white/10 dark:bg-zinc-900 dark:focus-within:border-emerald-500/20 dark:focus-within:bg-[#111111] dark:focus-within:ring-emerald-500/10">

                    {/* SKILLS */}
                    <div className="flex max-h-[120px] flex-wrap gap-2 overflow-y-auto">

                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="group flex h-9 items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.08] px-4 text-sm font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-500/[0.14] dark:text-emerald-400"
                        >

                          <span className="max-w-[120px] truncate">
                            {skill}
                          </span>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeSkill(skill)
                            }
                            className="h-5 w-5 rounded-full p-0 transition-all duration-300 hover:scale-110 hover:bg-transparent"
                          >

                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}

                      {/* INPUT */}
                      {skills.length <
                        MAX_SKILLS && (
                          <input
                            value={skillInput}
                            onChange={(e) => {

                              if (
                                e.target.value
                                  .length <=
                                MAX_CHARACTERS
                              ) {
                                setSkillInput(
                                  e.target.value
                                )
                              }
                            }}
                            onKeyDown={
                              handleKeyDown
                            }
                            placeholder={
                              skills.length
                                ? "Add more..."
                                : "React, Node.js, AWS..."
                            }
                            className="h-9 flex-1 bg-transparent px-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
                          />
                        )}
                    </div>
                  </div>

                  {/* META */}
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                    {/* TOP */}
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          Input Guidelines
                        </p>

                        <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-zinc-500">
                          Press Space or Enter to add skills.
                          Keep skills concise and
                          relevant for better AI
                          recommendations.
                        </p>
                      </div>

                      {/* COUNT */}
                      <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.08] px-3 py-2 text-center">

                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {skills.length}/
                          {MAX_SKILLS}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-emerald-500/70">
                          Skills
                        </p>
                      </div>
                    </div>

                    {/* LIMITS */}
                    <div className="mt-4 grid grid-cols-2 gap-3">

                      {/* CHARACTER LIMIT */}
                      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#111111]">

                        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
                          Skill Length
                        </p>

                        <div className="mt-2 flex items-end gap-1">

                          <span className="text-lg font-black text-slate-900 dark:text-white">
                            {
                              skillInput.length
                            }
                          </span>

                          <span className="pb-[2px] text-xs text-slate-400 dark:text-zinc-600">
                            /{" "}
                            {
                              MAX_CHARACTERS
                            }
                          </span>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#111111]">

                        <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">
                          Status
                        </p>

                        <div className="mt-2">

                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            Ready For AI
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <Button
                onClick={
                  generateCareerGuide
                }
                disabled={
                  loading || !skills.length
                }
                className="group mt-8 h-14 w-full cursor-pointer rounded-2xl bg-emerald-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-emerald-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  <ButtonLoader text="Generating..." />
                ) : (
                  <>
                    Generate Career Guide

                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-500 group-hover:translate-x-[3px]" />
                  </>
                )}
              </Button>
            </div>

            {/* RESUME ANALYSER */}
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-[4px] hover:shadow-[0_25px_80px_rgba(16,185,129,0.10)] dark:border-white/10 dark:bg-[#111111]">

              <div>

                {/* ICON */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">

                  <FileSearch className="h-8 w-8" />
                </div>

                {/* CONTENT */}
                <div className="relative mt-8">

                  <h2 className="text-3xl font-black tracking-[-1px] text-slate-950 dark:text-white">
                    Resume Analyzer
                  </h2>

                  <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-400">
                    Upload your resume and get
                    detailed AI feedback including
                    ATS optimization, skill gaps,
                    keyword recommendations,
                    formatting insights, and
                    improvement tips.
                  </p>
                </div>

                {/* UPLOAD AREA */}
                <div className="relative mt-8">

                  <label className="mb-3 block text-sm font-semibold text-slate-900 dark:text-white">
                    Upload Resume
                  </label>

                  <div className="relative flex min-h-[278px] cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-slate-300 bg-slate-50 transition-all duration-500 hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/5">

                    <input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={(e) => {

                        const file =
                          e.target.files?.[0]

                        if (!file) {
                          return
                        }

                        if (file.type !== "application/pdf") {
                          toast.error("Only PDF files are allowed")

                          return
                        }

                        const maxSize =
                          5 * 1024 * 1024

                        if (file.size > maxSize) {
                          toast.error("Maximum file size is 5MB")
                          return
                        }

                        setResumeName(file.name)

                        setResumeFile(file)

                        toast.success(
                          "Resume uploaded successfully"
                        )
                      }}
                    />

                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-sm dark:bg-[#111111]">

                      <Upload className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-950 dark:text-white">
                      Upload PDF Resume
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
                      Drag & drop or browse files
                    </p>

                    {resumeName && (
                      <div className="mt-5 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">

                        {resumeName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <Button
                onClick={analyseResume}
                disabled={
                  resumeLoading ||
                  !resumeFile
                }
                className="group mt-8 h-14 w-full cursor-pointer rounded-2xl bg-emerald-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-emerald-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {resumeLoading ? (
                  <ButtonLoader text="Analysing..." />
                ) : (
                  <>
                    Analyze Resume

                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-500 group-hover:translate-x-[3px]" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* MODALS */}
        <CareerRoadmapModal
          open={openPreview}
          onOpenChange={
            setOpenPreview
          }
          response={response}
        />

        <ResumeAnalysisModal
          open={openResumePreview}
          onOpenChange={
            setOpenResumePreview
          }
          response={resumeResponse}
        />

      </section>

    </AppBackground>
  )
}

export default CareerGuide