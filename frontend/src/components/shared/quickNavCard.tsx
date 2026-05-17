import { ArrowUpRight, ChevronRight } from "lucide-react"

/* ─────────────────────────────────────────────
   Quick-Nav Card — opens new tab
───────────────────────────────────────────── */
export function QuickNavCard({
    icon,
    title,
    desc,
    href,
    accent,
    iconBg,
    badgeText,
    badgeCls,
  }: {
    icon: React.ReactNode
    title: string
    desc: string
    href: string
    accent: string
    iconBg: string
    badgeText: string
    badgeCls: string
  }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col overflow-hidden rounded-[22px] border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.10)] dark:bg-white/[0.03] ${accent}`}
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${iconBg}`}>
            {icon}
          </div>
          <div className="flex items-center gap-1.5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ArrowUpRight className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
          </div>
        </div>
  
        <div className="mt-4 flex-1">
          <h4 className="text-sm font-black tracking-[-0.3px] text-slate-900 dark:text-white">{title}</h4>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-zinc-400">{desc}</p>
        </div>
  
        <div className="mt-4">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeCls}`}>
            <ChevronRight className="h-3 w-3" />
            {badgeText}
          </span>
        </div>
      </a>
    )
  }