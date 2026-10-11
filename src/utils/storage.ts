import type { WatchItem } from '../interfaces/WatchItem'
import { STORAGE_KEY } from './constants'
import { sampleItems } from './sampleData'

/**
 * LocalStorage yardımcıları.
 * Veriler tarayıcıda JSON olarak saklanır; sayfa yenilense de kaybolmaz.
 */

export function loadItems(): WatchItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    // İlk açılışta örnek verilerle başla
    if (raw === null) return sampleItems
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as WatchItem[]) : []
  } catch {
    return []
  }
}

export function saveItems(items: WatchItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('LocalStorage kaydı başarısız:', error)
  }
}

export function createId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
