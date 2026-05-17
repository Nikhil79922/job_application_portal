import { CheckCircle2, CircleDashed } from "lucide-react"

export function CheckItem({
    done,
    label,
    sublabel,
  }: {
    done: boolean
    label: string
    sublabel?: string
  }) {
    return (
      <div className="flex items-center gap-3">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
            done
              ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "border-slate-200 bg-slate-50 text-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-700"
          }`}
        >
          {done ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <CircleDashed className="h-3.5 w-3.5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-semibold ${
              done
                ? "text-slate-800 dark:text-zinc-200"
                : "text-slate-400 dark:text-zinc-600"
            }`}
          >
            {label}
          </p>
          {sublabel && (
            <p className="text-[11px] text-slate-400 dark:text-zinc-600">{sublabel}</p>
          )}
        </div>
      </div>
    )
  }
