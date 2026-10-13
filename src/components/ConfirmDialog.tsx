import { useEffect, useRef } from 'react'
import { IconTrash } from './icons'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Silme gibi geri alınamaz işlemler için onay penceresi */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Sil',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="card w-full max-w-sm animate-pop-in p-6 shadow-2xl bg-[#13161c] border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <IconTrash className="h-5 w-5" />
        </div>
        <h2 id="confirm-title" className="text-base font-semibold text-white">
          {title}
        </h2>
        <p id="confirm-desc" className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
          {description}
        </p>
        <div className="mt-6 flex justify-end gap-2.5">
          <button ref={cancelRef} type="button" className="btn-ghost py-2 text-xs" onClick={onCancel}>
            Vazgeç
          </button>
          <button type="button" className="btn-danger py-2 text-xs px-4" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
