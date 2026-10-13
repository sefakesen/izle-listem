import { useState } from 'react'
import type { MediaType } from '../interfaces/WatchItem'
import { IconFilm, IconTv } from './icons'

const CINEMA_PALETTES = [
  {
    bg: 'from-[#191d26] via-[#12151c] to-[#0a0c10]',
    accent: 'text-[#c5a880]',
    border: 'border-white/[0.08]',
  },
  {
    bg: 'from-[#221c17] via-[#16130f] to-[#0c0a08]',
    accent: 'text-[#d6b485]',
    border: 'border-amber-500/10',
  },
  {
    bg: 'from-[#14201a] via-[#0f1713] to-[#080d0a]',
    accent: 'text-[#8cb89f]',
    border: 'border-emerald-500/10',
  },
  {
    bg: 'from-[#24171b] via-[#180f12] to-[#0d080a]',
    accent: 'text-[#d998a4]',
    border: 'border-rose-500/10',
  },
  {
    bg: 'from-[#171f2b] via-[#10151c] to-[#090c10]',
    accent: 'text-[#9bb7d4]',
    border: 'border-sky-500/10',
  },
  {
    bg: 'from-[#211e16] via-[#16140e] to-[#0c0b08]',
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

/**
 * Zarif, minimalist sinema afişi bileşeni.
 * Not: Kart üzerindeki rozetlerle ve başlıklarla çakışmaması için
 * yalnızca saf arka plan ve merkezdeki sanatsal monogramı çizer.
 */
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
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b ${palette.bg} select-none ${className}`}
      role="img"
      aria-label={`${title} kapak görseli`}
    >
      {/* İç ince çerçeve - Sanat edisyonu havası */}
      <div
        className={`pointer-events-none absolute inset-3 rounded-lg border ${palette.border}`}
      />

      {/* Arka plan hafif sinema filmi filigranı */}
      <div className="pointer-events-none absolute opacity-[0.03] scale-150">
        {type === 'film' ? (
          <IconFilm className="h-48 w-48 text-white" />
        ) : (
          <IconTv className="h-48 w-48 text-white" />
        )}
      </div>

      {/* Merkez: Tipografik baş harf monogramı */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <span
          className={`font-serif text-5xl sm:text-6xl font-light tracking-widest ${palette.accent} drop-shadow-md`}
        >
          {initials || 'A'}
        </span>
        <div className="mt-2.5 h-[1px] w-8 bg-white/10" />
      </div>

      {/* Yumuşak ortam ışığı */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.03),transparent_60%)]" />
    </div>
  )
}
