import CustomModal from "@/components/models/custom-modal"
import { Career_Guidance_Models_Props } from "@/types/global/model.types"
import { Sparkles } from "lucide-react"

const CareerRoadmapModal = ({
  open,
  onOpenChange,
  response,
}: Career_Guidance_Models_Props) => {

  if (!response) return null

  return (
    <CustomModal
    open={open}
    onOpenChange={
        onOpenChange
    }
    title="AI Career Roadmap"
    description="
Personalized AI-generated career analysis,
roadmap guidance, role recommendations,
and future skill growth opportunities.
"
  >

    {response && (

      <div className="space-y-10">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[32px] border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.08] via-white to-white p-8 dark:from-emerald-500/[0.08] dark:via-[#111111] dark:to-[#111111]">

          <div className="absolute top-0 right-0 rounded-full h-60 w-60 bg-emerald-500/10 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/[0.08] px-4 py-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">

              <Sparkles className="w-4 h-4" />

              AI Generated Analysis
            </div>

            <h2 className="mt-6 text-5xl font-black tracking-[-2px] text-slate-950 dark:text-white">
              Your Career Roadmap
            </h2>

            <p className="max-w-3xl mt-6 text-lg leading-9 text-slate-600 dark:text-zinc-400">
              {response.summary}
            </p>
          </div>
        </div>

        {/* JOB OPTIONS */}
        <div>

          <h3 className="text-3xl font-black tracking-[-1px] text-slate-950 dark:text-white">
            Recommended Career Roles
          </h3>

          <div className="grid gap-6 mt-6 lg:grid-cols-3">

            {response.jobOptions.map(
              (job, index) => (

                <div
                  key={index}
                  className="group rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-[4px] hover:shadow-[0_25px_80px_rgba(16,185,129,0.10)] dark:border-white/10 dark:bg-[#111111]"
                >

                  <div className="inline-flex rounded-full bg-emerald-500/[0.08] px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">

                    Recommended Role
                  </div>

                  <h4 className="mt-5 text-2xl font-black text-slate-950 dark:text-white">
                    {job.title}
                  </h4>

                  <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-zinc-400">
                    {job.responsibilities}
                  </p>

                  <div className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.05] p-5">

                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                      Why This Role Fits
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-zinc-300">
                      {job.why}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* SKILLS */}
        <div>

          <h3 className="text-3xl font-black tracking-[-1px] text-slate-950 dark:text-white">
            Skills To Learn
          </h3>

          <div className="mt-6 space-y-6">

            {response.skillsToLearn.map(
              (category, index) => (

                <div
                  key={index}
                  className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#111111]"
                >

                  <h4 className="text-2xl font-black text-slate-950 dark:text-white">
                    {category.category}
                  </h4>

                  <div className="grid gap-5 mt-6 lg:grid-cols-2">

                    {category.skills.map(
                      (
                        skill,
                        idx
                      ) => (

                        <div
                          key={idx}
                          className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.03]"
                        >

                          <h5 className="text-xl font-black text-slate-950 dark:text-white">
                            {skill.title}
                          </h5>

                          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-zinc-400">
                            {skill.why}
                          </p>

                          <div className="mt-6 rounded-2xl bg-white p-5 dark:bg-[#111111]">

                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                              How To Learn
                            </p>

                            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-zinc-300">
                              {skill.how}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* LEARNING APPROACH */}
        <div className="rounded-[32px] border border-emerald-500/10 bg-emerald-500/[0.05] p-8">

          <h3 className="text-3xl font-black text-slate-950 dark:text-white">
            {response.learningApproach.title}
          </h3>

          <div className="space-y-5 mt-7">

            {response.learningApproach.points.map(
              (
                point,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-start gap-4"
                >

                  <div className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <p className="text-sm leading-8 text-slate-700 dark:text-zinc-300">
                    {point}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )}
  </CustomModal>
  )
}

export default CareerRoadmapModal