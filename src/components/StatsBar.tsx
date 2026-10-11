import type { WatchItem } from '../interfaces/WatchItem'

/** Liste özet istatistikleri */
export default function StatsBar({ items }: { items: WatchItem[] }) {
  const rated = items.filter((i) => i.rating > 0)
  const average = rated.length
    ? (rated.reduce((sum, i) => sum + i.rating, 0) / rated.length).toFixed(1)
    : '–'

  const stats = [
    { label: 'Toplam', value: items.length, icon: '🎞️', accent: 'text-slate-100' },
    {
      label: 'İzlenecek',
      value: items.filter((i) => i.status === 'izlenecek').length,
      icon: '⏳',
      accent: 'text-sky-300',
    },
    {
      label: 'İzleniyor',
      value: items.filter((i) => i.status === 'izleniyor').length,
      icon: '▶️',
      accent: 'text-amber-300',
    },
    {
      label: 'İzlendi',
      value: items.filter((i) => i.status === 'izlendi').length,
      icon: '✅',
      accent: 'text-emerald-300',
    },
    { label: 'Ort. Puan', value: average, icon: '⭐', accent: 'text-amber-400' },
  ]

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="İstatistikler">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`card flex items-center gap-3 p-4 ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
            {s.icon}
          </span>
          <div>
            <p className={`text-2xl font-black leading-none ${s.accent}`}>{s.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
