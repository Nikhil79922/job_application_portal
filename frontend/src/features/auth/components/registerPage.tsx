"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    ArrowRight,
    Eye,
    EyeOff,
    FileText,
    Lock,
    Mail,
    Phone,
    Sparkles,
    User,
} from "lucide-react"

import AppBackground from "@/components/shared/app-background"

import { Button } from "@/components/ui/button"

import {
    useRegister,
} from "@/features/auth/hooks/use-register"
import { registerSchema, RegisterSchema } from "../schemas/registration.schema"



export default function RegisterPage() {

    const [
        showPassword,
        setShowPassword,
    ] = useState(false)

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false)

    const {
        mutateAsync:
        registerUser,

        isPending,
    } = useRegister()

    const {
        register,

        handleSubmit,

        watch,

        setValue,

        trigger,

        formState: {
            errors,
            isValid,
        },
    } = useForm<RegisterSchema>({

        resolver:
            zodResolver(
                registerSchema
            ),

        /* REALTIME VALIDATION */

        mode:
            "onChange",

        reValidateMode:
            "onChange",

        criteriaMode:
            "all",

        defaultValues: {
            role:
                "jobseeker",
        },
    })

    const role =
        watch("role")

    const uploadedFile =
        watch("file")

    const onSubmit =
        async (
            data:
                RegisterSchema
        ) => {

            await registerUser({

                name:
                    data.name,

                email:
                    data.email,

                password:
                    data.password,

                phoneNumber:
                    data.phoneNumber,

                role:
                    data.role,

                bio:
                    data.bio,

                file:
                    data.file,
            })
        }

    return (

        <AppBackground>

            <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">

                {/* FORM CONTAINER */}

                <div className="relative w-full max-w-2xl">

                    {/* GLOW */}

                    <div className="absolute inset-0 rounded-[40px] bg-emerald-500/10 blur-3xl" />

                    {/* CARD */}

                    <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/90 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-6 dark:border-white/10 dark:bg-[#111111]/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                        {/* INNER GRADIENT */}

                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent" />

                        <div className="relative z-10">

                            {/* HEADER */}

                            <div className="space-y-3 text-center">

                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

                                    <Sparkles className="h-4 w-4" />

                                    Join Talent Forge
                                </div>

                                <h1 className="text-3xl font-black leading-[1] tracking-[-2px] text-slate-950 sm:text-4xl dark:text-white">

                                    Create Your

                                    <span className="block text-emerald-600 dark:text-emerald-500">

                                        Account
                                    </span>
                                </h1>

                                <p className="mx-auto max-w-lg text-sm leading-7 text-slate-500 dark:text-zinc-400">

                                    Build your professional profile and start exploring intelligent hiring experiences.
                                </p>
                            </div>

                            {/* FORM */}

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="mt-7 space-y-4"
                            >

                                {/* ROLE */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

                                        Select Role

                                        <span className="ml-1 text-red-500">

                                            *
                                        </span>
                                    </label>

                                    <div className="grid grid-cols-2 rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#09090B]">

                                        {[
                                            {
                                                label:
                                                    "Job Seeker",

                                                value:
                                                    "jobseeker",
                                            },

                                            {
                                                label:
                                                    "Recruiter",

                                                value:
                                                    "recruiter",
                                            },
                                        ].map((item) => (

                                            <Button
                                                key={item.value}
                                                type="button"
                                                variant="ghost"
                                                onClick={() =>
                                                    setValue(
                                                        "role",
                                                        item.value as
                                                        | "jobseeker"
                                                        | "recruiter"
                                                    )
                                                }
                                                className={`h-12 rounded-xl px-4 text-sm font-semibold transition-all duration-300 ${role === item.value
                                                        ? "bg-emerald-500 text-white shadow-lg hover:bg-emerald-500 hover:text-white"
                                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-white"
                                                    }`}
                                            >

                                                {item.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* NAME + PHONE */}

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {/* NAME */}

                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

                                            Full Name

                                            <span className="ml-1 text-red-500">

                                                *
                                            </span>
                                        </label>

                                        <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500" />

                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                {...register("name")}
                                                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
                                            />
                                        </div>

                                        {errors.name && (

                                            <p className="mt-1.5 text-xs font-medium text-red-500">

                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* PHONE */}

                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

                                            Phone Number

                                            <span className="ml-1 text-red-500">

                                                *
                                            </span>
                                        </label>

                                        <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                            <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500" />

                                            <input
                                                type="tel"
                                                placeholder="Phone number"
                                                {...register("phoneNumber")}
                                                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
                                            />
                                        </div>

                                        {errors.phoneNumber && (

                                            <p className="mt-1.5 text-xs font-medium text-red-500">

                                                {errors.phoneNumber.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* EMAIL */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

                                        Email Address

                                        <span className="ml-1 text-red-500">

                                            *
                                        </span>
                                    </label>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500" />

                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                            className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
                                        />
                                    </div>

                                    {errors.email && (

                                        <p className="mt-1.5 text-xs font-medium text-red-500">

                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* PASSWORDS */}

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {/* PASSWORD */}

                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

                                            Password

                                            <span className="ml-1 text-red-500">

                                                *
                                            </span>
                                        </label>

                                        <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500" />

                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Create password"
                                                {...register("password")}
                                                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="h-7 w-7 shrink-0 rounded-full text-slate-400 transition-colors duration-300 hover:bg-transparent hover:text-emerald-500"
                                            >

                                                {showPassword ? (

                                                    <EyeOff className="h-5 w-5" />

                                                ) : (

                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>

                                        {errors.password && (

                                            <p className="mt-1.5 text-xs font-medium text-red-500">

                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* CONFIRM PASSWORD */}

                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

                                            Confirm Password

                                            <span className="ml-1 text-red-500">

                                                *
                                            </span>
                                        </label>

                                        <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500" />

                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm password"
                                                {...register("confirmPassword")}
                                                className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-500"
                                            />

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="h-7 w-7 shrink-0 rounded-full text-slate-400 transition-colors duration-300 hover:bg-transparent hover:text-emerald-500"
                                            >

                                                {showConfirmPassword ? (

                                                    <EyeOff className="h-5 w-5" />

                                                ) : (

                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </Button>
                                        </div>

                                        {errors.confirmPassword && (

                                            <p className="mt-1.5 text-xs font-medium text-red-500">

                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                              {/* PROFESSIONAL DETAILS */}

<div className="rounded-3xl border border-slate-200/70 bg-slate-50/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">

<div className="space-y-4">

  {/* BIO */}

  <div>

    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">

      <Sparkles className="h-4 w-4 text-emerald-500" />

      {role === "recruiter"
        ? "Company / Hiring Bio"
        : "Professional Bio"}

      {role === "jobseeker" && (

        <span className="text-red-500">

          *
        </span>
      )}
    </label>

    <textarea
      rows={3}

      placeholder={
        role === "recruiter"
          ? "Tell candidates about your company, hiring culture, and recruitment goals..."
          : "Tell recruiters about yourself, your skills, and your experience..."
      }

      {...register("bio")}

      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-emerald-500/30"
    />

    {errors.bio && (

      <p className="mt-1.5 text-xs font-medium text-red-500">

        {errors.bio.message}
      </p>
    )}

    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-zinc-400">

      {role === "recruiter"
        ? "Optional — add hiring culture, company vision, or recruiter details to improve candidate trust."
        : "Introduce yourself professionally to improve recruiter engagement and profile visibility."}
    </p>
  </div>

  {/* RESUME */}

  {role === "jobseeker" && (

    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">

        Upload Resume

        <span className="ml-1 text-red-500">

          *
        </span>
      </label>

      {!uploadedFile ? (

        <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 transition-all duration-300 hover:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:hover:border-emerald-500/30">

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

            <FileText className="h-5 w-5" />
          </div>

          <div>

            <h3 className="text-sm font-bold text-slate-950 dark:text-white">

              Upload Resume
            </h3>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">

              PDF, DOC, DOCX supported
            </p>
          </div>

          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {

              setValue(
                "file",
                e.target.files?.[0]
              )

              trigger("file")
            }}
          />
        </label>

      ) : (

        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

              <FileText className="h-5 w-5" />
            </div>

            <div>

              <h3 className="max-w-[180px] truncate text-sm font-bold text-slate-950 dark:text-white">

                {uploadedFile.name}
              </h3>

              <p className="text-xs text-slate-500 dark:text-zinc-400">

                {(
                  uploadedFile.size /
                  1024 /
                  1024
                ).toFixed(2)} MB
              </p>
            </div>
          </div>

          <label className="cursor-pointer text-xs font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-500 dark:text-emerald-400">

            Replace

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {

                setValue(
                  "file",
                  e.target.files?.[0]
                )

                trigger("file")
              }}
            />
          </label>
        </div>
      )}
    </div>
  )}
</div>
</div>

                                {/* BUTTON */}
                                <Button
                                    type="submit"
                                    disabled={
                                        isPending ||
                                        !isValid
                                    }
                                    className="group h-14 w-full rounded-2xl bg-emerald-500 px-5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50">

                                    {isPending
                                        ? "Creating Account..."
                                        : "Create Account"}

                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </form>

                            {/* FOOTER */}

                            <p className="mt-6 text-center text-sm leading-6 text-slate-500 dark:text-zinc-400">

                                Already have an account?{" "}

                                <Link
                                    href="/login"
                                    className="font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-500 dark:text-emerald-400"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppBackground>
    )
}