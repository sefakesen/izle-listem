import { useToast } from '../context/ToastContext'
import { IconCheck, IconClose, IconSparkles } from './icons'

export default function ToastContainer() {
  const { toasts, dismiss } = useToast()

  const getIcon = (variant: 'success' | 'error' | 'info') => {
    switch (variant) {
      case 'success':
        return <IconCheck className="h-4 w-4 text-emerald-400" />
      case 'error':
        return <IconClose className="h-4 w-4 text-rose-400" />
      default:
        return <IconSparkles className="h-4 w-4 text-[#c5a880]" />
    }
  }

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
          className="pointer-events-auto flex animate-slide-up cursor-pointer items-center gap-3 rounded-xl bg-[#161a22]/95 border border-white/10 px-4 py-3 text-xs font-medium text-neutral-200 shadow-xl backdrop-blur-md transition hover:border-white/20"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.05]">
            {getIcon(toast.variant)}
          </span>
          <span>{toast.message}</span>
        </button>
      ))}
    </div>
  )
}
