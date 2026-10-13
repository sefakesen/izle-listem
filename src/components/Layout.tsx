import { Outlet } from 'react-router'
import Header from './Header'
import ToastContainer from './ToastContainer'

const YEAR = new Date().getFullYear()

/** Tüm sayfaları saran ortak iskelet */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0e12] text-neutral-100">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-neutral-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {YEAR} İzle Listem · Modern JavaScript Projesi</p>
          <p className="text-[11px] text-neutral-400">
            React 19 · TypeScript · Tailwind CSS · LocalStorage
          </p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  )
}
