export function StatTile({
    icon,
    label,
    value,
    accent = "emerald",
  }: {
    icon: React.ReactNode
    label: string
    value: string | number
    accent?: "emerald" | "cyan" | "violet" | "yellow"
  }) {
    const colors = {
      emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      cyan:    "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
      violet:  "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      yellow:  "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
    }
    return (
      <div className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${colors[accent]}`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">{label}</p>
          <p className="mt-0.5 text-lg font-black leading-none tracking-[-0.5px] text-slate-950 dark:text-white">{value}</p>
        </div>
      </div>
    )
  }