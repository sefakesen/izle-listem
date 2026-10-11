import type { MediaType, SortOption, WatchStatus } from '../interfaces/WatchItem'

export const GENRES = [
  'Aksiyon',
  'Animasyon',
  'Belgesel',
  'Bilim Kurgu',
  'Dram',
  'Fantastik',
  'Gerilim',
  'Komedi',
  'Korku',
  'Macera',
  'Polisiye',
  'Romantik',
  'Suç',
  'Tarih',
] as const

export const STATUS_META: Record<WatchStatus, { label: string; badge: string; dot: string }> = {
  izlenecek: {
    label: 'İzlenecek',
    badge: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
    dot: 'bg-sky-400',
  },
  izleniyor: {
    label: 'İzleniyor',
    badge: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    dot: 'bg-amber-400',
  },
  izlendi: {
    label: 'İzlendi',
    badge: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    dot: 'bg-emerald-400',
  },
}

export const TYPE_META: Record<MediaType, { label: string; icon: string }> = {
  film: { label: 'Film', icon: '🎬' },
  dizi: { label: 'Dizi', icon: '📺' },
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'yeni', label: 'En yeni eklenen' },
  { value: 'eski', label: 'En eski eklenen' },
  { value: 'puan', label: 'En yüksek puan' },
  { value: 'baslik', label: 'Başlık (A-Z)' },
  { value: 'yil', label: 'Yapım yılı' },
]

export const STORAGE_KEY = 'izle-listem:items'
