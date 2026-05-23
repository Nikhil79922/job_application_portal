/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { createPortal } from "react-dom"

import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  Phone,
  Sparkles,
  User2,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { useApplicantProfile } from "../hooks/use-applicant-profile"

interface Props {
  applicantId: number | null
  onClose: () => void
}

export default function ApplicantProfileModal({
  applicantId,
  onClose,
}: Props) {

  const {
    data,
    isLoading,
    isError,
  } = useApplicantProfile(
    applicantId ?? 0
  )

  const [
    mounted,
    setMounted,
  ] = useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])

  if (!mounted) {
    return null
  }

  if (
    applicantId === null ||
    applicantId === undefined
  ) {
    return null
  }

  return createPortal(

    <div
      className="
        fixed inset-0
        z-[2147483647]
        flex items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-md
      "
      onClick={(e) =>
        e.target ===
          e.currentTarget &&
        onClose()
      }
    >

      {/* MODAL */}

      <div
        className="
          hide-scrollbar
          relative
          max-h-[92vh]
          w-full max-w-3xl
          overflow-y-auto
          rounded-[32px]
          border border-slate-200
          bg-white
          shadow-xl

          dark:border-white/10
          dark:bg-[#111111]
        "
      >

        {/* ambient */}

        <div
          className="
            pointer-events-none
            absolute inset-0
            overflow-hidden
          "
        >

          <div
            className="
              absolute -left-24
              -top-24 h-80
              w-80 rounded-full
              bg-emerald-500/[0.05]
              blur-3xl
            "
          />

          <div
            className="
              absolute -bottom-24
              -right-24 h-80
              w-80 rounded-full
              bg-cyan-500/[0.04]
              blur-3xl
            "
          />
        </div>

        {/* top line */}

        <div
          className="
            absolute inset-x-0 top-0
            h-[1px]
            bg-gradient-to-r
            from-transparent
            via-emerald-400/50
            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            sticky top-0 z-20
            flex items-center
            justify-between
            border-b border-slate-200
            bg-white/90
            px-6 py-5
            backdrop-blur-sm

            dark:border-white/10
            dark:bg-[#111111]/90
          "
        >

          <div>

            <p
              className="
                text-[10px]
                font-bold uppercase
                tracking-[0.18em]
                text-emerald-600

                dark:text-emerald-400/70
              "
            >
              Candidate Profile
            </p>

            <h2
              className="
                mt-1 text-lg
                font-black
                tracking-[-0.04em]
                text-slate-950

                dark:text-white
              "
            >
              Applicant Details
            </h2>
          </div>

          <Button
            onClick={onClose}
            className="
              flex h-10 w-10
              items-center
              justify-center
              rounded-2xl
              border border-slate-200
              bg-slate-100
              text-slate-500
              transition-all duration-300

              hover:rotate-90
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-500

              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-zinc-400

              dark:hover:border-red-500/20
              dark:hover:bg-red-500/10
              dark:hover:text-red-300
            "
          >
            <X
              className="
                h-4 w-4
                shrink-0
              "
            />
          </Button>
        </div>

        {/* CONTENT */}

        <div
          className="
            relative z-10
            space-y-6 p-6
          "
        >

          {/* LOADING */}

          {
            isLoading && (

              <div
                className="
                  flex flex-col
                  items-center
                  justify-center
                  gap-3 py-20
                "
              >

                <Loader2
                  className="
                    h-8 w-8
                    animate-spin
                    text-emerald-500
                  "
                />

                <p
                  className="
                    text-sm
                    text-slate-500

                    dark:text-zinc-500
                  "
                >
                  Loading profile...
                </p>
              </div>
            )
          }

          {/* ERROR */}

          {
            isError && (

              <div
                className="
                  flex items-center
                  gap-3 rounded-2xl
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-sm font-medium
                  text-red-600

                  dark:border-red-500/20
                  dark:bg-red-500/10
                  dark:text-red-300
                "
              >

                <span
                  className="
                    h-1.5 w-1.5
                    shrink-0 rounded-full
                    bg-red-500
                  "
                />

                Failed to load profile.
              </div>
            )
          }

          {/* PROFILE */}

          {
            data &&
            !isLoading && (

              <>
                {/* HERO */}

                <div
                  className="
                    relative overflow-hidden
                    rounded-[28px]
                    border border-slate-200
                    bg-slate-50/70
                    p-6

                    dark:border-white/10
                    dark:bg-white/[0.03]
                  "
                >

                  {/* glow */}

                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-br
                      from-emerald-500/[0.05]
                      via-transparent
                      to-cyan-500/[0.03]
                    "
                  />

                  <div
                    className="
                      absolute inset-x-0 top-0
                      h-[1px]
                      bg-gradient-to-r
                      from-transparent
                      via-emerald-400/30
                      to-transparent
                    "
                  />

                  <div
                    className="
                      relative z-10
                      flex flex-col
                      gap-5 sm:flex-row
                      sm:items-start
                    "
                  >

                    {/* avatar */}

                    <div
                      className="
                        shrink-0
                      "
                    >

                      {
                        data.profile_pic
                          ? (

                            <img
                              src={
                                data.profile_pic
                              }
                              alt={
                                data.name
                              }
                              className="
                                h-24 w-24
                                rounded-3xl
                                border border-slate-200
                                object-cover

                                dark:border-white/10
                              "
                            />
                          )
                          : (

                            <div
                              className="
                                flex h-24 w-24
                                items-center
                                justify-center
                                rounded-3xl
                                border border-emerald-500/20
                                bg-emerald-500/10
                              "
                            >

                              <User2
                                className="
                                  h-10 w-10
                                  text-emerald-500
                                "
                              />
                            </div>
                          )
                      }
                    </div>

                    {/* info */}

                    <div
                      className="
                        min-w-0 flex-1
                      "
                    >

                      {/* role */}

                      <div
                        className="
                          inline-flex
                          items-center gap-1.5
                          rounded-full
                          border border-emerald-500/20
                          bg-emerald-500/10
                          px-3 py-1
                          text-[10px]
                          font-bold uppercase
                          tracking-[0.14em]
                          text-emerald-600

                          dark:text-emerald-400
                        "
                      >

                        <CheckCircle2
                          className="
                            h-2.5 w-2.5
                          "
                        />

                        {
                          data.role
                        }
                      </div>

                      <h3
                        className="
                          mt-4 text-3xl
                          font-black
                          tracking-[-0.06em]
                          text-slate-950

                          dark:text-white
                        "
                      >
                        {
                          data.name
                        }
                      </h3>

                      {/* meta */}

                      <div
                        className="
                          mt-4 flex
                          flex-wrap items-center
                          gap-3
                        "
                      >

                        <span
                          className="
                            inline-flex
                            items-center gap-2
                            rounded-xl
                            border border-slate-200
                            bg-white
                            px-3 py-2
                            text-[13px]
                            text-slate-600

                            dark:border-white/10
                            dark:bg-white/[0.03]
                            dark:text-zinc-300
                          "
                        >

                          <Mail
                            className="
                              h-3.5 w-3.5
                              text-emerald-500
                            "
                          />

                          {
                            data.email
                          }
                        </span>

                        {
                          data.phone_number && (

                            <span
                              className="
                                inline-flex
                                items-center gap-2
                                rounded-xl
                                border border-slate-200
                                bg-white
                                px-3 py-2
                                text-[13px]
                                text-slate-600

                                dark:border-white/10
                                dark:bg-white/[0.03]
                                dark:text-zinc-300
                              "
                            >

                              <Phone
                                className="
                                  h-3.5 w-3.5
                                  text-emerald-500
                                "
                              />

                              {
                                data.phone_number
                              }
                            </span>
                          )
                        }
                      </div>
                    </div>
                  </div>

                  {/* BIO */}

                  {
                    data.bio && (

                      <div
                        className="
                          relative z-10
                          mt-6 border-t
                          border-slate-200
                          pt-5

                          dark:border-white/10
                        "
                      >

                        <p
                          className="
                            text-[11px]
                            font-bold uppercase
                            tracking-[0.14em]
                            text-slate-400

                            dark:text-zinc-500
                          "
                        >
                          About
                        </p>

                        <p
                          className="
                            mt-3 text-sm
                            leading-7
                            text-slate-600

                            dark:text-zinc-300
                          "
                        >
                          {
                            data.bio
                          }
                        </p>
                      </div>
                    )
                  }
                </div>

                {/* SKILLS */}

                {
                  data.skills?.length >
                    0 && (

                    <div
                      className="
                        rounded-[28px]
                        border border-slate-200
                        bg-slate-50/70
                        p-5

                        dark:border-white/10
                        dark:bg-white/[0.03]
                      "
                    >

                      <div
                        className="
                          mb-4 flex
                          items-center gap-2
                        "
                      >

                        <Briefcase
                          className="
                            h-4 w-4
                            text-emerald-500
                          "
                        />

                        <p
                          className="
                            text-sm
                            font-bold
                            tracking-[-0.02em]
                            text-slate-950

                            dark:text-white
                          "
                        >
                          Skills
                        </p>
                      </div>

                      <div
                        className="
                          flex flex-wrap
                          gap-2
                        "
                      >

                        {
                          (
                            data.skills as string[]
                          ).map(
                            (
                              skill
                            ) => (

                              <span
                                key={
                                  skill
                                }
                                className="
                                  rounded-xl
                                  border border-emerald-500/15
                                  bg-emerald-500/[0.06]
                                  px-3 py-1.5
                                  text-[13px]
                                  font-medium
                                  text-slate-700

                                  dark:text-zinc-200
                                "
                              >
                                {
                                  skill
                                }
                              </span>
                            )
                          )
                        }
                      </div>
                    </div>
                  )
                }

                {/* GRID */}

                <div
                  className="
                    grid gap-4
                    sm:grid-cols-2
                  "
                >

                  {/* RESUME */}

                  {
                    data.resume && (

                      <div
                        className="
                          flex items-center
                          justify-between
                          gap-4
                          rounded-[28px]
                          border border-slate-200
                          bg-slate-50/70
                          p-5

                          dark:border-white/10
                          dark:bg-white/[0.03]
                        "
                      >

                        <div
                          className="
                            flex items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex h-11 w-11
                              items-center
                              justify-center
                              rounded-2xl
                              border border-emerald-500/15
                              bg-emerald-500/10
                            "
                          >

                            <FileText
                              className="
                                h-4 w-4
                                text-emerald-500
                              "
                            />
                          </div>

                          <div>

                            <p
                              className="
                                text-sm
                                font-bold
                                text-slate-950

                                dark:text-white
                              "
                            >
                              Resume
                            </p>

                            <p
                              className="
                                mt-0.5 text-xs
                                text-slate-400

                                dark:text-zinc-500
                              "
                            >
                              {
                                data.resume_upload_status ===
                                "success"
                                  ? "Ready to view"
                                  : "Processing..."
                              }
                            </p>
                          </div>
                        </div>

                        <Link
                          href={
                            data.resume
                          }
                          target="_blank"
                        >

                          <Button
                            className="
                              group relative flex
                              h-10 items-center
                              justify-center
                              overflow-hidden
                              rounded-xl
                              border border-emerald-400/20
                              bg-[#07130F]
                              px-4
                              text-sm font-medium
                              text-white
                              shadow-[0_4px_20px_rgba(0,0,0,0.35)]
                              transition-all duration-300

                              hover:border-emerald-400/40
                              hover:bg-[#0A1B15]

                              dark:bg-[#07130F]
                            "
                          >

                            <span
                              className="
                                relative z-10
                                flex items-center
                                gap-2
                              "
                            >

                              <ExternalLink
                                className="
                                  h-3.5 w-3.5
                                  text-emerald-400
                                "
                              />

                              Open
                            </span>
                          </Button>
                        </Link>
                      </div>
                    )
                  }

                  {/* SUBSCRIPTION */}

                  <div
                    className="
                      rounded-[28px]
                      border border-slate-200
                      bg-slate-50/70
                      p-5

                      dark:border-white/10
                      dark:bg-white/[0.03]
                    "
                  >

                    <p
                      className="
                        text-[11px]
                        font-bold uppercase
                        tracking-[0.14em]
                        text-slate-400

                        dark:text-zinc-500
                      "
                    >
                      Subscription
                    </p>

                    {
                      data.subscription
                        ? (

                          <span
                            className="
                              mt-3 inline-flex
                              items-center gap-1.5
                              rounded-full
                              border border-emerald-500/20
                              bg-emerald-500/10
                              px-3 py-1.5
                              text-sm
                              font-semibold
                              text-emerald-600

                              dark:text-emerald-400
                            "
                          >

                            <Sparkles
                              className="
                                h-3.5 w-3.5
                              "
                            />

                            {
                              data.subscription
                            }
                          </span>
                        )
                        : (

                          <p
                            className="
                              mt-3 text-sm
                              text-slate-500

                              dark:text-zinc-500
                            "
                          >
                            No active
                            subscription
                          </p>
                        )
                    }
                  </div>
                </div>

              
              </>
            )
          }
        </div>
      </div>
    </div>,

    document.body
  )
}