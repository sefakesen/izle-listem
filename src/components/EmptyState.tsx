import type { ReactNode } from 'react'
import { IconFilm } from './icons'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({
  icon = <IconFilm className="h-8 w-8 text-[#c5a880]" />,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="card flex animate-fade-in flex-col items-center px-6 py-16 text-center bg-[#13161c] border-white/[0.08]">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08]">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1.5 max-w-sm text-xs text-neutral-400 leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
