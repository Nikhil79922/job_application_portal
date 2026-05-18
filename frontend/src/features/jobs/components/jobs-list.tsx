// src/features/jobs/components/jobs-list.tsx

"use client"

import JobCard from "./job-card"

import {
  useActiveJobs,
} from "../hooks/use-active-jobs"
import AppBackground from "@/components/shared/app-background"

export default function JobsList() {

  const {
    data,
    isLoading,
    isError,
  } = useActiveJobs()

  /* LOADING */

  if (isLoading) {

    return (

      <section
        className="
          min-h-[90vh]
        "
      >

        <div
          className="
            grid gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {
            Array.from({
              length: 6,
            }).map((_, index) => (

              <div
                key={index}
                className="
                  h-[420px] animate-pulse
                  rounded-[30px]
                  border border-slate-200
                  bg-slate-100
                  dark:border-white/10
                  dark:bg-white/[0.03]
                "
              />
            ))
          }
        </div>
      </section>
    )
  }

  /* ERROR */

  if (isError) {

    return (

      <section
        className="
          flex min-h-[90vh]
          items-center justify-center
        "
      >

        <div
          className="
            w-full rounded-[30px]
            border border-red-500/20
            bg-red-500/10
            p-10 text-center
          "
        >

          <p
            className="
              text-sm font-semibold
              text-red-500
            "
          >
            Failed to load active jobs
          </p>
        </div>
      </section>
    )
  }

  /* EMPTY */

  if (!data?.length) {

    return (

      <section
        className="
          flex min-h-[90vh]
          items-center justify-center
        "
      >

        <div
          className="
            w-full rounded-[30px]
            border border-dashed
            border-slate-300
            py-20 text-center
            dark:border-white/10
          "
        >

          <p
            className="
              text-sm text-slate-500
              dark:text-zinc-500
            "
          >
            No active jobs available
          </p>
        </div>
      </section>
    )
  }

  /* SUCCESS */

  return (

    <section
      className="
        min-h-[90vh]
      "
    >

      <div
        className="
          grid gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {
          data.map((job) => (

            <JobCard
              key={job.job_id}
              job={job}
            />
          ))
        }
      </div>
    </section>
  )
}