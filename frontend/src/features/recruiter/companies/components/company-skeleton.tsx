
export function CompanySkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111111]">
      <div className="animate-pulse">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-[18px] bg-slate-200 dark:bg-white/10" />
            <div className="space-y-2.5">
              <div className="h-4 w-36 rounded-full bg-slate-200 dark:bg-white/10" />
              <div className="h-3 w-52 rounded-full bg-slate-200 dark:bg-white/10" />
              <div className="h-3 w-44 rounded-full bg-slate-200 dark:bg-white/10" />
            </div>
          </div>
          <div className="h-9 w-9 shrink-0 rounded-[12px] bg-slate-200 dark:bg-white/10" />
        </div>
        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/[0.06]">
          <div className="h-3.5 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="h-3.5 w-20 rounded-full bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default CompanySkeleton
