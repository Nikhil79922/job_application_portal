/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth.store"
import {
  Briefcase, Building2, CheckCircle2, CircleDashed,
  ShieldCheck, TrendingUp, Users, Zap, Plus, X,
  Upload, Globe, FileText, Layers, AlertCircle, Loader2,
  Sparkles
} from "lucide-react"
import { QuickNavCard } from "@/components/shared/quickNavCard"

// /* ─────────────────────────────────────────────
//    Add Company Modal
// ───────────────────────────────────────────── */
// function AddCompanyModal({
//   open,
//   onClose,
//   token,
//   onSuccess,
// }: {
//   open: boolean
//   onClose: () => void
//   token: string
//   onSuccess: (company: { name: string; description: string; website: string }) => void
// }) {
//   const [name, setName]               = useState("")
//   const [description, setDescription] = useState("")
//   const [website, setWebsite]         = useState("")
//   const [logo, setLogo]               = useState<File | null>(null)
//   const [logoPreview, setLogoPreview] = useState<string | null>(null)
//   const [loading, setLoading]         = useState(false)
//   const [error, setError]             = useState<string | null>(null)
//   const fileRef                       = useRef<HTMLInputElement>(null)

//   if (!open) return null

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     setLogo(file)
//     setLogoPreview(URL.createObjectURL(file))
//   }

//   const reset = () => {
//     setName(""); setDescription(""); setWebsite("")
//     setLogo(null); setLogoPreview(null); setError(null)
//   }

//   const handleClose = () => { reset(); onClose() }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!name.trim()) { setError("Company name is required."); return }
//     setLoading(true); setError(null)

//     try {
//       const fd = new FormData()
//       fd.append("name", name)
//       fd.append("description", description)
//       fd.append("website", website)
//       if (logo) fd.append("file", logo)

//       const res = await fetch("http://localhost:8080/api/job/company/new", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: fd,
//       })

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}))
//         throw new Error(data?.message ?? `Server error ${res.status}`)
//       }

//       onSuccess({ name, description, website })
//       handleClose()
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     /* Backdrop */
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
//     >
//       {/* Blurred overlay */}
//       <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

//       {/* Panel */}
//       <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111]">
//         {/* Decorative blobs */}
//         <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-500/8 blur-3xl" />

//         <div className="relative z-10 p-6">
//           {/* Header */}
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
//                 <Building2 className="h-5 w-5" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-black tracking-[-0.5px] text-slate-950 dark:text-white">Add Company</h3>
//                 <p className="text-[11px] text-slate-400 dark:text-zinc-500">Create your hiring brand profile</p>
//               </div>
//             </div>
//             <button
//               onClick={handleClose}
//               className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-zinc-200"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             {/* Logo Upload */}
//             <div
//               onClick={() => fileRef.current?.click()}
//               className="group relative flex cursor-pointer items-center gap-4 rounded-[18px] border border-dashed border-slate-300 bg-slate-50/60 p-4 transition-all hover:border-violet-400 hover:bg-violet-50/30 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-500/40 dark:hover:bg-violet-500/[0.04]"
//             >
//               <input
//                 ref={fileRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleFile}
//               />
//               {logoPreview ? (
//                 <img src={logoPreview} alt="Logo preview" className="h-14 w-14 rounded-2xl object-cover ring-2 ring-violet-200 dark:ring-violet-500/20" />
//               ) : (
//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-600">
//                   <Upload className="h-5 w-5" />
//                 </div>
//               )}
//               <div>
//                 <p className="text-sm font-bold text-slate-700 dark:text-zinc-200">
//                   {logo ? logo.name : "Company Logo"}
//                 </p>
//                 <p className="text-[11px] text-slate-400 dark:text-zinc-500">
//                   {logo ? `${(logo.size / 1024).toFixed(1)} KB — click to change` : "PNG, JPG up to 5 MB — optional"}
//                 </p>
//               </div>
//             </div>

//             {/* Name */}
//             <div className="space-y-1.5">
//               <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
//                 Company Name *
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="e.g. Singh Infotech"
//                 className="w-full rounded-[14px] border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder-zinc-600 dark:focus:border-violet-500/50 dark:focus:bg-white/[0.06]"
//               />
//             </div>

