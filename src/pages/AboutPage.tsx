import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import PageHeading from '../components/PageHeading'
import {
  IconCheck,
  IconDownload,
  IconEdit,
  IconLayers,
  IconPlus,
  IconSparkles,
  IconTrash,
  IconUpload,
} from '../components/icons'
import { useToast } from '../context/ToastContext'
import { useWatchlist } from '../context/WatchlistContext'
import type { WatchItem } from '../interfaces/WatchItem'

const FEATURES = [
  {
    icon: <IconPlus className="h-5 w-5 text-neutral-300" />,
    title: 'Ekleme İşlemi',
    text: 'Film veya dizi türü, yapım yılı, izleme durumu, 5 yıldızlı puan, afiş URL ve kişisel notlar ile kayıt oluşturma.',
  },
  {
    icon: <IconLayers className="h-5 w-5 text-neutral-300" />,
    title: 'Listeleme & Filtreleme',
    text: 'Dinamik arama motoru, Film/Dizi sekmeleri, durum ve tür filtreleri, favori filtresi ve 5 farklı sıralama ölçütü.',
  },
  {
    icon: <IconEdit className="h-5 w-5 text-neutral-300" />,
    title: 'Güncelleme İşlemi',
    text: 'Ayrıntılı düzenleme sayfası, kart üzerinden tek tıkla durum değiştirme ve favori durumu güncellemesi.',
  },
  {
    icon: <IconTrash className="h-5 w-5 text-neutral-300" />,
    title: 'Silme & Güvenlik',
    text: 'Yanlışlıkla veri kaybını önleyen onay modalları ve güvenli silme mekanizmaları.',
  },
]

const STACK = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS v4',
  'React Router 8',
  'LocalStorage API',
  'Netlify Deployable',
]

const GUIDELINES = [
  'Modern JavaScript kütüphanesi seçimi (React + TypeScript)',
  'LocalStorage ile kalıcı veri yönetimi',
  'Components, Pages, Interfaces dosya ağacı mimarisi',
  'Tailwind CSS ile zarif, neon renklerden arındırılmış kullanıcı arayüzü',
  'Tam teşekküllü CRUD (Ekle, Listele, Güncelle, Sil) operasyonları',
  'Netlify veya muadili platformlarda derlenip yayına alınabilir statik çıktı',
]

export default function AboutPage() {
  const { items, clearAll, importItems, resetToSamples } = useWatchlist()
  const { notify } = useToast()
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // JSON Dışa Aktar (Export)
  const handleExport = () => {
    if (items.length === 0) {
      notify('Dışa aktarılacak kayıt bulunmuyor.', 'info')
      return
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `izle-listem-yedek-${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    notify('Koleksiyon yedeği JSON dosyası olarak indirildi.')
  }

  // JSON İçe Aktar (Import)
  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const parsed = JSON.parse(content)
        if (!Array.isArray(parsed)) {
          throw new Error('Geçersiz dosya formatı')
        }
        // Temel geçerlilik kontrolü
        const validItems = parsed.filter(
          (i: unknown) => typeof i === 'object' && i !== null && 'id' in i && 'title' in i,
        ) as WatchItem[]

        if (validItems.length === 0) {
          notify('Dosyada geçerli bir kayıt bulunamadı.', 'error')
          return
        }

        importItems(validItems)
        notify(`${validItems.length} kayıt başarıyla içe aktarıldı.`)
      } catch {
        notify('Dosya okunurken bir hata oluştu. Lütfen geçerli bir JSON yükleyin.', 'error')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeading
        title="Proje Hakkında & Yönerge"
        description="Web Geliştirme – JavaScript proje yönergesi şartlarına uygun olarak hazırlanmış frontend uygulaması."
      />

      {/* CRUD Özellikleri */}
      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="card p-5 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">
              {f.icon}
            </div>
            <h2 className="text-sm font-semibold text-white">{f.title}</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Yönerge Uyumluluğu */}
      <section className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white">Proje Yönergesi Uyumluluk Kriterleri</h2>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {GUIDELINES.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5">
                <IconCheck className="h-2.5 w-2.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Teknolojiler */}
      <section className="card p-6 space-y-3">
        <h2 className="text-sm font-semibold text-white">Kullanılan Teknolojiler</h2>
        <div className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-lg bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-xs text-neutral-300"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Veri Yönetimi & Yedekleme */}
      <section className="card p-6 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Veri Yönetimi (LocalStorage & JSON)</h2>
          <p className="mt-1 text-xs text-neutral-400">
            Kayıtlarınız tarayıcınızın yerel depolama alanında tutulmaktadır. Şu anda{' '}
            <strong className="text-neutral-200">{items.length}</strong> kayıt bulunmaktadır.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button type="button" onClick={handleExport} className="btn-ghost py-2 text-xs">
            <IconDownload className="h-3.5 w-3.5" />
            <span>Yedeği İndir (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-ghost py-2 text-xs"
          >
            <IconUpload className="h-3.5 w-3.5" />
            <span>Yedekten Yükle (JSON)</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImport}
          />

          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="btn-accent py-2 text-xs"
          >
            <IconSparkles className="h-3.5 w-3.5" />
            <span>Örnek Verileri Yükle</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmClearOpen(true)}
            disabled={items.length === 0}
            className="btn-danger py-2 text-xs"
          >
            <IconTrash className="h-3.5 w-3.5" />
            <span>Listeyi Temizle</span>
          </button>
        </div>
      </section>

      {/* Listeyi Temizle Onayı */}
      <ConfirmDialog
        open={confirmClearOpen}
        title="Tüm listeyi temizlemek istiyor musunuz?"
        description="Bu işlem geri alınamaz. Bütün film ve dizi kayıtlarınız yerel hafızadan silinecektir."
        confirmLabel="Hepsini Sil"
        onConfirm={() => {
          clearAll()
          setConfirmClearOpen(false)
          notify('Tüm kayıtlar silindi.')
        }}
        onCancel={() => setConfirmClearOpen(false)}
      />

      {/* Örnek Verilere Dönme Onayı */}
      <ConfirmDialog
        open={confirmResetOpen}
        title="Örnek veriler yüklensin mi?"
        description="Mevcut listenizin yerine örnek film ve diziler yüklenecektir."
        confirmLabel="Örnekleri Yükle"
        onConfirm={() => {
          resetToSamples()
          setConfirmResetOpen(false)
          notify('Örnek veriler başarıyla yüklendi.')
        }}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  )
}
