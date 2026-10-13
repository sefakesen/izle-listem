import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import FilterBar from '../components/FilterBar'
import ItemDetailModal from '../components/ItemDetailModal'
import StatsBar from '../components/StatsBar'
import WatchItemCard from '../components/WatchItemCard'
import { IconFilm, IconPlus, IconSearch } from '../components/icons'
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
  const [selectedItem, setSelectedItem] = useState<WatchItem | null>(null)

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
      // Eğer modal açıksa güncel nesneyi yenile
      setSelectedItem((current) => (current && current.id === id ? { ...current, status } : current))
    },
    [setStatus, notify],
  )

  const handleToggleFavorite = useCallback(
    (id: string) => {
      toggleFavorite(id)
      setSelectedItem((current) =>
        current && current.id === id ? { ...current, favorite: !current.favorite } : current,
      )
    },
    [toggleFavorite],
  )

  const confirmDelete = () => {
    if (!pendingDelete) return
    deleteItem(pendingDelete.id)
    notify(`"${pendingDelete.title}" listeden silindi.`)
    if (selectedItem?.id === pendingDelete.id) {
      setSelectedItem(null)
    }
    setPendingDelete(null)
  }

  const cancelDelete = useCallback(() => setPendingDelete(null), [])

  const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/[0.06] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            İzleme Koleksiyonum
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Film ve dizilerinizi takip edin, puanlayın ve kişisel arşivinizi yönetin.
          </p>
        </div>
        <Link to="/ekle" className="btn-primary self-start sm:self-auto py-2.5 text-xs">
          <IconPlus className="h-4 w-4" />
          <span>Film / Dizi Ekle</span>
        </Link>
      </section>

      <StatsBar items={items} />

      {items.length === 0 ? (
        <EmptyState
          icon={<IconFilm className="h-8 w-8 text-[#c5a880]" />}
          title="Koleksiyonunuz henüz boş"
          description="İzlemek istediğiniz veya izlediğiniz ilk filmi ya da diziyi ekleyerek başlayın."
          action={
            <Link to="/ekle" className="btn-primary py-2.5 text-xs">
              <IconPlus className="h-4 w-4" />
              <span>İlk Kaydı Ekle</span>
            </Link>
          }
        />
      ) : (
        <>
          <FilterBar filters={filters} onChange={setFilters} resultCount={visibleItems.length} />

          {visibleItems.length === 0 ? (
            <EmptyState
              icon={<IconSearch className="h-7 w-7 text-neutral-400" />}
              title="Aramaya uygun kayıt bulunamadı"
              description="Arama teriminizi veya filtre kriterlerinizi değiştirip tekrar deneyin."
              action={
                hasActiveFilters && (
                  <button type="button" className="btn-ghost py-2 text-xs" onClick={() => setFilters(DEFAULT_FILTERS)}>
                    Filtreleri Temizle
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
                  onToggleFavorite={handleToggleFavorite}
                  onStatusChange={handleStatusChange}
                  onSelect={setSelectedItem}
                />
              ))}
            </section>
          )}
        </>
      )}

      {/* Kayıt Detayları Modalı */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onDelete={setPendingDelete}
        onToggleFavorite={handleToggleFavorite}
        onStatusChange={handleStatusChange}
      />

      {/* Güvenli Silme Onay Penceresi */}
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Kaydı silmek istiyor musunuz?"
        description={`"${pendingDelete?.title ?? ''}" listenden kalıcı olarak kaldırılacaktır.`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}
