"use client"

import { ReactNode } from "react"

interface AppBackgroundProps {
  children: ReactNode
  className?: string
}

const AppBackground = ({
  children,
  className = "",
}: AppBackgroundProps) => {
  return (
    <section
      className={`relative isolate overflow-hidden bg-white dark:bg-[#09090B] ${className}`}
    >

      {/* BASE */}
      <div className="absolute inset-0 -z-50 bg-white dark:bg-[#09090B]" />

      {/* RANDOM LIGHT EMERALD BLOBS */}

      {/* TOP LEFT */}
      <div className="absolute left-[-140px] top-[-120px] -z-40 h-[420px] w-[420px] rounded-full bg-emerald-400/[0.08] blur-[160px]" />

      {/* TOP RIGHT */}
      <div className="absolute right-[-120px] top-[6%] -z-40 h-[360px] w-[360px] rounded-full bg-emerald-300/[0.07] blur-[150px]" />

      {/* CENTER RANDOM */}
      <div className="absolute left-[28%] top-[22%] -z-40 h-[260px] w-[260px] rounded-full bg-emerald-500/[0.05] blur-[120px]" />

      {/* CENTER RIGHT */}
      <div className="absolute right-[22%] top-[32%] -z-40 h-[220px] w-[220px] rounded-full bg-emerald-400/[0.05] blur-[110px]" />

      {/* BOTTOM LEFT */}
      <div className="absolute bottom-[-120px] left-[10%] -z-40 h-[360px] w-[360px] rounded-full bg-emerald-500/[0.06] blur-[170px]" />

      {/* BOTTOM RIGHT */}
      <div className="absolute bottom-[-140px] right-[12%] -z-40 h-[340px] w-[340px] rounded-full bg-emerald-300/[0.05] blur-[160px]" />

      {/* SMALL LIGHTS */}
      <div className="absolute left-[18%] top-[55%] -z-40 h-[120px] w-[120px] rounded-full bg-emerald-400/[0.06] blur-[90px]" />

      <div className="absolute right-[32%] top-[14%] -z-40 h-[100px] w-[100px] rounded-full bg-emerald-300/[0.07] blur-[85px]" />

      <div className="absolute left-[60%] bottom-[18%] -z-40 h-[140px] w-[140px] rounded-full bg-emerald-500/[0.05] blur-[95px]" />

      {/* LARGE GRID */}
      <div
        className="
          absolute inset-0 -z-30
          bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)]
          bg-[size:72px_72px]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
        "
      />

      {/* SMALL GRID */}
      <div
        className="
          absolute inset-0 -z-20 opacity-40
          bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)]
          bg-[size:36px_36px]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)]
        "
      />

      {/* SOFT DEPTH */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.18)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.22)_100%)]" />

      {/* LIGHT ATMOSPHERE */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.035),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.03),transparent_26%)]" />

      {/* SUBTLE NOISE */}
      <div className="absolute inset-0 -z-10 opacity-[0.01] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export default AppBackground