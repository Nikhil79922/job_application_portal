"use client"

import { useSyncExternalStore } from "react"
import { Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

const ThemeToggle = () => {
  const mounted = useMounted()

  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <div className="bg-white border shadow-sm h-11 w-11 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-zinc-900" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
<Button
  type="button"
  variant="outline"
  size="icon"
  onClick={() =>
    setTheme(isDark ? "light" : "dark")
  }
  aria-label="Toggle Theme"
  className={cn(
    "group relative h-11 w-11 overflow-hidden rounded-2xl transition-all duration-500 ease-out",

    // LIGHT
    "border-slate-200 bg-white shadow-sm",
    "hover:-translate-y-[1px]",
    "hover:border-emerald-200",
    "hover:bg-white",
    "hover:shadow-[0_10px_30px_rgba(16,185,129,0.10)]",

    // DARK
    "dark:border-white/10 dark:bg-zinc-900",
    "dark:hover:border-emerald-500/20",
    "dark:hover:bg-zinc-800",
    "dark:hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]"
  )}
>

  {/* GLOW */}
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

  {/* SUN */}
  <SunMedium
    className={cn(
      "absolute h-[18px] w-[18px] text-amber-500 transition-all duration-500 ease-out",
      isDark
        ? "rotate-90 scale-0 opacity-0"
        : "rotate-0 scale-100 opacity-100"
    )}
  />

  {/* MOON */}
  <Moon
    className={cn(
      "absolute h-[18px] w-[18px] text-slate-700 transition-all duration-500 ease-out dark:text-zinc-200",
      isDark
        ? "rotate-0 scale-100 opacity-100"
        : "-rotate-90 scale-0 opacity-0"
    )}
  />

  {/* STATUS DOT */}
  <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-70 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
</Button>
  )
}

export default ThemeToggle