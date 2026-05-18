/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import Image from "next/image"

import {
  Globe,
  ImagePlus,
  Loader2,
  Building2,
  X,
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  createCompanySchema,
  type CreateCompanyFormValues,
} from "../schemas/company.schemas"
import { Button } from "@/components/ui/button"

interface Props {
  isSubmitting?: boolean
  onSubmit: (
    values: CreateCompanyFormValues
  ) => void
  onClose: () => void
}

const inputBase =
  "h-12 w-full rounded-2xl border bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600"

const inputNormal =
  "border-slate-200 focus:border-emerald-400 focus:ring-emerald-500/10 dark:border-white/10 dark:focus:border-emerald-500/60"

const inputError =
  "border-red-300 bg-red-50/60 focus:border-red-400 focus:ring-red-500/10 dark:border-red-500/30 dark:bg-red-500/[0.04]"

function FieldError({
  message,
}: {
  message?: string
}) {
  if (!message) return null

  return (
    <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {message}
    </p>
  )
}

export default function CompanyForm({
  isSubmitting,
  onSubmit,
  onClose,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null)

  const firstInputRef =
    useRef<HTMLInputElement>(null)

  const [mounted, setMounted] =
    useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } =
    useForm<CreateCompanyFormValues>({
      resolver: zodResolver(
        createCompanySchema
      ),
      mode: "onChange",
      defaultValues: {
        name: "",
        description: "",
        website: "",
      },
    })

  const file = watch("file")

  const preview = file
    ? URL.createObjectURL(file)
    : null

  const name = watch("name")
  const website = watch("website")
  const description =
    watch("description")

  useEffect(() => {
    setMounted(true)

    document.body.style.overflow =
      "hidden"

    const t = setTimeout(() => {
      firstInputRef.current?.focus()
    }, 120)

    const handler = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape")
        onClose()
    }

    window.addEventListener(
      "keydown",
      handler
    )

    return () => {
      clearTimeout(t)

      document.body.style.overflow =
        "auto"

      window.removeEventListener(
        "keydown",
        handler
      )
    }
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <>
      <style>{`
        @keyframes backdropIn {
          from { opacity:0 }
          to { opacity:1 }
        }

        @keyframes panelIn {
          from {
            opacity:0;
            transform:scale(0.96) translateY(16px)
          }

          to {
            opacity:1;
            transform:scale(1) translateY(0)
          }
        }

        .company-backdrop {
          animation: backdropIn 0.2s ease both;
        }

        .company-panel {
          animation: panelIn 0.28s cubic-bezier(0.34,1.3,0.64,1) both;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="company-backdrop fixed inset-0 z-[2147483646] bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="company-panel hide-scrollbar pointer-events-auto relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[32px] border border-slate-200/80 bg-white shadow-[0_32px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_45%)]" />

          {/* Accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 opacity-80" />

          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111111]/90">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-black tracking-[-0.6px] text-slate-950 dark:text-white">
                  Create Company
                </h2>

                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                  Add a hiring brand to your workspace
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 transition hover:rotate-90 hover:bg-slate-100 hover:text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
            >
              <X className="h-4 w-4 shrink-0" />
            </Button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
          >
            <div className="space-y-6 px-6 py-6">

              {/* Logo Upload */}
              <div className="flex flex-col items-center gap-3">
                <Button
                  type="button"
                  onClick={() =>
                    inputRef.current?.click()
                  }
                  className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[26px] border-2 border-dashed border-slate-300 bg-slate-50 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/5"
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Logo preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 dark:bg-white/[0.06]">
                        <ImagePlus className="h-5 w-5 text-slate-400 dark:text-zinc-500" />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-600">
                        Upload Logo
                      </span>
                    </div>
                  )}
                </Button>

                {preview && (
                  <Button
                    type="button"
                    onClick={() => {
                      setValue(
                        "file",
                        undefined as any
                      )

                      if (
                        inputRef.current
                      ) {
                        inputRef.current.value =
                          ""
                      }
                    }}
                    className="text-[11px] font-semibold text-slate-400 transition hover:text-red-500 dark:text-zinc-600"
                  >
                    Remove logo
                  </Button>
                )}

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f =
                      e.target.files?.[0]

                    if (f) {
                      setValue(
                        "file",
                        f,
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  }}
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                  Company Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                  <input
                    {...register("name")}
                    ref={(element) => {
                      register(
                        "name"
                      ).ref(element)

                      firstInputRef.current =
                        element
                    }}
                    placeholder="e.g. Acme Corporation"
                    className={`${inputBase} ${
                      errors.name
                        ? inputError
                        : inputNormal
                    }`}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <FieldError
                    message={
                      errors.name
                        ?.message
                    }
                  />

                  <div className="flex items-center gap-2">
                    {name &&
                      !errors.name && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}

                    <span className="text-[10px] text-slate-400 dark:text-zinc-600">
                      {name?.length || 0}
                      /100
                    </span>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                  Website
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                  <input
                    {...register(
                      "website"
                    )}
                    placeholder="https://company.com"
                    className={`${inputBase} ${
                      errors.website
                        ? inputError
                        : inputNormal
                    }`}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <FieldError
                    message={
                      errors.website
                        ?.message
                    }
                  />

                  {website &&
                    !errors.website && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                  Description
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <FileText className="absolute left-4 top-4 h-4 w-4 text-slate-400 dark:text-zinc-500" />

                  <textarea
                    {...register(
                      "description"
                    )}
                    rows={5}
                    placeholder="Describe what your company does..."
                    className={`w-full rounded-2xl pb-4 pl-11 pr-4 pt-3.5 text-sm font-medium outline-none transition-all placeholder:text-slate-400 focus:ring-4 dark:text-white dark:placeholder:text-zinc-600 ${
                      errors.description
                        ? `${inputError}`
                        : `border border-slate-200 bg-slate-50 text-slate-900 focus:border-emerald-400 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus:border-emerald-500/60`
                    }`}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <FieldError
                    message={
                      errors
                        .description
                        ?.message
                    }
                  />

                  <div className="flex items-center gap-2">
                    {description &&
                      !errors.description && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}

                    <span className="text-[10px] text-slate-400 dark:text-zinc-600">
                      {description
                        ?.length || 0}
                      /500
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-3">
                <p className="text-[11px] font-medium leading-5 text-emerald-700 dark:text-emerald-400">
                  Fields marked with *
                  are required before
                  creating a company.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center gap-3 border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#111111]/90">
              <Button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !!errors.name ||
                  !!errors.website ||
                  !!errors.description ||
                  !name ||
                  !website ||
                  !description
                }
                className="relative flex h-12 flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 text-sm font-bold text-white shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all duration-300 hover:bg-emerald-600 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Company"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  )
}