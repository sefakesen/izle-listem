import { useEffect } from 'react'
import { Link } from 'react-router'
import type { WatchItem, WatchStatus } from '../interfaces/WatchItem'
import { STATUS_META } from '../utils/constants'
import Poster from './Poster'
import StarRating from './StarRating'
import StatusBadge from './StatusBadge'
import {
  IconClose,
  IconEdit,
  IconExternalLink,
  IconFilm,
  IconHeart,
  IconTrash,
  IconTv,
} from './icons'

interface ItemDetailModalProps {
  item: WatchItem | null
  onClose: () => void
  onDelete: (item: WatchItem) => void
  onToggleFavorite: (id: string) => void
  onStatusChange: (id: string, status: WatchStatus) => void
}

/** Kayıt Detayları Modalı */
export default function ItemDetailModal({
  item,
  onClose,
  onDelete,
  onToggleFavorite,
  onStatusChange,
}: ItemDetailModalProps) {
  useEffect(() => {
    if (!item) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [item, onClose])

  if (!item) return null

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${item.title} ${item.year ?? ''} ${item.type === 'film' ? 'film' : 'dizi'}`,
  )}`

  const imdbSearchUrl = `https://www.imdb.com/find/?q=${encodeURIComponent(item.title)}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="card relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden bg-[#12151c] border-white/[0.12] shadow-2xl animate-pop-in sm:flex-row"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Kapat butonu */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-neutral-400 hover:text-white transition backdrop-blur-md"
          aria-label="Kapat"
        >
          <IconClose className="h-4 w-4" />
        </button>

        {/* Sol: Afiş */}
        <div className="relative aspect-[3/4] w-full sm:w-64 shrink-0 bg-neutral-900">
          <Poster title={item.title} type={item.type} posterUrl={item.posterUrl} />
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            aria-label={item.favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md transition hover:scale-110"
          >
            <IconHeart
              filled={item.favorite}
              className={`h-4 w-4 ${item.favorite ? 'text-rose-500' : 'text-neutral-400'}`}
            />
          </button>
        </div>

        {/* Sağ: Bilgiler */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-md bg-white/[0.06] border border-white/10 px-2 py-0.5 text-xs text-neutral-300">
                {item.type === 'film' ? <IconFilm className="h-3 w-3" /> : <IconTv className="h-3 w-3" />}
                {item.type === 'film' ? 'Film' : 'Dizi'}
              </span>
              <StatusBadge status={item.status} />
            </div>

            <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white">
              {item.title}
            </h2>

            <p className="text-sm text-neutral-400">
              {[item.year, item.genre].filter(Boolean).join(' · ')}
              {item.type === 'dizi' && (item.season || item.episode) && (
                <span className="ml-2 font-mono text-xs text-[#c5a880]">
                  (Sezon {item.season ?? 1}, Bölüm {item.episode ?? 1})
                </span>
              )}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <StarRating value={item.rating} size="md" />
              <span className="text-xs text-neutral-400">
                {item.rating > 0 ? `${item.rating} / 5 Yıldız` : 'Puan verilmedi'}
              </span>
            </div>

            {item.notes ? (
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 text-sm italic text-neutral-300 leading-relaxed">
                “{item.notes}”
              </div>
            ) : (
              <p className="text-xs italic text-neutral-500">Not eklenmemiş.</p>
            )}

            <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
              <p>Eklenme: {new Date(item.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p>Son Güncelleme: {new Date(item.updatedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Dış bağlantılar ve İşlemler */}
          <div className="space-y-3 border-t border-white/[0.08] pt-4">
            <div className="flex items-center gap-2">
              <a
                href={imdbSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost flex-1 py-1.5 text-xs text-neutral-300"
              >
                <span>IMDb'de Ara</span>
                <IconExternalLink className="h-3 w-3" />
              </a>
              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost flex-1 py-1.5 text-xs text-neutral-300"
              >
                <span>Google'da Ara</span>
                <IconExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={item.status}
                onChange={(e) => onStatusChange(item.id, e.target.value as WatchStatus)}
                className="input py-2 text-xs flex-1 cursor-pointer"
              >
                {(Object.keys(STATUS_META) as WatchStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>

              <Link
                to={`/duzenle/${item.id}`}
                className="btn-ghost py-2 text-xs flex items-center gap-1.5"
                onClick={onClose}
              >
                <IconEdit className="h-3.5 w-3.5" />
                <span>Düzenle</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  onClose()
                  onDelete(item)
                }}
                className="btn-danger py-2 text-xs flex items-center gap-1.5"
              >
                <IconTrash className="h-3.5 w-3.5" />
                <span>Sil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
