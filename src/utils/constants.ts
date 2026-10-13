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

export const STATUS_META: Record<
  WatchStatus,
  { label: string; badge: string; dot: string; textClass: string }
> = {
  izlenecek: {
    label: 'İzlenecek',
    badge: 'bg-zinc-800/80 text-zinc-300 ring-1 ring-zinc-700/60',
    dot: 'bg-zinc-400',
    textClass: 'text-zinc-300',
  },
  izleniyor: {
    label: 'İzleniyor',
    badge: 'bg-amber-950/40 text-amber-200/90 ring-1 ring-amber-500/30',
    dot: 'bg-amber-400',
    textClass: 'text-amber-300',
  },
  izlendi: {
    label: 'İzlendi',
    badge: 'bg-emerald-950/40 text-emerald-200/90 ring-1 ring-emerald-500/30',
    dot: 'bg-emerald-400',
    textClass: 'text-emerald-300',
  },
}

export const TYPE_META: Record<MediaType, { label: string }> = {
  film: { label: 'Film' },
  dizi: { label: 'Dizi' },
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'yeni', label: 'En yeni eklenen' },
  { value: 'eski', label: 'En eski eklenen' },
  { value: 'puan', label: 'En yüksek puan' },
  { value: 'baslik', label: 'Başlık (A-Z)' },
  { value: 'yil', label: 'Yapım yılı' },
]

export const STORAGE_KEY = 'izle-listem:items'
