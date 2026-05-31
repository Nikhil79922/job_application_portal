// src/features/jobs/components/job-form.tsx

"use client"

import type { ReactNode } from "react"

import {
  useForm,
  type SubmitHandler,
} from "react-hook-form"

import {
  zodResolver,
} from "@hookform/resolvers/zod"

import {
  Loader2,
  Sparkles,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Clock3,
  Globe,
  FileText,
  ArrowUpRight,
} from "lucide-react"

import {
  createJobSchema,
  type CreateJobDTO,
  type CreateJobFormValues,
} from "../schemas/create-job.schemas"

import {
  useCreateJob,
} from "../hooks/use-create-job"

import {
  Button,
} from "@/components/ui/button"

/* ─────────────────────────────────────────────────────────── */
/* Props */
/* ─────────────────────────────────────────────────────────── */

interface Props {
  companyId: number
  onSuccess?: () => void  // ✅ added — called after job is created
}

/* ─────────────────────────────────────────────────────────── */
/* Field wrapper */
/* ─────────────────────────────────────────────────────────── */

function FormField({
  label,
  error,
  icon: Icon,
  children,
}: {
  label: string
  error?: string
  icon?: React.ElementType
  children: ReactNode
}) {

  return (

    <div className="space-y-2">

      <label
        className="
          flex items-center gap-2
          text-[11px]
          font-bold uppercase
          tracking-[0.14em]
          text-slate-500
          dark:text-zinc-400
        "
      >

        {
          Icon && (

            <Icon
              className="
                h-3.5 w-3.5
                text-emerald-500
              "
            />
          )
        }

        {label}
      </label>

      {children}

      {
        error && (

          <p
            className="
              flex items-center gap-1.5
              text-xs font-medium
              text-red-500
            "
          >

            <span
              className="
                h-1 w-1
                rounded-full
                bg-red-500
              "
            />

            {error}
          </p>
        )
      }
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* Input styles */
/* ─────────────────────────────────────────────────────────── */

const inputBase = `
  h-12 w-full rounded-2xl
  border border-slate-200
  bg-white/80
  px-4 text-sm
  text-slate-900
  outline-none
  backdrop-blur-md
  transition-all duration-300
  placeholder:text-slate-400
  focus:border-emerald-500/40
  focus:bg-white
  focus:ring-4 focus:ring-emerald-500/10
  hover:border-slate-300

  dark:border-white/10
  dark:bg-white/[0.03]
  dark:text-white
  dark:placeholder:text-zinc-600
  dark:hover:border-white/20
  dark:focus:border-emerald-500/50
  dark:focus:bg-white/[0.05]
`

const selectBase = `
  ${inputBase}
  cursor-pointer
  appearance-none
  bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]
  dark:bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2352525b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")]
  bg-[right_14px_center]
  bg-no-repeat
  pr-10
`

/* ─────────────────────────────────────────────────────────── */
/* Section divider */
/* ─────────────────────────────────────────────────────────── */

function SectionLabel({
  children,
}: {
  children: ReactNode
}) {

  return (

    <div
      className="
        flex items-center gap-3
      "
    >

      <div
        className="
          h-px flex-1
          bg-slate-200
          dark:bg-white/[0.06]
        "
      />

      <span
        className="
          text-[10px]
          font-bold uppercase
          tracking-[0.18em]
          text-slate-400
          dark:text-zinc-600
        "
      >
        {children}
      </span>

      <div
        className="
          h-px flex-1
          bg-slate-200
          dark:bg-white/[0.06]
        "
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* Main form */
/* ─────────────────────────────────────────────────────────── */

export default function JobForm({
  companyId,
  onSuccess,  // ✅ destructured
}: Props) {

  const {
    mutate,
    isPending,
  } = useCreateJob(companyId)

  const form =
    useForm<CreateJobFormValues>({
      resolver:
        zodResolver(
          createJobSchema
        ),

      defaultValues: {
        title: "",
        description: "",
        salary: 0,
        location: "",
        job_type: "Full-time",
        work_location: "Hybrid",
        openings: 1,
        role: "",
        company_id: companyId,
      },
    })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = form

  const onSubmit:
    SubmitHandler<CreateJobFormValues> =
    (values) => {

      const parsed:
        CreateJobDTO =
        createJobSchema.parse(
          values
        )

      mutate(parsed, {
        onSuccess: () => {

          reset({
            title: "",
            description: "",
            salary: 0,
            location: "",
            job_type: "Full-time",
            work_location: "Hybrid",
            openings: 1,
            role: "",
            company_id: companyId,
          })

          onSuccess?.()  // ✅ closes the modal
        },
      })
    }

  return (

    <div
      className="
        relative overflow-hidden
        rounded-[34px]
        border border-slate-200
        bg-white/85
        shadow-[0_25px_80px_rgba(15,23,42,0.08)]
        backdrop-blur-xl

        dark:border-white/10
        dark:bg-[#0B0B0B]
        dark:shadow-[0_40px_120px_rgba(0,0,0,0.65)]
      "
    >

      {/* AMBIENT */}

      <div
        className="
          pointer-events-none
          absolute inset-0
        "
      >

        <div
          className="
            absolute left-0 top-0
            h-72 w-72
            rounded-full
            bg-emerald-500/[0.05]
            blur-xl
          "
        />

        <div
          className="
            absolute bottom-0 right-0
            h-80 w-80
            rounded-full
            bg-cyan-500/[0.04]
            blur-xl
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-emerald-500/[0.04]
            via-transparent
            to-cyan-500/[0.03]
          "
        />
      </div>

      {/* TOP GLOW */}

      <div
        className="
          absolute inset-x-0 top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-emerald-400/70
          to-transparent
        "
      />

      <form
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
        className="
          relative z-10
          space-y-8
          p-6 sm:p-8
          lg:p-10
        "
      >

        {/* HEADER */}

        <div>

          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-emerald-200
              bg-emerald-50
              px-3 py-1
              text-[10px]
              font-bold uppercase
              tracking-[0.16em]
              text-emerald-700

              dark:border-emerald-500/20
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >

            <Sparkles
              className="
                h-3.5 w-3.5
              "
            />

            Post a Job
          </div>

          <h2
            className="
              mt-4 text-3xl
              font-black
              tracking-[-0.08em]
              text-slate-900
              sm:text-4xl
              dark:text-white
            "
          >
            New Position
          </h2>

          <p
            className="
              mt-2 max-w-md
              text-sm leading-7
              text-slate-500
              dark:text-zinc-400
            "
          >
            Publish a professional listing
            that attracts the right candidates.
          </p>
        </div>

        {/* POSITION DETAILS */}

        <div className="space-y-5">

          <SectionLabel>
            Position Details
          </SectionLabel>

          <div
            className="
              grid gap-5
              md:grid-cols-2
            "
          >

            <FormField
              label="Job Title"
              error={
                errors.title?.message
              }
              icon={Briefcase}
            >

              <input
                {...register("title")}
                placeholder="e.g. Backend Engineer"
                className={inputBase}
              />
            </FormField>

            <FormField
              label="Role"
              error={
                errors.role?.message
              }
              icon={Sparkles}
            >

              <input
                {...register("role")}
                placeholder="e.g. Backend Developer"
                className={inputBase}
              />
            </FormField>
          </div>
        </div>

        {/* COMPENSATION */}

        <div className="space-y-5">

          <SectionLabel>
            Compensation & Team
          </SectionLabel>

          <div
            className="
              grid gap-5
              md:grid-cols-2
            "
          >

            <FormField
              label="Annual Salary (₹)"
              error={
                errors.salary?.message
              }
              icon={DollarSign}
            >

              <div
                className="
                  relative
                "
              >

                <span
                  className="
                    pointer-events-none
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-sm font-semibold
                    text-emerald-500
                  "
                >
                  ₹
                </span>

                <input
                  type="number"
                  {...register("salary")}
                  placeholder="70,000"
                  className={`${inputBase} pl-8`}
                />
              </div>
            </FormField>

            <FormField
              label="Openings"
              error={
                errors.openings?.message
              }
              icon={Users}
            >

              <input
                type="number"
                {...register("openings")}
                placeholder="2"
                className={inputBase}
              />
            </FormField>
          </div>
        </div>

        {/* LOCATION */}

        <div className="space-y-5">

          <SectionLabel>
            Location & Work Style
          </SectionLabel>

          <div
            className="
              grid gap-5
              md:grid-cols-3
            "
          >

            <FormField
              label="Location"
              error={
                errors.location?.message
              }
              icon={MapPin}
            >

              <input
                {...register("location")}
                placeholder="Bangalore, India"
                className={inputBase}
              />
            </FormField>

            <FormField
              label="Job Type"
              error={
                errors.job_type?.message
              }
              icon={Clock3}
            >

              <select
                {...register("job_type")}
                className={selectBase}
              >

                <option value="Full-time">
                  Full-time
                </option>

                <option value="Part-time">
                  Part-time
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Internship">
                  Internship
                </option>
              </select>
            </FormField>

            <FormField
              label="Work Location"
              error={
                errors.work_location?.message
              }
              icon={Globe}
            >

              <select
                {...register("work_location")}
                className={selectBase}
              >

                <option value="Hybrid">
                  Hybrid
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="On-site">
                  On-site
                </option>
              </select>
            </FormField>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="space-y-5">

          <SectionLabel>
            Job Description
          </SectionLabel>

          <FormField
            label="Description"
            error={
              errors.description?.message
            }
            icon={FileText}
          >

            <textarea
              rows={6}
              {...register(
                "description"
              )}
              placeholder="We are looking for a skilled engineer with experience in Node.js, PostgreSQL, and microservices architecture..."
              className="
                min-h-[180px]
                w-full resize-none
                rounded-2xl
                border border-slate-200
                bg-white/80
                px-4 py-4
                text-sm leading-7
                text-slate-900
                outline-none
                backdrop-blur-md
                transition-all duration-300
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-emerald-500/40
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-500/10

                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-zinc-600
                dark:hover:border-white/20
                dark:focus:border-emerald-500/50
                dark:focus:bg-white/[0.05]
              "
            />
          </FormField>
        </div>

        {/* SUBMIT */}

        <div className="pt-2">

          <div
            className="
              mb-6 h-px
              bg-gradient-to-r
              from-transparent
              via-slate-200
              to-transparent

              dark:via-white/[0.06]
            "
          />

          <Button
            disabled={isPending}
            type="submit"
            className="
              group relative
              h-14 w-full
              overflow-hidden
              rounded-2xl
              border border-emerald-400/20
              bg-[#07130F]
              text-sm font-semibold
              tracking-[0.02em]
              text-white
              shadow-[0_4px_20px_rgba(0,0,0,0.35)]
              transition-all duration-300 ease-out

              hover:-translate-y-0.5
              hover:border-emerald-400/40
              hover:bg-[#0A1B15]
              hover:shadow-[0_10px_35px_rgba(16,185,129,0.25)]

              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >

            <div
              className="
                absolute inset-0
                translate-x-[-120%]
                bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.07),transparent)]
                transition-transform duration-1000
                group-hover:translate-x-[120%]
              "
            />

            <div
              className="
                absolute inset-x-0 top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-emerald-300/40
                to-transparent
              "
            />

            <div
              className="
                absolute inset-y-0 left-0
                w-[30%]
                bg-emerald-400/0
                blur-2xl
                transition-all duration-300
                group-hover:bg-emerald-400/10
              "
            />

            <span
              className="
                relative z-10
                flex items-center
                justify-center gap-2.5
              "
            >

              {
                isPending ? (

                  <>

                    <Loader2
                      className="
                        h-4 w-4
                        animate-spin
                        text-emerald-400
                      "
                    />

                    <span
                      className="
                        text-emerald-50
                      "
                    >
                      Creating Job…
                    </span>
                  </>
                ) : (

                  <>

                    <span
                      className="
                        text-emerald-50
                      "
                    >
                      Publish Job Listing
                    </span>

                    <ArrowUpRight
                      className="
                        h-4 w-4
                        text-emerald-400
                        transition-transform duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </>
                )
              }
            </span>
          </Button>

          <p
            className="
              mt-4 text-center
              text-xs
              text-slate-400
              dark:text-zinc-600
            "
          >
            Listing will be visible to candidates
            immediately after publishing
          </p>
        </div>
      </form>
    </div>
  )
}