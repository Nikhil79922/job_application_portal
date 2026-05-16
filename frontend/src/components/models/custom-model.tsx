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
  X,
} from "lucide-react"

import {
  downloadCareerGuide,
} from "@/features/ai-pages/career-guide/utils/download-career-guide"

import {
  VisuallyHidden,
} from "@radix-ui/react-visually-hidden"

import {
  cn,
} from "@/lib/utils"

import {
  Button,
} from "../ui/button"

import {
  CustomModalProps,
} from "@/types/global/model.types"

const CustomModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  showDownload,
  onDownload,
}: CustomModalProps) => {

  const [
    downloading,
    setDownloading,
  ] = useState(false)

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

        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-white/10">

          {/* LEFT */}

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

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            {/* DOWNLOAD */}

            {showDownload && (

              <Button
                onClick={async () => {

                  try {

                    setDownloading(true)

                    if (onDownload) {
                      onDownload()
                    }

                    /* CAREER GUIDE */

                    // @ts-ignore
                    if (
                      title ===
                      "AI Career Roadmap"
                    ) {

                      // @ts-ignore
                      if (
                        window.__careerGuideResponse
                      ) {

                        await downloadCareerGuide(
                          // @ts-ignore
                          window.__careerGuideResponse
                        )
                      }
                    }

                    /* RESUME ANALYSIS */

                    // @ts-ignore
                    if (
                      title ===
                      "ATS Resume Analysis"
                    ) {

                      const {
                        downloadResumeAnalysis,
                      } = await import(
                        "@/features/ai-pages/resumer-analyser/utils/download-resume-analysis"
                      )

                      // @ts-ignore
                      if (
                        window.__resumeAnalysisResponse
                      ) {

                        await downloadResumeAnalysis(
                          // @ts-ignore
                          window.__resumeAnalysisResponse
                        )
                      }
                    }

                    setTimeout(() => {

                      setDownloading(
                        false
                      )

                    }, 1800)

                  } catch {

                    setDownloading(
                      false
                    )
                  }
                }}
                className="group h-10 cursor-pointer rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-4 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.12] active:scale-[0.98] dark:text-emerald-400 dark:hover:bg-emerald-500/[0.14] cursor-pointer"
              
              >

                {/* ICON */}

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

            <Button
  type="button"
  variant="outline"
  size="icon"
  onClick={() =>
    onOpenChange(false)
  }
  className="h-10 w-10 rounded-xl border-slate-200 text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
>

  <X className="h-4 w-4 shrink-0" />
</Button>
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