import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowClockwise, Check, X } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface SignaturePadProps {
  onSave: (signature: string) => void
  onCancel: () => void
  documentTitle: string
}

export function SignaturePad({ onSave, onCancel, documentTitle }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    ctx.strokeStyle = 'oklch(0.25 0.01 240)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    setContext(ctx)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
    setHasDrawn(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return

    e.preventDefault()

    const rect = canvasRef.current.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!context) return
    context.closePath()
    setIsDrawing(false)
  }

  const clearSignature = () => {
    if (!context || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    context.clearRect(0, 0, rect.width, rect.height)
    setHasDrawn(false)
  }

  const saveSignature = () => {
    if (!canvasRef.current || !hasDrawn) return
    const dataUrl = canvasRef.current.toDataURL('image/png')
    onSave(dataUrl)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <Card className="w-full max-w-2xl p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Sign Document</h3>
          <p className="text-sm text-muted-foreground">{documentTitle}</p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-64 border-2 border-dashed border-border rounded-lg bg-card cursor-crosshair touch-none"
              style={{ width: '100%', height: '16rem' }}
            />
            {!hasDrawn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-muted-foreground text-sm">Sign here with your finger or mouse</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>By signing, you agree to the terms of this document</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button
            variant="outline"
            onClick={clearSignature}
            disabled={!hasDrawn}
            className="gap-2"
          >
            <ArrowClockwise size={16} />
            Clear
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
              className="gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button
              onClick={saveSignature}
              disabled={!hasDrawn}
              className="gap-2"
            >
              <Check size={16} />
              Save Signature
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
