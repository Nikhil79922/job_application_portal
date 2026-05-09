import CustomModal from "@/components/models/custom-modal"
import { Resume_Analyser_Models_Props } from "@/types/global/model.types"

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
  >

    {response && (

      <div className="space-y-8">

        {/* SCORE */}

        <div className="rounded-[32px] border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.08] via-white to-white p-8 dark:from-emerald-500/[0.08] dark:via-[#111111] dark:to-[#111111]">

          <div className="flex items-center justify-between gap-6">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                ATS Compatibility Score
              </p>

              <h2 className="mt-4 text-7xl font-black tracking-[-4px] text-slate-950 dark:text-white">
                {response.atsScore}
                <span className="text-3xl">
                  /100
                </span>
              </h2>
            </div>

            <div className="flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-emerald-500/20 text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {response.atsScore}%
            </div>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-600 dark:text-zinc-400">
            {response.summary}
          </p>
        </div>

        {/* BREAKDOWN */}

        <div className="grid gap-5 lg:grid-cols-2">

          {Object.entries(
            response.scoreBreakdown
          ).map(
            ([key, value]) => (

              <div
                key={key}
                className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111111]"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-black capitalize text-slate-950 dark:text-white">
                    {key}
                  </h3>

                  <div className="rounded-full bg-emerald-500/[0.08] px-4 py-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {value.score}/100
                  </div>
                </div>

                <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-zinc-400">
                  {value.feedback}
                </p>
              </div>
            )
          )}
        </div>

        {/* STRENGTHS */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#111111]">

          <h3 className="text-2xl font-black text-slate-950 dark:text-white">
            Resume Strengths
          </h3>

          <div className="mt-6 space-y-4">

            {response.strengths.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-start gap-4"
                >

                  <div className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <p className="text-sm leading-8 text-slate-700 dark:text-zinc-300">
                    {item}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* SUGGESTIONS */}

        <div className="space-y-5">

          <h3 className="text-3xl font-black tracking-[-1px] text-slate-950 dark:text-white">
            Improvement Suggestions
          </h3>

          {response.suggestions.map(
            (
              suggestion,
              index
            ) => (

              <div
                key={index}
                className="rounded-[30px] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-[#111111]"
              >

                <div className="flex items-center justify-between gap-4">

                  <h4 className="text-xl font-black text-slate-950 dark:text-white">
                    {suggestion.category}
                  </h4>

                  <div className="rounded-full bg-red-500/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-red-500">
                    {suggestion.priority}
                  </div>
                </div>

                <div className="mt-5">

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Issue
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-zinc-400">
                    {suggestion.issue}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.05] p-5">

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                    Recommendation
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-zinc-300">
                    {suggestion.recommendation}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )}
  </CustomModal>
  )
}

export default ResumeAnalysisModal