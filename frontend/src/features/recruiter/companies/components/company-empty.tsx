
import { Building2, Plus, Search } from "lucide-react"

interface EmptyProps {
  onCreate: () => void
  hasQuery?: boolean
}

export function CompanyEmpty({ onCreate, hasQuery }: EmptyProps) {
  if (hasQuery) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50/70 py-16 text-center dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-white/[0.05] dark:text-zinc-600">
          <Search className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg font-black tracking-[-0.5px] text-slate-950 dark:text-white">
          No results found
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
          No companies match your search. Try a different name.
        </p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-dashed border-slate-300 bg-slate-50/70 py-16 text-center dark:border-white/10 dark:bg-white/[0.02]">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/6 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Building2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-black tracking-[-0.7px] text-slate-950 dark:text-white">
          No Companies Yet
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500 dark:text-zinc-400">
          Create your first hiring brand to start posting jobs and building your recruiter presence on Talent Forge.
        </p>
        <button
          onClick={onCreate}
          className="mt-7 flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)] transition hover:bg-emerald-600 hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Create Your First Company
        </button>
      </div>
    </div>
  )
}

export default CompanyEmpty
