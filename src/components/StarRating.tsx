import { useState } from 'react'
import { IconStar } from './icons'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

/** Zarif yıldızlı puanlama bileşeni */
export default function StarRating({ value, onChange, size = 'md' }: StarRatingProps) {
  const [hover, setHover] = useState(0)
  const editable = typeof onChange === 'function'
  const shown = hover || value

  return (
    <div
      className="flex items-center gap-1 select-none"
      onMouseLeave={() => setHover(0)}
      role={editable ? 'radiogroup' : 'img'}
      aria-label={`Puan: ${value} / 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= shown
        const icon = (
          <IconStar
            filled={active}
            className={`${SIZES[size]} transition-colors duration-150 ${
              active ? 'text-[#e5b869]' : 'text-neutral-700 hover:text-neutral-500'
            }`}
          />
        )

        if (!editable) {
          return <span key={star}>{icon}</span>
        }

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} yıldız`}
            className="cursor-pointer p-0.5 transition-transform hover:scale-110 focus:outline-none"
            onMouseEnter={() => setHover(star)}
            onClick={() => onChange(star === value ? 0 : star)}
          >
            {icon}
          </button>
        )
      })}
    </div>
  )
}
