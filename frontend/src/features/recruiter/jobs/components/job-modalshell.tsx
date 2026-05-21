import { Button } from "@/components/ui/button"
import { Sparkles, X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

/* ═══════════════════════════════════════════════════════════ */
/* MODAL SHELL */
/* ═══════════════════════════════════════════════════════════ */

interface ModalShellProps {
    open: boolean
    onClose: () => void
    title: string
    subtitle: string
    pill: string
    children: React.ReactNode
  }

export function ModalShell({
    open,
    onClose,
    title,
    subtitle,
    pill,
    children,
  }: ModalShellProps) {
  
    const [
      mounted,
      setMounted,
    ] = useState(false)
  
    useEffect(() => {
  
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true)
  
    }, [])
  
    useEffect(() => {
  
      if (!open) return
  
      const prev =
        document.body.style.overflow
  
      document.body.style.overflow =
        "hidden"
  
      return () => {
  
        document.body.style.overflow =
          prev
      }
  
    }, [open])
  
    if (
      !mounted ||
      !open
    ) {
      return null
    }
  
    return createPortal(
  
      <div
        className="
          fixed inset-0
          z-[999999]
          flex items-end
          justify-center
          bg-black/70
          backdrop-blur-xl
          sm:items-center
        "
        onClick={(e) =>
          e.target ===
          e.currentTarget &&
          onClose()
        }
      >
  
        <div
          className="
            relative flex
            h-[92vh] w-full
            flex-col overflow-hidden
            rounded-t-[30px]
            border border-slate-200
            bg-white
            shadow-[0_40px_120px_rgba(0,0,0,0.15)]
            dark:border-white/10
            dark:bg-[#0B0B0B]
            sm:h-auto
            sm:max-h-[92vh]
            sm:max-w-5xl
            sm:rounded-[34px]
          "
        >
  
          {/* AMBIENT */}
  
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.06),transparent_30%)]
              dark:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.08),transparent_30%)]
            "
          />
  
          <div
            className="
              absolute inset-x-0 top-0
              h-[2px]
              bg-gradient-to-r
              from-transparent
              via-emerald-400/60
              to-transparent
            "
          />
  
          {/* HEADER */}
  
          <div
            className="
              relative z-10
              flex shrink-0
              items-start
              justify-between
              border-b border-slate-200
              px-4 py-4
              dark:border-white/10
              sm:px-6 sm:py-5
              lg:px-8
            "
          >
  
            <div
              className="
                min-w-0 flex-1
              "
            >
  
              <div
                className="
                  inline-flex items-center
                  gap-2 rounded-full
                  border border-emerald-200
                  bg-emerald-50
                  px-3 py-1
                  text-[10px]
                  font-bold uppercase
                  tracking-[0.16em]
                  text-emerald-700
                  dark:border-emerald-500/20
                  dark:bg-emerald-500/10
                  dark:text-emerald-400
                "
              >
  
                <Sparkles
                  className="
                    h-3.5 w-3.5
                  "
                />
  
                {pill}
              </div>
  
              <h2
                className="
                  mt-4 text-2xl
                  font-black
                  tracking-[-0.08em]
                  text-slate-900
                  dark:text-white
                  sm:text-3xl
                "
              >
                {title}
              </h2>
  
              <p
                className="
                  mt-2 max-w-xl
                  text-sm leading-7
                  text-slate-500
                  dark:text-zinc-400
                "
              >
                {subtitle}
              </p>
            </div>
  
            <Button
              onClick={onClose}
              className="
                ml-4 flex
                h-10 w-10
                shrink-0 items-center
                justify-center
                rounded-2xl
                border border-slate-200
                bg-slate-100
                p-0 text-slate-600
                transition-all duration-300
                hover:rotate-90
                hover:bg-slate-200
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-zinc-300
                dark:hover:bg-white/[0.06]
              "
            >
  
              <X
                className="
                  h-4 w-4
                "
              />
            </Button>
          </div>
  
          {/* BODY */}
  
          <div
            className="
              relative z-10
              flex-1 overflow-y-auto
              px-4 py-6
              sm:px-6
              lg:px-8
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
  
            {children}
          </div>
        </div>
      </div>,
  
      document.body
    )
  }