import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({ icon = '🍿', title, description, action }: EmptyStateProps) {
  return (
    <div className="card flex animate-fade-in flex-col items-center px-6 py-16 text-center">
      <span className="mb-4 text-6xl">{icon}</span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
