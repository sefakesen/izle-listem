import type { WatchItem } from '../interfaces/WatchItem'
import { IconCheck, IconClock, IconLayers, IconPlay, IconStar } from './icons'

/** Liste özet istatistikleri */
export default function StatsBar({ items }: { items: WatchItem[] }) {
  const rated = items.filter((i) => i.rating > 0)
  const average = rated.length
    ? (rated.reduce((sum, i) => sum + i.rating, 0) / rated.length).toFixed(1)
    : '–'

  const stats = [
    {
      label: 'Toplam Arşiv',
      value: items.length,
      icon: <IconLayers className="h-4 w-4 text-neutral-300" />,
      accent: 'text-neutral-100',
    },
    {
      label: 'İzlenecek',
      value: items.filter((i) => i.status === 'izlenecek').length,
      icon: <IconClock className="h-4 w-4 text-zinc-400" />,
      accent: 'text-zinc-200',
    },
    {
      label: 'İzleniyor',
      value: items.filter((i) => i.status === 'izleniyor').length,
      icon: <IconPlay className="h-4 w-4 text-[#d4af37]" />,
      accent: 'text-amber-200/90',
    },
    {
      label: 'İzlendi',
      value: items.filter((i) => i.status === 'izlendi').length,
      icon: <IconCheck className="h-4 w-4 text-emerald-400" />,
      accent: 'text-emerald-200/90',
    },
    {
      label: 'Ort. Puan',
      value: average,
      icon: <IconStar filled className="h-4 w-4 text-[#e5b869]" />,
      accent: 'text-[#e5b869]',
    },
  ]

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="İstatistikler">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`card flex items-center gap-3.5 p-3.5 ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {s.icon}
          </div>
          <div>
            <p className={`text-xl font-bold tracking-tight leading-none ${s.accent}`}>{s.value}</p>
            <p className="mt-1 text-[11px] font-medium tracking-wider text-neutral-400">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
