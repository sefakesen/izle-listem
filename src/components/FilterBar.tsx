import type { MediaType, SortOption, WatchFilters, WatchStatus } from '../interfaces/WatchItem'
import { GENRES, SORT_OPTIONS, STATUS_META } from '../utils/constants'

interface FilterBarProps {
  filters: WatchFilters
  onChange: (filters: WatchFilters) => void
  resultCount: number
}

const TYPE_TABS: { value: MediaType | 'hepsi'; label: string }[] = [
  { value: 'hepsi', label: 'Tümü' },
  { value: 'film', label: '🎬 Filmler' },
  { value: 'dizi', label: '📺 Diziler' },
]

/** Arama, filtreleme ve sıralama çubuğu */
export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const set = <K extends keyof WatchFilters>(key: K, value: WatchFilters[K]) =>
    onChange({ ...filters, [key]: value })

  return (
    <section className="card space-y-4 p-4" aria-label="Filtreler">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            🔍
          </span>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => set('search', e.target.value)}
            placeholder="Başlık veya not ara..."
            aria-label="Ara"
            className="input pl-10"
          />
        </div>

        <div className="flex rounded-xl bg-ink-900 p-1 ring-1 ring-white/10" role="tablist">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={filters.type === tab.value}
              onClick={() => set('type', tab.value)}
              className={`flex-1 cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                filters.type === tab.value
                  ? 'bg-linear-to-r from-rose-500 to-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <select
          value={filters.status}
          onChange={(e) => set('status', e.target.value as WatchStatus | 'hepsi')}
          aria-label="Duruma göre filtrele"
          className="input cursor-pointer"
        >
          <option value="hepsi">Tüm durumlar</option>
          {(Object.keys(STATUS_META) as WatchStatus[]).map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>

        <select
          value={filters.genre}
          onChange={(e) => set('genre', e.target.value)}
          aria-label="Türe göre filtrele"
          className="input cursor-pointer"
        >
          <option value="">Tüm türler</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => set('sortBy', e.target.value as SortOption)}
          aria-label="Sırala"
          className="input cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <label className="input flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={filters.onlyFavorites}
            onChange={(e) => set('onlyFavorites', e.target.checked)}
            className="h-4 w-4 accent-rose-500"
          />
          ❤️ Sadece favoriler
        </label>
      </div>

      <p className="text-xs text-slate-500">{resultCount} kayıt gösteriliyor</p>
    </section>
  )
}
