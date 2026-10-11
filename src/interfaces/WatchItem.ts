/**
 * Uygulamanın temel veri modelleri.
 * Tüm bileşenler ve sayfalar bu arayüzleri kullanır.
 */

/** İçerik türü: Film veya Dizi */
export type MediaType = 'film' | 'dizi'

/** İzleme durumu */
export type WatchStatus = 'izlenecek' | 'izleniyor' | 'izlendi'

/** Listede tutulan tek bir film/dizi kaydı */
export interface WatchItem {
  id: string
  title: string
  type: MediaType
  genre: string
  year?: number
  status: WatchStatus
  /** 0 = puanlanmamış, 1-5 arası yıldız */
  rating: number
  posterUrl?: string
  notes?: string
  /** Sadece diziler için: kaçıncı sezonda olduğu */
  season?: number
  /** Sadece diziler için: kaçıncı bölümde olduğu */
  episode?: number
  favorite: boolean
  createdAt: string
  updatedAt: string
}

/** Formdan gelen (henüz kaydedilmemiş) veri: id ve tarih alanları sistem tarafından atanır */
export type WatchItemInput = Omit<WatchItem, 'id' | 'createdAt' | 'updatedAt'>

/** Listeleme ekranındaki filtre durumu */
export interface WatchFilters {
  search: string
  type: MediaType | 'hepsi'
  status: WatchStatus | 'hepsi'
  genre: string
  onlyFavorites: boolean
  sortBy: SortOption
}

export type SortOption = 'yeni' | 'eski' | 'puan' | 'baslik' | 'yil'

/** Bildirim (toast) mesajı */
export interface Toast {
  id: string
  message: string
  variant: 'success' | 'error' | 'info'
}
