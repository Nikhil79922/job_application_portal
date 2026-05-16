import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Move, User2, X } from "lucide-react"

interface CropRegion {
    x: number
    y: number
    size: number
}

export function CropModal({
    imageSrc,
    userName,
    onConfirm,
    onClose,
}: {
    imageSrc: string
    userName: string
    onConfirm: (croppedDataUrl: string) => void
    onClose: () => void
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Crop region in *display* coordinates (px relative to displayed image)
    const [crop, setCrop] = useState<CropRegion>({ x: 60, y: 60, size: 200 })
    const [dragging, setDragging] = useState<
        "move" | "resize-br" | "resize-bl" | "resize-tr" | "resize-tl" | null
    >(null)
    const [imgRect, setImgRect] = useState({ w: 0, h: 0, offsetX: 0, offsetY: 0 })
    const dragStart = useRef({ mx: 0, my: 0, cx: 0, cy: 0, cs: 0 })
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [imgNaturalSize, setImgNaturalSize] = useState({ w: 1, h: 1 })

    // Measure displayed image bounds after it loads
    const measureImage = useCallback(() => {
        const img = imgRef.current
        const container = containerRef.current
        if (!img || !container) return
        const cr = container.getBoundingClientRect()
        const ir = img.getBoundingClientRect()
        setImgRect({
            w: ir.width,
            h: ir.height,
            offsetX: ir.left - cr.left,
            offsetY: ir.top - cr.top,
        })
        // Re-center crop
        const s = Math.min(ir.width, ir.height) * 0.5
        setCrop({
            x: (ir.width - s) / 2,
            y: (ir.height - s) / 2,
            size: s,
        })
    }, [])

    useEffect(() => {
        window.addEventListener("resize", measureImage)
        return () => window.removeEventListener("resize", measureImage)
    }, [measureImage])

    // Draw preview into canvas whenever crop changes
    useEffect(() => {
        const img = imgRef.current
        const canvas = canvasRef.current
        if (!img || !canvas || imgRect.w === 0) return

        const scaleX = imgNaturalSize.w / imgRect.w
        const scaleY = imgNaturalSize.h / imgRect.h

        const sx = Math.max(0, crop.x * scaleX)
        const sy = Math.max(0, crop.y * scaleY)
        const sw = Math.min(crop.size * scaleX, imgNaturalSize.w - sx)
        const sh = Math.min(crop.size * scaleY, imgNaturalSize.h - sy)

        const OUT = 300
        canvas.width = OUT
        canvas.height = OUT
        const ctx = canvas.getContext("2d")!
        ctx.clearRect(0, 0, OUT, OUT)

        // Circular clip
        ctx.beginPath()
        ctx.arc(OUT / 2, OUT / 2, OUT / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUT, OUT)

        setPreviewUrl(canvas.toDataURL("image/png"))
    }, [crop, imgRect, imgNaturalSize])

    // ── pointer helpers ──────────────────────────────────────────────────────────

    const clampCrop = (c: CropRegion, iw: number, ih: number): CropRegion => {
        const MIN = 60
        const s = Math.max(MIN, Math.min(c.size, iw, ih))
        const x = Math.max(0, Math.min(c.x, iw - s))
        const y = Math.max(0, Math.min(c.y, ih - s))
        return { x, y, size: s }
    }

    const onPointerDown = (
        e: React.PointerEvent,
        type: typeof dragging
    ) => {
        e.preventDefault()
        e.stopPropagation()
            ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
        setDragging(type)
        dragStart.current = {
            mx: e.clientX,
            my: e.clientY,
            cx: crop.x,
            cy: crop.y,
            cs: crop.size,
        }
    }

    const onPointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!dragging) return
            const dx = e.clientX - dragStart.current.mx
            const dy = e.clientY - dragStart.current.my
            const { cx, cy, cs } = dragStart.current

            let next: CropRegion

            if (dragging === "move") {
                next = clampCrop({ x: cx + dx, y: cy + dy, size: cs }, imgRect.w, imgRect.h)
            } else {
                // Resize — use the dominant axis delta for square constraint
                const delta =
                    dragging === "resize-br" || dragging === "resize-tr"
                        ? Math.max(dx, -dy * (dragging === "resize-tr" ? 1 : -1))
                        : Math.max(-dx, dy)

                const newSize = Math.max(60, cs + delta)
                let newX = cx
                let newY = cy

                if (dragging === "resize-bl") newX = cx + cs - newSize
                if (dragging === "resize-tr") newY = cy + cs - newSize
                if (dragging === "resize-tl") {
                    newX = cx + cs - newSize
                    newY = cy + cs - newSize
                }

                next = clampCrop({ x: newX, y: newY, size: newSize }, imgRect.w, imgRect.h)
            }

            setCrop(next)
        },
        [dragging, imgRect]
    )

    const onPointerUp = () => setDragging(null)

    const handleConfirm = () => {
        if (previewUrl) onConfirm(previewUrl)
    }

    const HANDLE = 14 // handle size px

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl">
            <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0f] shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-bold text-white">Crop Profile Photo</h3>
                        <p className="mt-0.5 text-xs text-zinc-400">
                            Drag the square to reposition · drag corners to resize
                        </p>
                    </div>
                    <Button
                        type="button"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full border border-white/10 bg-white/5 text-white shadow-lg hover:bg-white/10"
                    >

                        <X className="h-5 w-5 shrink-0" />
                    </Button>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-6 p-6 lg:flex-row">

                    {/* ── Image + Crop Overlay ── */}
                    <div
                        ref={containerRef}
                        className="relative flex flex-1 select-none items-center justify-center overflow-hidden rounded-2xl bg-zinc-900"
                        style={{ minHeight: 320 }}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerLeave={onPointerUp}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt={userName}
                            onLoad={(e) => {
                                const img = e.currentTarget
                                setImgNaturalSize({ w: img.naturalWidth, h: img.naturalHeight })
                                measureImage()
                            }}
                            style={{ maxWidth: "100%", maxHeight: "60vh", display: "block", userSelect: "none" }}
                            draggable={false}
                        />

                        {/* Dark overlay outside crop */}
                        {imgRect.w > 0 && (
                            <svg
                                className="pointer-events-none absolute inset-0"
                                style={{ left: imgRect.offsetX, top: imgRect.offsetY, width: imgRect.w, height: imgRect.h }}
                                viewBox={`0 0 ${imgRect.w} ${imgRect.h}`}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <mask id="crop-mask">
                                        <rect width={imgRect.w} height={imgRect.h} fill="white" />
                                        <rect x={crop.x} y={crop.y} width={crop.size} height={crop.size} rx={crop.size / 2} fill="black" />
                                    </mask>
                                </defs>
                                <rect width={imgRect.w} height={imgRect.h} fill="rgba(0,0,0,0.55)" mask="url(#crop-mask)" />
                                {/* Crop border circle */}
                                <circle
                                    cx={crop.x + crop.size / 2}
                                    cy={crop.y + crop.size / 2}
                                    r={crop.size / 2}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.7)"
                                    strokeWidth={1.5}
                                    strokeDasharray="6 4"
                                />
                            </svg>
                        )}

                        {/* Draggable crop box (positioned over the image area) */}
                        {imgRect.w > 0 && (
                            <div
                                className="absolute"
                                style={{
                                    left: imgRect.offsetX + crop.x,
                                    top: imgRect.offsetY + crop.y,
                                    width: crop.size,
                                    height: crop.size,
                                    cursor: dragging === "move" ? "grabbing" : "grab",
                                    touchAction: "none",
                                }}
                                onPointerDown={(e) => onPointerDown(e, "move")}
                            >
                                {/* Move icon center */}
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <div className="rounded-full bg-black/40 p-1.5 backdrop-blur-sm">
                                        <Move className="h-5 w-5 text-white/80" />
                                    </div>
                                </div>

                                {/* Resize handles — corners */}
                                {(
                                    [
                                        { id: "resize-tl", style: { top: -HANDLE / 2, left: -HANDLE / 2, cursor: "nwse-resize" } },
                                        { id: "resize-tr", style: { top: -HANDLE / 2, right: -HANDLE / 2, cursor: "nesw-resize" } },
                                        { id: "resize-bl", style: { bottom: -HANDLE / 2, left: -HANDLE / 2, cursor: "nesw-resize" } },
                                        { id: "resize-br", style: { bottom: -HANDLE / 2, right: -HANDLE / 2, cursor: "nwse-resize" } },
                                    ] as const
                                ).map(({ id, style }) => (
                                    <div
                                        key={id}
                                        className="absolute h-5 w-5 rounded-full border-2 border-white bg-emerald-500 shadow-lg"
                                        style={{ ...style, zIndex: 10 }}
                                        onPointerDown={(e) => {
                                            e.stopPropagation()
                                            onPointerDown(e, id)
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Preview Panel ── */}
                    <div className="flex flex-col items-center gap-5 lg:w-52">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            Preview
                        </p>

                        {/* Large circle preview */}
                        <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-emerald-500/40 bg-zinc-800 shadow-xl">
                            {previewUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <User2 className="h-16 w-16 text-zinc-600" />
                            )}
                        </div>

                        {/* Small badge preview */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] text-zinc-600">Small</p>
                            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-emerald-500/30 bg-zinc-800">
                                {previewUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={previewUrl} alt="Preview small" className="h-full w-full object-cover" />
                                )}
                            </div>
                        </div>

                        {/* Hidden canvas for crop rendering */}
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Action Buttons */}
                        <div className="mt-auto flex w-full flex-col gap-2">
                            <Button
                                onClick={handleConfirm}
                                disabled={!previewUrl}
                                className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-40"
                            >
                                <Check className="h-4 w-4" />
                                Apply Crop
                            </Button>
                            <Button
                                onClick={onClose}
                                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}