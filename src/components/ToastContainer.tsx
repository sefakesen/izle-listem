import { useToast } from '../context/ToastContext'

const VARIANTS = {
  success: { icon: '✅', ring: 'ring-emerald-500/30' },
  error: { icon: '⚠️', ring: 'ring-red-500/30' },
  info: { icon: 'ℹ️', ring: 'ring-sky-500/30' },
}

export default function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6"
    >
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismiss(toast.id)}
          className={`pointer-events-auto flex animate-slide-up cursor-pointer items-center gap-3 rounded-xl bg-ink-800/95 px-4 py-3 text-sm font-medium shadow-2xl ring-1 backdrop-blur ${VARIANTS[toast.variant].ring}`}
        >
          <span>{VARIANTS[toast.variant].icon}</span>
          {toast.message}
        </button>
      ))}
    </div>
  )
}
