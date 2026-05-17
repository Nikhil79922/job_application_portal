"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Loader2, Trash2, X, AlertTriangle } from "lucide-react"

interface Props {
  open: boolean
  companyName?: string
  isDeleting?: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function CompanyDeleteModal({
  open,
  companyName,
  isDeleting,
  onClose,
  onConfirm,
}: Props) {
  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && !isDeleting) onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, isDeleting, onClose])

  if (!open) return null

  return createPortal(
    <>
      <style>{`
        @keyframes deleteBackdropIn { from{opacity:0} to{opacity:1} }
        @keyframes deletePanelIn { from{opacity:0;transform:scale(0.95) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .del-backdrop { animation: deleteBackdropIn 0.18s ease both }
        .del-panel    { animation: deletePanelIn 0.22s cubic-bezier(0.34,1.2,0.64,1) both }
      `}</style>

      {/* Backdrop */}
      <div
        className="del-backdrop fixed inset-0 z-[998] bg-black/70 backdrop-blur-md"
        onClick={() => !isDeleting && onClose()}
      />

      {/* Panel */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="del-panel pointer-events-auto w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_32px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#111111] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Red accent line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-400 via-red-500 to-rose-400 opacity-80" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                <Trash2 className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-[-0.5px] text-slate-950 dark:text-white">
                  Delete Company
                </h2>
                <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {/* Warning banner */}
            <div className="flex items-start gap-3 rounded-[18px] border border-red-200 bg-red-50/70 p-4 dark:border-red-500/10 dark:bg-red-500/[0.05]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/15 dark:text-red-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <p className="text-sm leading-6 text-red-800 dark:text-red-300/80">
                Permanently delete{" "}
                <span className="font-black text-red-900 dark:text-red-200">{companyName}</span>?
                {" "}All associated job listings and data will be lost.
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex h-11 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 text-sm font-bold text-white shadow-[0_4px_16px_rgba(239,68,68,0.3)] transition hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.4)] active:scale-[0.98] disabled:opacity-60"
              >
                {isDeleting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Deleting…</>
                ) : (
                  <><Trash2 className="h-4 w-4" /> Delete Company</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  )
}
