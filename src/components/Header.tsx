import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { IconClose, IconFilm, IconMenu, IconPlus } from './icons'

const NAV_ITEMS = [
  { to: '/', label: 'Koleksiyon', end: true },
  { to: '/hakkinda', label: 'Proje Hakkında', end: false },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
      isActive
        ? 'bg-white/[0.08] text-white shadow-xs'
        : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0c0e12]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-[#c5a880] transition group-hover:border-[#c5a880]/40 group-hover:bg-[#c5a880]/10">
            <IconFilm className="h-4 w-4" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold tracking-tight text-white">İzle</span>
            <span className="font-serif italic text-base text-[#c5a880] font-normal">Listem</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Ana menü">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/ekle" className="btn-primary ml-3 py-2 text-xs">
            <IconPlus className="h-3.5 w-3.5" />
            <span>Yeni Ekle</span>
          </Link>
        </nav>

        <button
          type="button"
          className="btn-ghost px-2.5 py-2 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menüyü aç/kapat"
        >
          {open ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <nav
          className="flex animate-fade-in flex-col gap-1.5 border-t border-white/[0.07] bg-[#11141a] px-4 py-3 sm:hidden"
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
          <Link to="/ekle" className="btn-primary mt-2 justify-center" onClick={() => setOpen(false)}>
            <IconPlus className="h-4 w-4" />
            <span>Yeni Ekle</span>
          </Link>
        </nav>
      )}
    </header>
  )
}
