import { Outlet } from 'react-router'
import Header from './Header'
import ToastContainer from './ToastContainer'

const YEAR = new Date().getFullYear()

/** Tüm sayfaları saran ortak iskelet */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © {YEAR} İzle Listem · React + TypeScript + Tailwind CSS ile geliştirildi
      </footer>
      <ToastContainer />
    </div>
  )
}
