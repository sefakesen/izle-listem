import { Link } from 'react-router'
import type { WatchItem, WatchStatus } from '../interfaces/WatchItem'
import { STATUS_META, TYPE_META } from '../utils/constants'
import Poster from './Poster'
import StarRating from './StarRating'
import StatusBadge from './StatusBadge'

interface WatchItemCardProps {
  item: WatchItem
  onDelete: (item: WatchItem) => void
  onToggleFavorite: (id: string) => void
  onStatusChange: (id: string, status: WatchStatus) => void
}

/** Listeleme ekranındaki tek bir film/dizi kartı */
export default function WatchItemCard({
  item,
  onDelete,
  onToggleFavorite,
  onStatusChange,
}: WatchItemCardProps) {
  const type = TYPE_META[item.type]

  return (
    <article className="card group flex animate-slide-up flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-rose-500/10">
      {/* Afiş alanı */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Poster
          title={item.title}
          type={item.type}
          posterUrl={item.posterUrl}
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ink-800 to-transparent" />

        <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur">
          {type.icon} {type.label}
        </span>

        <button
          type="button"
          onClick={() => onToggleFavorite(item.id)}
          aria-label={item.favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          aria-pressed={item.favorite}
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-lg backdrop-blur transition hover:scale-110"
        >
          {item.favorite ? '❤️' : '🤍'}
        </button>

        <div className="absolute bottom-3 left-3">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {/* İçerik */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold" title={item.title}>
            {item.title}
          </h3>
          <p className="text-sm text-slate-400">
            {[item.year, item.genre].filter(Boolean).join(' · ')}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {item.rating > 0 ? (
            <StarRating value={item.rating} size="sm" />
          ) : (
            <span className="text-xs text-slate-500">Henüz puanlanmadı</span>
          )}
          {item.type === 'dizi' && (item.season || item.episode) ? (
            <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-slate-300">
              S{String(item.season ?? 1).padStart(2, '0')}·B{String(item.episode ?? 1).padStart(2, '0')}
            </span>
          ) : null}
        </div>

        {item.notes && (
          <p className="line-clamp-2 text-sm italic text-slate-400">“{item.notes}”</p>
        )}

        {/* İşlemler */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <label className="sr-only" htmlFor={`status-${item.id}`}>
            Durumu değiştir
          </label>
          <select
            id={`status-${item.id}`}
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value as WatchStatus)}
            className="input flex-1 cursor-pointer py-2 text-xs"
          >
            {(Object.keys(STATUS_META) as WatchStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
          <Link
            to={`/duzenle/${item.id}`}
            className="btn-ghost px-3 py-2"
            aria-label={`${item.title} düzenle`}
            title="Düzenle"
          >
            ✏️
          </Link>
          <button
            type="button"
            onClick={() => onDelete(item)}
            className="btn px-3 py-2 text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/15"
            aria-label={`${item.title} sil`}
            title="Sil"
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  )
}
