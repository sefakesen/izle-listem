import { useState } from 'react'
import { Link, NavLink } from 'react-router'

const NAV_ITEMS = [
  { to: '/', label: 'Listem', end: true },
  { to: '/hakkinda', label: 'Hakkında', end: false },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/favicon.svg" alt="" className="h-9 w-9" />
          <span className="text-lg font-black tracking-tight">
            İzle<span className="bg-linear-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Listem</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Ana menü">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/ekle" className="btn-primary ml-2 py-2">
            <span className="text-base leading-none">＋</span> Yeni Ekle
          </Link>
        </nav>

        <button
          type="button"
          className="btn-ghost px-3 py-2 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menüyü aç/kapat"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav
          className="flex animate-fade-in flex-col gap-1 border-t border-white/5 px-4 py-3 sm:hidden"
          aria-label="Mobil menü"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/ekle" className="btn-primary mt-2" onClick={() => setOpen(false)}>
            ＋ Yeni Ekle
          </Link>
        </nav>
      )}
    </header>
  )
}
