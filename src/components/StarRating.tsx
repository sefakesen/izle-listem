import { useState } from 'react'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }

/** Yıldızlı puan. onChange verilirse düzenlenebilir olur. */
export default function StarRating({ value, onChange, size = 'md' }: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const editable = typeof onChange === 'function'
  const shown = hover || value

  return (
    <div
      className={`flex items-center gap-0.5 ${SIZES[size]}`}
      onMouseLeave={() => setHover(0)}
      role={editable ? 'radiogroup' : 'img'}
      aria-label={`Puan: ${value} / 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= shown
        const icon = (
          <span className={active ? 'text-amber-400 drop-shadow' : 'text-slate-600'}>★</span>
        )
        if (!editable) return <span key={star}>{icon}</span>
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} yıldız`}
            className="cursor-pointer transition hover:scale-125"
            onMouseEnter={() => setHover(star)}
            // Aynı yıldıza tekrar tıklamak puanı sıfırlar
            onClick={() => onChange(star === value ? 0 : star)}
          >
            {icon}
          </button>
        )
      })}
    </div>
  )
}
