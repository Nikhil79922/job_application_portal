export default function FuturisticLoader() {
    return (
      <div className="fixed inset-0 z-[9999] overflow-hidden bg-background">
  
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_50%)]" />
  
        {/* Top Progress */}
        <div className="absolute left-0 top-0 h-[2px] w-full overflow-hidden bg-border/20">
          <div className="h-full w-1/4 animate-[loader_1.2s_ease-in-out_infinite] rounded-full bg-emerald-500" />
        </div>
  
        {/* Main Content */}
        <div className="relative flex h-full items-center justify-center">
  
          <div className="flex flex-col items-center gap-8">
  
            {/* Loader */}
            <div className="relative flex items-center justify-center">
  
              {/* Rotating Border */}
              <div className="h-24 w-24 animate-spin rounded-[2rem] border-[3px] border-emerald-500/10 border-t-emerald-500 border-r-emerald-400 duration-1000" />
  
              {/* Inner Card */}
              <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card/80 shadow-[0_10px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">
  
                {/* Animated Check */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-8 w-8 animate-pulse rounded-full bg-emerald-500/10" />
  
                  <svg
                    className="relative h-5 w-5 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            </div>
  
            {/* Content */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-sm font-semibold tracking-[0.3em] text-foreground uppercase">
                Setting Things Up
              </h2>
  
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                Optimizing your experience and preparing your workspace.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  