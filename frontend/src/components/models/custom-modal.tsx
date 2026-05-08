"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { X } from "lucide-react"

import { cn } from "@/lib/utils"

interface CustomModalProps {
  open: boolean

  onOpenChange: (
    open: boolean
  ) => void

  title?: string

  description?: string

  children: React.ReactNode

  className?: string
}

const CustomModal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: CustomModalProps) => {

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
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
          className="
            flex
            items-start
            justify-between

            border-b
            border-slate-200

            px-6
            py-5

            dark:border-white/10
          "
        >

          <div>

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

          {/* CLOSE */}
          <button
            onClick={() =>
              onOpenChange(false)
            }
            className="
            cursor-pointer
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-lg

              text-slate-500

              transition-colors

              hover:bg-slate-100
              hover:text-slate-700

              dark:text-zinc-400
              dark:hover:bg-white/5
              dark:hover:text-white
            "
          >

            <X className="h-4 w-4 " />

          </button>
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