/* eslint-disable @typescript-eslint/ban-ts-comment */
import CustomModal from "@/components/models/custom-model"

import {
  Resume_Analyser_Models_Props,
} from "@/types/global/model.types"

const ResumeAnalysisModal = ({
  open,
  onOpenChange,
  response,
}: Resume_Analyser_Models_Props) => {

  if (!response) return null

  return (
    <CustomModal
      open={open}
      onOpenChange={
        onOpenChange
      }
      title="ATS Resume Analysis"
      description="
AI-powered ATS compatibility analysis,
keyword optimization insights,
resume improvements,
and recruiter-readiness evaluation.
"
      showDownload
      onDownload={() => {

        window.__resumeAnalysisResponse =
          response
      }}
    >

      <div className="space-y-8">

        {/* HERO */}

        <div className="overflow-hidden rounded-[34px] border border-indigo-500/10 bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.03] to-white dark:from-indigo-500/[0.08] dark:via-violet-500/[0.03] dark:to-[#111111]">

          <div className="p-8">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}

              <div>

                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/10 bg-indigo-500/[0.08] px-4 py-2">

                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-500" />

                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">

                    {response.atsScore >= 80
                      ? "Excellent ATS Compatibility"
                      : response.atsScore >= 60
                      ? "Moderate ATS Compatibility"
                      : "Needs Resume Improvements"}

                  </span>
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                  ATS Compatibility Score
                </p>

                <h2 className="mt-5 bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-8xl font-black tracking-[-5px] text-transparent">

                  {response.atsScore}

                  <span className="ml-1 text-3xl font-bold text-slate-400 dark:text-zinc-500">
                    /100
                  </span>
                </h2>

                <p className="max-w-2xl mt-6 text-base leading-8 text-slate-600 dark:text-zinc-400">
                  {response.summary}
                </p>
              </div>

              {/* SCORE CIRCLE */}

              <div className="relative flex h-44 w-44 items-center justify-center self-center rounded-full border-[14px] border-indigo-500/10">

                <div className="absolute inset-0 rounded-full bg-violet-500/[0.06] blur-2xl" />

                <div className="text-center">

                  <h3 className="bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-5xl font-black tracking-[-2px] text-transparent">
                    {response.atsScore}%
                  </h3>

                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                    ATS SCORE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BREAKDOWN */}

        <div className="grid gap-5 lg:grid-cols-2">

          {Object.entries(
            response.scoreBreakdown
          ).map(
            ([key, value]) => {

              const score =
                value.score

              const scoreColor =
                score >= 80
                  ? "emerald"
                  : score >= 60
                  ? "amber"
                  : "rose"

              return (

                <div
                  key={key}
                  className="
                    group

                    overflow-hidden
                    rounded-[30px]

                    border
                    border-slate-200/80

                    bg-gradient-to-br
                    from-white
                    to-slate-50

                    shadow-sm

                    transition-all
                    duration-500

                    hover:-translate-y-[2px]
                    hover:shadow-xl

                    dark:border-white/10
                    dark:from-[#111111]
                    dark:to-[#0D0D0D]
                  "
                >

                  <div className="p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500">
                          ATS Metric
                        </p>

                        <h3 className="mt-3 text-2xl font-black capitalize text-slate-950 dark:text-white">
                          {key}
                        </h3>
                      </div>

                      <div
                        className={`
                          rounded-2xl
                          px-4
                          py-2
                          text-sm
                          font-black

                          ${
                            scoreColor ===
                            "emerald"
                              ? "bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400"
                              : scoreColor ===
                                "amber"
                              ? "bg-amber-500/[0.08] text-amber-600 dark:text-amber-400"
                              : "bg-rose-500/[0.08] text-rose-500"
                          }
                        `}
                      >
                        {score}/100
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-zinc-400">
                      {value.feedback}
                    </p>
                  </div>

                  {/* PROGRESS */}

                  <div className="px-6 pb-6">

                    <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">

                      <div
                        style={{
                          width: `${score}%`,
                        }}
                        className={`
                          h-full
                          rounded-full
                          transition-all
                          duration-700

                          ${
                            scoreColor ===
                            "emerald"
                              ? "bg-emerald-500"
                              : scoreColor ===
                                "amber"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }
                        `}
                      />
                    </div>
                  </div>
                </div>
              )
            }
          )}
        </div>

        {/* STRENGTHS */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#111111]">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
                Resume Analysis
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-1px] text-slate-950 dark:text-white">
                Resume Strengths
              </h3>
            </div>

            <div className="rounded-2xl bg-indigo-500/[0.08] px-4 py-3 text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {response.strengths.length} Strengths
            </div>
          </div>

          <div className="grid gap-5 mt-8">

            {response.strengths.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.04] p-5"
                >

                  <div className="flex items-center justify-center w-6 h-6 mt-1 text-xs font-black text-white rounded-full bg-gradient-to-br from-indigo-500 to-violet-500">
                    ✓
                  </div>

                  <p className="flex-1 text-sm leading-8 text-slate-700 dark:text-zinc-300">
                    {item}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* SUGGESTIONS */}

        <div className="space-y-5">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-500">
              AI Improvements
            </p>

            <h3 className="mt-3 text-4xl font-black tracking-[-2px] text-slate-950 dark:text-white">
              Improvement Suggestions
            </h3>
          </div>

          {response.suggestions.map(
            (
              suggestion,
              index
            ) => {

              const priorityStyle =
                suggestion.priority ===
                "high"
                  ? {
                      border:
                        "border-rose-500/20",
                      bg:
                        "bg-rose-500/[0.04]",
                      badge:
                        "bg-rose-500/[0.08] text-rose-500",
                    }
                  : suggestion.priority ===
                    "medium"
                  ? {
                      border:
                        "border-amber-500/20",
                      bg:
                        "bg-amber-500/[0.04]",
                      badge:
                        "bg-amber-500/[0.08] text-amber-600 dark:text-amber-400",
                    }
                  : {
                      border:
                        "border-sky-500/20",
                      bg:
                        "bg-sky-500/[0.04]",
                      badge:
                        "bg-sky-500/[0.08] text-sky-600 dark:text-sky-400",
                    }

              return (

                <div
                  key={index}
                  className={`
                    rounded-[30px]
                    border

                    ${priorityStyle.border}
                    ${priorityStyle.bg}

                    p-7

                    backdrop-blur-sm
                  `}
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <h4 className="text-2xl font-black text-slate-950 dark:text-white">
                          {suggestion.category}
                        </h4>

                        <div
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.1em]

                            ${priorityStyle.badge}
                          `}
                        >
                          {suggestion.priority}
                        </div>
                      </div>

                      <div className="mt-6">

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500">
                          Detected Issue
                        </p>

                        <p className="mt-3 text-sm leading-8 text-slate-700 dark:text-zinc-300">
                          {suggestion.issue}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]">

                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
                      AI Recommendation
                    </p>

                    <p className="mt-4 text-sm leading-8 text-slate-700 dark:text-zinc-300">
                      {suggestion.recommendation}
                    </p>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </CustomModal>
  )
}

export default ResumeAnalysisModal