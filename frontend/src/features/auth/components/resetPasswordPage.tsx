"use client"

import Link from "next/link"

import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    ShieldCheck,
    Sparkles,
} from "lucide-react"

import { useState } from "react"

import AppBackground from "@/components/shared/app-background"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] =
        useState(false)

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false)

    return (
        <AppBackground>

            <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8">

                {/* CONTAINER */}
                <div className="relative w-full max-w-xl">

                    {/* GLOW */}
                    <div className="absolute inset-0 rounded-[40px] bg-emerald-500/10 blur-3xl" />

                    {/* CARD */}
                    <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/90 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-6 dark:border-white/10 dark:bg-[#111111]/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                        {/* INNER GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] to-transparent" />

                        <div className="relative z-10">

                            {/* HEADER */}
                            <div className="space-y-3 text-center">

                                {/* BADGE */}
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

                                    <Sparkles className="h-4 w-4" />

                                    Reset Password
                                </div>

                                {/* TITLE */}
                                <h1 className="text-3xl font-black leading-[1] tracking-[-2px] text-slate-950 sm:text-4xl dark:text-white">

                                    Create New
                                    <span className="block text-emerald-600 dark:text-emerald-500">
                                        Password
                                    </span>
                                </h1>

                                {/* DESCRIPTION */}
                                <p className="mx-auto max-w-md text-sm leading-7 text-slate-500 dark:text-zinc-400">
                                    Your new password should be strong and secure.
                                </p>
                            </div>

                            {/* FORM */}
                            <form className="mt-7 space-y-4">

                                {/* PASSWORD */}
                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                        New Password
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                        <Lock className="h-5 w-5 text-slate-400 transition-colors duration-300 group-focus-within:text-emerald-500" />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter new password"
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
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                                        Confirm Password
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-emerald-300 dark:border-white/10 dark:bg-[#09090B] dark:focus-within:border-emerald-500/30">

                                        <Lock className="h-5 w-5 text-slate-400 transition-colors duration-300 group-focus-within:text-emerald-500" />

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm new password"
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
                                </div>

                                {/* SECURITY */}
                                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                                            <ShieldCheck className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                                                Password Requirements
                                            </h3>

                                            <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-zinc-400">
                                                Use at least 8 characters including uppercase,
                                                lowercase, number, and special character.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <Button
                                    type="submit"
                                    className="group h-14 w-full rounded-2xl bg-emerald-500 px-5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-emerald-600"
                                >

                                    Update Password

                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </form>

                            {/* FOOTER */}
                            <p className="mt-6 text-center text-sm leading-6 text-slate-500 dark:text-zinc-400">

                                Back to{" "}

                                <Link
                                    href="/login"
                                    className="font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-500 dark:text-emerald-400"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppBackground>
    )
}