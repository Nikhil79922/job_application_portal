"use client"

import { useRef, useEffect } from "react"
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
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { createCompanySchema, type CreateCompanyFormValues } from "../schemas/company.schemas"

interface Props {
    isSubmitting?: boolean
    onSubmit: (values: CreateCompanyFormValues) => void
    onClose: () => void
}

// Shared input classes
const inputBase =
    "h-12 w-full rounded-2xl border bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-4 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600"
const inputNormal =
    "border-slate-200 focus:border-emerald-400 focus:ring-emerald-500/10 dark:border-white/10 dark:focus:border-emerald-500/60"
const inputError =
    "border-red-300 focus:border-red-400 focus:ring-red-500/10 dark:border-red-500/30"

function FieldError({ message }: { message?: string }) {
    if (!message) return null
    return (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {message}
        </p>
    )
}

export default function CompanyForm({ isSubmitting, onSubmit, onClose }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const firstInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateCompanyFormValues>({
        resolver: zodResolver(createCompanySchema),
        defaultValues: { name: "", description: "", website: "" },
    })

    const file = watch("file")
    const preview = file ? URL.createObjectURL(file) : null

    // Auto-focus first input + close on Escape
    useEffect(() => {
        const t = setTimeout(() => firstInputRef.current?.focus(), 100)
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        window.addEventListener("keydown", handler)
        return () => { clearTimeout(t); window.removeEventListener("keydown", handler) }
    }, [onClose])

    return (
        <>
            <style>{`
        @keyframes backdropIn { from { opacity:0 } to { opacity:1 } }
        @keyframes panelIn { from { opacity:0; transform:scale(0.96) translateY(16px) } to { opacity:1; transform:scale(1) translateY(0) } }
        .company-backdrop { animation: backdropIn 0.2s ease both }
        .company-panel    { animation: panelIn 0.28s cubic-bezier(0.34,1.3,0.64,1) both }
      `}</style>

            {/* Backdrop */}
            <div
                className="company-backdrop fixed inset-0 z-[998] bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="company-panel pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_32px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Accent line */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 opacity-80" />

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">
                                    Create Company
                                </h2>
                                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                                    Add a new hiring brand to your workspace
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 px-6 py-6">

                            {/* Logo uploader */}
                            <div className="flex flex-col items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[22px] border-2 border-dashed border-slate-300 bg-slate-50 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/5"
                                >
                                    {preview ? (
                                        <Image src={preview} alt="Logo preview" fill className="object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-200 group-hover:scale-105 dark:bg-white/[0.06]">
                                                <ImagePlus className="h-5 w-5 text-slate-400 dark:text-zinc-500" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-600">
                                                Logo
                                            </span>
                                        </div>
                                    )}
                                </button>
                                {preview && (
                                    <button
                                        type="button"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        onClick={() => { setValue("file", undefined as any); inputRef.current && (inputRef.current.value = "") }}
                                        className="text-[11px] font-semibold text-slate-400 transition hover:text-red-500 dark:text-zinc-600"
                                    >
                                        Remove logo
                                    </button>
                                )}
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                        const f = e.target.files?.[0]
                                        if (f) setValue("file", f, { shouldValidate: true })
                                    }}
                                />
                            </div>

                            {/* Company name */}
                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                                    <input
                                        {...register("name")}
                                        ref={(element) => {

                                            register("name").ref(element)

                                            firstInputRef.current =
                                                element
                                        }}
                                        placeholder="e.g. Acme Corporation"
                                        className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                                    />
                                </div>
                                <FieldError message={errors.name?.message} />
                            </div>

                            {/* Website */}
                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                                    Website
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                                    <input
                                        {...register("website")}
                                        placeholder="https://company.com"
                                        className={`${inputBase} ${errors.website ? inputError : inputNormal}`}
                                    />
                                </div>
                                <FieldError message={errors.website?.message} />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                                    Description
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 h-4 w-4 text-slate-400 dark:text-zinc-500" />
                                    <textarea
                                        {...register("description")}
                                        rows={4}
                                        placeholder="Describe what your company does…"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pb-4 pl-11 pr-4 pt-3.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500/60"
                                    />
                                </div>
                                <FieldError message={errors.description?.message} />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-3 border-t border-slate-100 px-6 py-4 dark:border-white/[0.06]">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex h-11 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative flex h-11 flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 text-sm font-bold text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</>
                                ) : (
                                    "Create Company"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
