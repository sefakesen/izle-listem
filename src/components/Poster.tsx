import { useState } from 'react'
import type { MediaType } from '../interfaces/WatchItem'
import { IconFilm, IconTv } from './icons'

const CINEMA_PALETTES = [
  {
    bg: 'from-[#181d26] via-[#12151c] to-[#0a0c10]',
    accent: 'text-[#c5a880]',
    border: 'border-white/[0.08]',
  },
  {
    bg: 'from-[#201a16] via-[#16120f] to-[#0c0908]',
    accent: 'text-[#d6b485]',
    border: 'border-amber-500/10',
  },
  {
    bg: 'from-[#141e19] via-[#0f1713] to-[#080d0a]',
    accent: 'text-[#8cb89f]',
    border: 'border-emerald-500/10',
  },
  {
    bg: 'from-[#22161a] via-[#180f12] to-[#0d080a]',
    accent: 'text-[#d998a4]',
    border: 'border-rose-500/10',
  },
  {
    bg: 'from-[#161d28] via-[#10141c] to-[#090b10]',
    accent: 'text-[#9bb7d4]',
    border: 'border-sky-500/10',
  },
  {
    bg: 'from-[#1f1c16] via-[#16130e] to-[#0c0b08]',
    accent: 'text-[#c9b38c]',
    border: 'border-yellow-500/10',
  },
]

function pickPalette(title: string) {
  let hash = 0
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return CINEMA_PALETTES[hash % CINEMA_PALETTES.length]
}

interface PosterProps {
  title: string
  type: MediaType
  posterUrl?: string
  className?: string
}

/** Zarif, minimal sinema afişi bileşeni */
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

  const palette = pickPalette(title)
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toLocaleUpperCase('tr-TR'))
    .join('')

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b ${palette.bg} p-5 select-none ${className}`}
      role="img"
      aria-label={`${title} kapak görseli`}
    >
      {/* İç ince çerçeve - Criterion / Sanat edisyonu havası */}
      <div
        className={`pointer-events-none absolute inset-3 rounded-lg border ${palette.border}`}
      />

      {/* Üst başlık & tip rozeti */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 text-[11px] font-medium tracking-wider text-neutral-300 uppercase backdrop-blur-md">
          {type === 'film' ? <IconFilm className="h-3 w-3 text-neutral-400" /> : <IconTv className="h-3 w-3 text-neutral-400" />}
          {type === 'film' ? 'Film' : 'Dizi'}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
          Edition
        </span>
      </div>

      {/* Merkez: Zarif tipografik monogram */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4 text-center">
        <span className={`font-serif text-5xl font-light tracking-widest ${palette.accent} drop-shadow-sm`}>
          {initials || 'ARCH'}
        </span>
        <div className="mt-3 h-[1px] w-8 bg-white/10" />
      </div>

      {/* Alt: Başlık ve arşiv etiketi */}
      <div className="relative z-10">
        <p className="line-clamp-2 text-xs font-medium tracking-tight text-neutral-200">
          {title}
        </p>
      </div>

      {/* Yumuşak ortam aydınlatması */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_65%)]" />
    </div>
  )
}
