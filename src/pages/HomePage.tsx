import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import FilterBar from '../components/FilterBar'
import StatsBar from '../components/StatsBar'
import WatchItemCard from '../components/WatchItemCard'
import { useToast } from '../context/ToastContext'
import { useWatchlist } from '../context/WatchlistContext'
import type { WatchFilters, WatchItem, WatchStatus } from '../interfaces/WatchItem'
import { STATUS_META } from '../utils/constants'

const DEFAULT_FILTERS: WatchFilters = {
  search: '',
  type: 'hepsi',
  status: 'hepsi',
  genre: '',
  onlyFavorites: false,
  sortBy: 'yeni',
}

const normalize = (text: string) => text.toLocaleLowerCase('tr-TR').trim()

/** LİSTELEME sayfası: tüm kayıtlar, filtreler ve kart üzerindeki hızlı işlemler */
export default function HomePage() {
  const { items, deleteItem, toggleFavorite, setStatus } = useWatchlist()
  const { notify } = useToast()
  const [filters, setFilters] = useState<WatchFilters>(DEFAULT_FILTERS)
  const [pendingDelete, setPendingDelete] = useState<WatchItem | null>(null)

  const visibleItems = useMemo(() => {
    const query = normalize(filters.search)
    const result = items.filter((item) => {
      if (filters.type !== 'hepsi' && item.type !== filters.type) return false
      if (filters.status !== 'hepsi' && item.status !== filters.status) return false
      if (filters.genre && item.genre !== filters.genre) return false
      if (filters.onlyFavorites && !item.favorite) return false
      if (query && !normalize(`${item.title} ${item.notes ?? ''}`).includes(query)) return false
      return true
    })

    return [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'eski':
          return a.createdAt.localeCompare(b.createdAt)
        case 'puan':
          return b.rating - a.rating
        case 'baslik':
          return a.title.localeCompare(b.title, 'tr')
        case 'yil':
          return (b.year ?? 0) - (a.year ?? 0)
        default:
          return b.createdAt.localeCompare(a.createdAt)
      }
    })
  }, [items, filters])

  const handleStatusChange = useCallback(
    (id: string, status: WatchStatus) => {
      setStatus(id, status)
      notify(`Durum "${STATUS_META[status].label}" olarak güncellendi.`, 'info')
    },
    [setStatus, notify],
  )

  const confirmDelete = () => {
    if (!pendingDelete) return
    deleteItem(pendingDelete.id)
    notify(`"${pendingDelete.title}" listeden silindi.`)
    setPendingDelete(null)
  }

  const cancelDelete = useCallback(() => setPendingDelete(null), [])

  const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            İzleme Listem <span className="inline-block animate-pop-in">🍿</span>
          </h1>
          <p className="mt-1 text-slate-400">
            Filmlerini ve dizilerini tek yerden takip et. Veriler tarayıcında saklanır.
          </p>
        </div>
        <Link to="/ekle" className="btn-primary self-start sm:self-auto">
          ＋ Film / Dizi Ekle
        </Link>
      </section>

      <StatsBar items={items} />

      {items.length === 0 ? (
        <EmptyState
          title="Listen henüz boş"
          description="İzlemek istediğin ilk filmi ya da diziyi ekleyerek başla."
          action={
            <Link to="/ekle" className="btn-primary">
              ＋ İlk kaydını ekle
            </Link>
          }
        />
      ) : (
        <>
          <FilterBar filters={filters} onChange={setFilters} resultCount={visibleItems.length} />

          {visibleItems.length === 0 ? (
            <EmptyState
              icon="🔎"
              title="Sonuç bulunamadı"
              description="Arama ya da filtre kriterlerine uyan kayıt yok."
              action={
                hasActiveFilters && (
                  <button type="button" className="btn-ghost" onClick={() => setFilters(DEFAULT_FILTERS)}>
                    Filtreleri temizle
                  </button>
                )
              }
            />
          ) : (
            <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleItems.map((item) => (
                <WatchItemCard
                  key={item.id}
                  item={item}
                  onDelete={setPendingDelete}
                  onToggleFavorite={toggleFavorite}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </section>
          )}
        </>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Kaydı sil"
        description={`"${pendingDelete?.title ?? ''}" listenden kalıcı olarak silinecek. Emin misin?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}
