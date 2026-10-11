import { useState } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import PageHeading from '../components/PageHeading'
import { useToast } from '../context/ToastContext'
import { useWatchlist } from '../context/WatchlistContext'

const FEATURES = [
  { icon: '➕', title: 'Ekle', text: 'Film veya dizi; tür, yıl, durum, puan, afiş ve notlarla eklenir.' },
  { icon: '📋', title: 'Listele', text: 'Arama, tür/durum filtreleri, favoriler ve 5 farklı sıralama.' },
  { icon: '✏️', title: 'Güncelle', text: 'Düzenleme formu ve kart üzerinden hızlı durum/favori değişimi.' },
  { icon: '🗑️', title: 'Sil', text: 'Onay penceresi ile güvenli silme işlemi.' },
]

const STACK = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'React Router', 'LocalStorage', 'Netlify']

export default function AboutPage() {
  const { items, clearAll } = useWatchlist()
  const { notify } = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeading
        title="Proje Hakkında"
        description="Web Geliştirme – JavaScript proje yönergesi kapsamında hazırlanmış bir CRUD uygulaması."
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="card p-5">
            <span className="text-2xl">{f.icon}</span>
            <h2 className="mt-2 font-bold">{f.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="card p-6">
        <h2 className="font-bold">Kullanılan Teknolojiler</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-sm ring-1 ring-white/10">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="card border-red-500/20 p-6">
        <h2 className="font-bold text-red-300">Verileri Sıfırla</h2>
        <p className="mt-1 text-sm text-slate-400">
          Tüm kayıtlar tarayıcının LocalStorage alanında tutulur. Şu an {items.length} kayıt var.
        </p>
        <button
          type="button"
          className="btn-danger mt-4"
          disabled={items.length === 0}
          onClick={() => setConfirmOpen(true)}
        >
          Tüm listeyi temizle
        </button>
      </section>

      <ConfirmDialog
        open={confirmOpen}
        title="Tüm liste silinsin mi?"
        description="Bu işlem geri alınamaz. Bütün film ve dizi kayıtların silinecek."
        confirmLabel="Hepsini sil"
        onConfirm={() => {
          clearAll()
          setConfirmOpen(false)
          notify('Tüm kayıtlar silindi.')
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}
