// src/features/jobs/components/job-card.tsx

"use client"

import { useRouter } from "next/navigation"

import {
  ArrowRight,
  MapPin,
  MoreHorizontal,
  Pencil,
  Users,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/models/dropdown-menu"

import type {
  CompanyJob,
} from "../../companies/types/company.types"
import { Button } from "@/components/ui/button"

export function JobCard({
  job,
  onEdit,
}: {
  job: CompanyJob
  onEdit: (
    job: CompanyJob
  ) => void
}) {

  const router =
    useRouter()

  const handleApplicants = () => {

    router.push(
      `/recruiter/applicants/${job.job_id}`
    )
  }

  return (

    <div
      className="
        group relative
        overflow-hidden
        rounded-[28px]
        border border-slate-200
        bg-white
        p-6
        transition-all duration-300

        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]

        dark:border-white/10
        dark:bg-[#111111]

        dark:hover:border-white/15
        dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.40)]
      "
    >

      {/* TOP */}

      <div
        className="
          flex items-start
          justify-between gap-4
        "
      >

        {/* LEFT */}

        <div
          className="
            min-w-0 flex-1
          "
        >

          {/* STATUS */}

          <div
            className={`
              inline-flex items-center
              rounded-full
              px-2 py-1
              text-[10px]
              font-bold uppercase
              tracking-[0.14em]

              ${
                job.is_active
                  ? `
                    bg-emerald-50
                    text-emerald-700

                    dark:bg-emerald-500/10
                    dark:text-emerald-400
                  `
                  : `
                    bg-red-50
                    text-red-600

                    dark:bg-red-500/10
                    dark:text-red-400
                  `
              }
            `}
          >

            {
              job.is_active
                ? "Active"
                : "Inactive"
            }
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-4 line-clamp-1
              text-2xl
              font-black
              tracking-[-0.06em]
              text-slate-950

              dark:text-white
            "
          >
            {job.title}
          </h2>

          {/* ROLE */}

          <p
            className="
              mt-1 text-sm
              font-medium
              text-slate-500

              dark:text-zinc-400
            "
          >
            {job.role}
          </p>
        </div>

        {/* MENU */}

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              className="
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-xl
                border border-slate-200
                bg-slate-50
                transition-all duration-200

                hover:bg-slate-100

                dark:border-white/10
                dark:bg-white/[0.03]

                dark:hover:bg-white/[0.05]
              "
            >

              <MoreHorizontal
                className="
                  h-4 w-4
                  text-slate-500
                shrink-0
                  dark:text-zinc-400
                "
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-48 rounded-2xl
              border border-slate-200
              bg-white
              p-2
              shadow-[0_20px_60px_rgba(15,23,42,0.12)]

              dark:border-white/10
              dark:bg-[#111111]
            "
          >

            <DropdownMenuItem
              onClick={() =>
                onEdit(job)
              }
              className="
                flex cursor-pointer
                items-center gap-3
                rounded-xl
                px-3 py-2.5
                text-sm font-medium
                text-slate-700

                hover:bg-slate-100

                dark:text-zinc-300
                dark:hover:bg-white/[0.05]
              "
            >

              <Pencil
                className="
                  h-4 w-4
                  text-emerald-500
                "
              />

              Edit Job
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={
                handleApplicants
              }
              className="
                flex cursor-pointer
                items-center gap-3
                rounded-xl
                px-3 py-2.5
                text-sm font-medium
                text-slate-700

                hover:bg-slate-100

                dark:text-zinc-300
                dark:hover:bg-white/[0.05]
              "
            >

              <Users
                className="
                  h-4 w-4
                  text-cyan-500
                "
              />

              View Applicants
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4 line-clamp-2
          text-sm leading-6
          text-slate-600

          dark:text-zinc-400
        "
      >
        {job.description}
      </p>

      {/* META */}

      <div
        className="
          mt-5 flex flex-wrap
          items-center gap-2
        "
      >

        <div
          className="
            rounded-full
            bg-slate-100
            px-3 py-1
            text-xs font-semibold
            text-slate-700

            dark:bg-white/[0.04]
            dark:text-zinc-300
          "
        >
          {job.job_type}
        </div>

        <div
          className="
            flex items-center gap-1
            rounded-full
            bg-slate-100
            px-3 py-1
            text-xs font-semibold
            text-slate-700

            dark:bg-white/[0.04]
            dark:text-zinc-300
          "
        >

          <MapPin
            className="
              h-3 w-3
              text-emerald-500
            "
          />

          {job.location}
        </div>

        <div
          className="
            flex items-center gap-1
            rounded-full
            bg-emerald-50
            px-3 py-1
            text-xs font-semibold
            text-emerald-700

            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
        >

          <Users
            className="
              h-3 w-3
            "
          />

          {job.openings}
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
          mt-5 flex
          items-center
          justify-between
          border-t border-slate-100
          pt-5

          dark:border-white/[0.06]
        "
      >

        {/* SALARY */}

        <div>

          <p
            className="
              text-[10px]
              font-bold uppercase
              tracking-[0.14em]
              text-slate-400

              dark:text-zinc-600
            "
          >
            Salary
          </p>

          <h3
            className="
              mt-1 text-2xl
              font-black
              tracking-[-0.06em]
              text-slate-950

              dark:text-white
            "
          >
            ₹
            {
              Number(
                job.salary
              ).toLocaleString(
                "en-IN"
              )
            }
          </h3>
        </div>

        {/* CTA */}

        <Button
  onClick={
    handleApplicants
  }
  className="
    group/cta relative
    inline-flex h-11
    items-center gap-2
    overflow-hidden
    rounded-xl
    border border-emerald-200
    bg-emerald-50
    px-4 text-sm
    font-semibold
    text-emerald-700
    transition-all duration-300

    hover:border-emerald-300
    hover:bg-emerald-100
    hover:shadow-[0_8px_25px_rgba(16,185,129,0.12)]

    dark:border-emerald-500/20
    dark:bg-emerald-500/10
    dark:text-emerald-400

    dark:hover:border-emerald-500/30
    dark:hover:bg-emerald-500/15
    dark:hover:shadow-[0_8px_25px_rgba(16,185,129,0.20)]
  "
>

  {/* subtle shine */}

  <div
    className="
      absolute inset-0
      translate-x-[-120%]
      bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)]
      transition-transform duration-700

      group-hover/cta:translate-x-[120%]
    "
  />

  <span
    className="
      relative
    "
  >
    View Applicants
  </span>

  <ArrowRight
    className="
      relative h-4 w-4
      transition-transform duration-300

      group-hover/cta:translate-x-0.5
    "
  />
</Button>
      </div>
    </div>
  )
}