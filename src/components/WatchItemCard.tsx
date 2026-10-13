import { Link } from 'react-router'
import type { WatchItem, WatchStatus } from '../interfaces/WatchItem'
import { STATUS_META } from '../utils/constants'
import Poster from './Poster'
import StarRating from './StarRating'
import StatusBadge from './StatusBadge'
import { IconEdit, IconEye, IconFilm, IconHeart, IconTrash, IconTv } from './icons'

interface WatchItemCardProps {
  item: WatchItem
  onDelete: (item: WatchItem) => void
  onToggleFavorite: (id: string) => void
  onStatusChange: (id: string, status: WatchStatus) => void
  onSelect?: (item: WatchItem) => void
}

/** Listeleme ekranındaki tek bir film/dizi kartı */
export default function WatchItemCard({
  item,
  onDelete,
  onToggleFavorite,
  onStatusChange,
  onSelect,
}: WatchItemCardProps) {
  return (
    <article className="card group flex animate-slide-up flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/50">
      {/* Afiş alanı */}
      <div
        className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-neutral-950"
        onClick={() => onSelect?.(item)}
      >
        <Poster
          title={item.title}
          type={item.type}
          posterUrl={item.posterUrl}
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#13161c] via-[#13161c]/40 to-transparent" />

        {/* Tip etiketi */}
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium text-neutral-300 backdrop-blur-md border border-white/10">
          {item.type === 'film' ? <IconFilm className="h-3 w-3 text-neutral-400" /> : <IconTv className="h-3 w-3 text-neutral-400" />}
          {item.type === 'film' ? 'Film' : 'Dizi'}
        </span>

        {/* Favori butonu */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(item.id)
          }}
          aria-label={item.favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          aria-pressed={item.favorite}
          className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 backdrop-blur-md transition hover:scale-110 border border-white/10"
        >
          <IconHeart
            filled={item.favorite}
            className={`h-4 w-4 ${item.favorite ? 'text-rose-500' : 'text-neutral-400'}`}
          />
        </button>

        <div className="absolute bottom-3 left-3">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {/* İçerik */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3
            className="line-clamp-1 text-base font-semibold text-neutral-100 hover:text-white cursor-pointer"
            title={item.title}
            onClick={() => onSelect?.(item)}
          >
            {item.title}
          </h3>
          <p className="text-xs text-neutral-400">
            {[item.year, item.genre].filter(Boolean).join(' · ')}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {item.rating > 0 ? (
            <StarRating value={item.rating} size="sm" />
          ) : (
            <span className="text-[11px] text-neutral-500">Puanlanmadı</span>
          )}
          {item.type === 'dizi' && (item.season || item.episode) ? (
            <span className="rounded-md bg-white/[0.04] border border-white/[0.08] px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
              S{String(item.season ?? 1).padStart(2, '0')}·B{String(item.episode ?? 1).padStart(2, '0')}
            </span>
          ) : null}
        </div>

        {item.notes && (
          <p className="line-clamp-2 text-xs italic text-neutral-400">“{item.notes}”</p>
        )}

        {/* İşlemler */}
        <div className="mt-auto flex items-center gap-1.5 pt-3 border-t border-white/[0.06]">
          <label className="sr-only" htmlFor={`status-${item.id}`}>
            Durumu değiştir
          </label>
          <select
            id={`status-${item.id}`}
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value as WatchStatus)}
            className="input flex-1 cursor-pointer py-1.5 text-xs text-neutral-300"
          >
            {(Object.keys(STATUS_META) as WatchStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>

          {onSelect && (
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="btn-ghost px-2.5 py-1.5 text-xs"
              aria-label={`${item.title} detaylarını incele`}
              title="Detaylar"
            >
              <IconEye className="h-3.5 w-3.5 text-neutral-400" />
            </button>
          )}

          <Link
            to={`/duzenle/${item.id}`}
            className="btn-ghost px-2.5 py-1.5 text-xs"
            aria-label={`${item.title} düzenle`}
            title="Düzenle"
          >
            <IconEdit className="h-3.5 w-3.5 text-neutral-400" />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(item)}
            className="btn-danger px-2.5 py-1.5 text-xs"
            aria-label={`${item.title} sil`}
            title="Sil"
          >
            <IconTrash className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
