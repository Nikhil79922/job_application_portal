/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Check,
  Download,
} from "lucide-react"
import {
  downloadCareerGuide,
} from "@/lib/download-career-guide"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { CustomModalProps } from "@/types/global/model.types"

const CustomModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: CustomModalProps) => {
  const [downloading, setDownloading] =
    useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(
        value
      ) => {

        // ONLY ALLOW OPEN
        if (value) {
          onOpenChange(true)
        }
      }}
    >

      <DialogContent
        showCloseButton={false}
        className={cn(
          `
          overflow-hidden

          border
          border-slate-200

          bg-white
          p-0

          shadow-2xl

          sm:max-w-4xl

          dark:border-white/10
          dark:bg-[#09090B]
        `,
          className
        )}
      >

        {/* ACCESSIBILITY */}
        <VisuallyHidden>

          <DialogTitle>
            {title || "Modal"}
          </DialogTitle>

        </VisuallyHidden>

        {/* HEADER */}
        <div
          className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-white/10"
        >

          <div className="flex-1">

            {title && (

              <h2
                className="
      text-2xl
      font-semibold
      tracking-[-0.5px]

      text-slate-950
      dark:text-white
    "
              >
                {title}
              </h2>
            )}

            {description && (

              <p
                className="
      mt-1.5

      max-w-2xl

      text-sm
      leading-6

      text-slate-500
      dark:text-zinc-400
    "
              >
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">

            {/* DOWNLOAD */}

            {title === "AI Career Roadmap" && (

              <Button
                onClick={async () => {

                  // @ts-ignore
                  if (window.__careerGuideResponse) {

                    setDownloading(true)

                    await downloadCareerGuide(
                      // @ts-ignore
                      window.__careerGuideResponse
                    )

                    setTimeout(() => {
                      setDownloading(false)
                    }, 1800)
                  }
                }}
                className="group h-10  cursor-pointer rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12] active:scale-[0.98] dark:text-emerald-400 dark:hover:bg-emerald-500/[0.14]"
              >
                <div className="relative flex items-center justify-center w-4 h-4 mr-2 overflow-hidden">

                  <Download
                    className={cn(
                      "absolute h-4 w-4 transition-all duration-500",
                      downloading
                        ? "translate-y-6 opacity-0"
                        : "translate-y-0 opacity-100"
                    )}
                  />

                  <Check
                    className={cn(
                      "absolute h-4 w-4 transition-all duration-500",
                      downloading
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-6 opacity-0"
                    )}
                  />
                </div>

                {downloading
                  ? "Downloaded"
                  : "Download Report"}
              </Button>
            )}

            {/* CLOSE */}

            <button
              onClick={() =>
                onOpenChange(false)
              }
              className="flex items-center justify-center w-10 h-10 transition-all duration-300 border cursor-pointer rounded-xl border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
            >

              <X className="w-4 h-4" />

            </button>
          </div>

        </div>

        {/* BODY */}
        <div
          className="
            max-h-[78vh]
            overflow-y-auto

            px-6
            py-6
          "
        >

          {children}

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal