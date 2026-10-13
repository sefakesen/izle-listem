import type { MediaType, SortOption, WatchFilters, WatchStatus } from '../interfaces/WatchItem'
import { GENRES, SORT_OPTIONS, STATUS_META } from '../utils/constants'
import { IconFilm, IconHeart, IconSearch, IconTv } from './icons'

interface FilterBarProps {
  filters: WatchFilters
  onChange: (filters: WatchFilters) => void
  resultCount: number
}

const TYPE_TABS: { value: MediaType | 'hepsi'; label: string; icon?: typeof IconFilm }[] = [
  { value: 'hepsi', label: 'Tümü' },
  { value: 'film', label: 'Filmler', icon: IconFilm },
  { value: 'dizi', label: 'Diziler', icon: IconTv },
]

/** Arama, filtreleme ve sıralama çubuğu */
export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const set = <K extends keyof WatchFilters>(key: K, value: WatchFilters[K]) =>
    onChange({ ...filters, [key]: value })

  return (
    <section className="card space-y-4 p-4" aria-label="Filtreler">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
            <IconSearch className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => set('search', e.target.value)}
            placeholder="Başlık veya notlarda ara..."
            aria-label="Ara"
            className="input pl-10"
          />
        </div>

        <div className="flex rounded-xl bg-[#0e1015] p-1 border border-white/[0.08]" role="tablist">
          {TYPE_TABS.map((tab) => {
            const Icon = tab.icon
            const isSelected = filters.type === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => set('type', tab.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? 'bg-white/[0.1] text-white border border-white/10 shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5 text-neutral-400" />}
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <select
          value={filters.status}
          onChange={(e) => set('status', e.target.value as WatchStatus | 'hepsi')}
          aria-label="Duruma göre filtrele"
          className="input cursor-pointer text-xs"
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
          className="input cursor-pointer text-xs"
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
          className="input cursor-pointer text-xs"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <label className="input flex cursor-pointer items-center gap-2 select-none text-xs">
          <input
            type="checkbox"
            checked={filters.onlyFavorites}
            onChange={(e) => set('onlyFavorites', e.target.checked)}
            className="h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-[#c5a880] focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <IconHeart filled={filters.onlyFavorites} className={`h-3.5 w-3.5 ${filters.onlyFavorites ? 'text-rose-400' : 'text-neutral-500'}`} />
          <span className="text-neutral-300">Sadece favoriler</span>
        </label>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 border-t border-white/[0.04]">
        <span>{resultCount} kayıt listeleniyor</span>
        {(filters.search || filters.type !== 'hepsi' || filters.status !== 'hepsi' || filters.genre || filters.onlyFavorites) && (
          <button
            type="button"
            onClick={() =>
              onChange({
                search: '',
                type: 'hepsi',
                status: 'hepsi',
                genre: '',
                onlyFavorites: false,
                sortBy: 'yeni',
              })
            }
            className="text-neutral-400 hover:text-neutral-200 underline decoration-neutral-600 underline-offset-2 transition"
          >
            Filtreleri Sıfırla
          </button>
        )}
      </div>
    </section>
  )
}
