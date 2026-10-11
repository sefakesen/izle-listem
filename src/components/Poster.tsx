import { useState } from 'react'
import type { MediaType } from '../interfaces/WatchItem'
import { TYPE_META } from '../utils/constants'

const GRADIENTS = [
  'from-rose-600 via-fuchsia-700 to-indigo-900',
  'from-amber-500 via-orange-600 to-rose-800',
  'from-emerald-500 via-teal-700 to-slate-900',
  'from-sky-500 via-indigo-700 to-violet-900',
  'from-fuchsia-500 via-purple-700 to-slate-900',
  'from-lime-500 via-emerald-700 to-cyan-900',
]

/** Başlığa göre her zaman aynı gradyanı seçmek için basit bir hash */
function pickGradient(title: string): string {
  let hash = 0
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return GRADIENTS[hash % GRADIENTS.length]
}

interface PosterProps {
  title: string
  type: MediaType
  posterUrl?: string
  className?: string
}

/** Afiş görseli; URL yoksa veya yüklenemezse başlıktan üretilen bir kapak gösterir */
export default function Poster({ title, type, posterUrl, className = '' }: PosterProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null)
  const showImage = Boolean(posterUrl) && failedUrl !== posterUrl

  if (showImage) {
    return (
      <img
        src={posterUrl}
        alt={`${title} afişi`}
        loading="lazy"
        onError={() => setFailedUrl(posterUrl ?? null)}
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toLocaleUpperCase('tr-TR'))
    .join('')

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center bg-linear-to-br ${pickGradient(title)} ${className}`}
      role="img"
      aria-label={`${title} kapak görseli`}
    >
      <span className="text-5xl font-black tracking-tight text-white/90 drop-shadow-lg">
        {initials || '?'}
      </span>
      <span className="mt-2 text-2xl opacity-80">{TYPE_META[type].icon}</span>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
    </div>
  )
}