//             {/* Website */}
//             <div className="space-y-1.5">
//               <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
//                 Website
//               </label>
//               <div className="relative">
//                 <Globe className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-600" />
//                 <input
//                   type="url"
//                   value={website}
//                   onChange={(e) => setWebsite(e.target.value)}
//                   placeholder="https://yourcompany.com"
//                   className="w-full rounded-[14px] border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder-zinc-600 dark:focus:border-violet-500/50 dark:focus:bg-white/[0.06]"
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-1.5">
//               <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
//                 Description
//               </label>
//               <div className="relative">
//                 <FileText className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 dark:text-zinc-600" />
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                   placeholder="Tell candidates what makes your company great..."
//                   className="w-full resize-none rounded-[14px] border border-slate-200 bg-slate-50/60 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder-zinc-600 dark:focus:border-violet-500/50 dark:focus:bg-white/[0.06]"
//                 />
//               </div>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-center gap-2.5 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/15 dark:bg-red-500/[0.06] dark:text-red-400">
//                 <AlertCircle className="h-4 w-4 shrink-0" />
//                 {error}
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex gap-3 pt-1">
//               <button
//                 type="button"
//                 onClick={handleClose}
//                 className="flex-1 rounded-[14px] border border-slate-200 bg-slate-50 py-3 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:bg-white/[0.06]"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-violet-600 to-violet-500 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition-all hover:shadow-[0_4px_28px_rgba(139,92,246,0.5)] hover:from-violet-500 hover:to-violet-400 disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <><Loader2 className="h-4 w-4 animate-spin" />Creating...</>
//                 ) : (
//                   <><Plus className="h-4 w-4" />Create Company</>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function RecruiterWorkspace({ user }: { user: ReturnType<typeof useAuthStore.getState>["user"] }) {
  if (!user) return null

  const router  = useRouter()
  const token   = useAuthStore.getState().accessToken ?? ""

  const [modalOpen, setModalOpen]         = useState(false)
  const [companies, setCompanies]         = useState<{ name: string; description: string; website: string }[]>([])
  const [successBanner, setSuccessBanner] = useState<string | null>(null)

  const handleCompanySuccess = (company: { name: string; description: string; website: string }) => {
    setCompanies((prev) => [...prev, company])
    setSuccessBanner(`"${company.name}" has been created successfully!`)
    setTimeout(() => setSuccessBanner(null), 4000)
  }

  // Profile strength items
  const profileItems = [
    { done: !!user.name,         label: "Full name",       sublabel: "Visible to all candidates" },
    { done: !!user.phone_number, label: "Phone number",    sublabel: "Direct candidate line" },
    { done: !!user.profile_pic,  label: "Profile photo",   sublabel: "3x more candidate trust" },
    { done: !!user.bio,          label: "Company bio",     sublabel: "Sets hiring context" },
    { done: !!user.email,        label: "Email verified",  sublabel: "Required for applications" },
  ]
  const profileDone       = profileItems.filter((i) => i.done).length
  const profileCompletion = Math.round((profileDone / profileItems.length) * 100)


  return (
    <>

      <div className="space-y-5">

        {/* ── Success Banner ── */}
        {successBanner && (
          <div className="flex items-center gap-3 rounded-[18px] border border-emerald-200 bg-emerald-50 px-5 py-3.5 dark:border-emerald-500/15 dark:bg-emerald-500/[0.08]">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{successBanner}</p>
          </div>
        )}

        {/* ── Quick Navigation ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111]">

{/* BACKGROUND GLOW */}

<div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

<div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_30%)]" />

<div className="relative z-10 p-6 lg:p-8">

  {/* HEADER */}

  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

    <div>

      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-500/10 dark:bg-indigo-500/10 dark:text-indigo-400">

        <Layers className="h-3.5 w-3.5" />

        Recruiter Workspace
      </div>

      <h2 className="mt-4 text-3xl font-black tracking-[-1.5px] text-slate-950 dark:text-white">

        Navigate Your Workspace
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-zinc-400">

        Access your complete hiring ecosystem including company management, intelligent hiring workflows, candidate pipelines, and recruitment analytics.
      </p>
    </div>

    {/* STATUS */}

    <div className="flex items-center gap-4 rounded-[26px] border border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/10 text-indigo-500">

        <Sparkles className="h-6 w-6" />
      </div>

      <div>

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">

          Workspace Status
        </p>

        <h3 className="mt-1 text-xl font-black tracking-[-1px] text-slate-900 dark:text-white">

          Ready to Hire
        </h3>
      </div>
    </div>
  </div>

  {/* QUICK ACCESS */}

  <div className="mt-8 grid gap-4 sm:grid-cols-2">

    <QuickNavCard
      icon={
        <Building2 className="h-5 w-5" />
      }
      title="Companies"
      desc="Manage your company profiles, branding, and hiring identity."
      href="/recruiter/companies"
      accent="border-violet-200/80 dark:border-violet-500/20"
      iconBg="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
      badgeText="Open Companies"
      badgeCls="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/15 dark:bg-violet-500/10 dark:text-violet-400"
    />

    <QuickNavCard
      icon={
        <Briefcase className="h-5 w-5" />
      }
      title="Jobs"
      desc="Create, publish, and manage job openings for active candidates."
      href="/recruiter/jobs"
      accent="border-cyan-200/80 dark:border-cyan-500/20"
      iconBg="bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400"
      badgeText="Open Jobs"
      badgeCls="border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/15 dark:bg-cyan-500/10 dark:text-cyan-400"
    />

  </div>
</div>
</div>

        {/* ── Profile Trust & Credibility ───────────────────────────────── */}
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#111111]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.025] via-transparent to-transparent" />
          <div className="relative z-10 p-6 lg:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">Trust &amp; Credibility</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                  A complete recruiter profile builds confidence with candidates and increases application rates by up to 3x.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profileItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-[18px] border p-4 transition-all ${
                    item.done
                      ? "border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-500/15 dark:bg-emerald-500/[0.05]"
                      : "border-slate-200 bg-slate-50/60 dark:border-white/10 dark:bg-white/[0.02]"
                  }`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    item.done
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "border-slate-200 bg-white text-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-700"
                  }`}>
                    {item.done ? <CheckCircle2 className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold ${item.done ? "text-slate-800 dark:text-zinc-100" : "text-slate-400 dark:text-zinc-600"}`}>{item.label}</p>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-600">{item.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/[0.06]">
              <p className="text-[11px] text-slate-400 dark:text-zinc-600">{profileDone} of {profileItems.length} profile items complete</p>
              {profileDone === profileItems.length ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Fully Verified
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow-700 dark:border-yellow-500/10 dark:bg-yellow-500/10 dark:text-yellow-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  </span>
                  In Progress
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}