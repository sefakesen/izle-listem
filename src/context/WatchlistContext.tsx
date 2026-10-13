import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { WatchItem, WatchItemInput, WatchStatus } from '../interfaces/WatchItem'
import { sampleItems } from '../utils/sampleData'
import { createId, loadItems, saveItems } from '../utils/storage'

/**
 * Uygulamanın merkezi state'i.
 * CRUD işlemleri (Ekle / Listele / Güncelle / Sil) burada tanımlanır
 * ve her değişiklik otomatik olarak LocalStorage'a yazılır.
 */
interface WatchlistContextValue {
  items: WatchItem[]
  /** EKLE */
  addItem: (input: WatchItemInput) => WatchItem
  /** LİSTELE (tek kayıt) */
  getItem: (id: string) => WatchItem | undefined
  /** GÜNCELLE */
  updateItem: (id: string, changes: Partial<WatchItemInput>) => void
  /** SİL */
  deleteItem: (id: string) => void
  toggleFavorite: (id: string) => void
  setStatus: (id: string, status: WatchStatus) => void
  clearAll: () => void
  /** YEDEKLEME & YENİDEN YÜKLEME */
  importItems: (newItems: WatchItem[]) => void
  resetToSamples: () => void
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WatchItem[]>(() => loadItems())

  // Her değişiklikte LocalStorage'ı senkronize et
  useEffect(() => {
    saveItems(items)
  }, [items])

  const addItem = useCallback((input: WatchItemInput) => {
    const timestamp = new Date().toISOString()
    const newItem: WatchItem = {
      ...input,
      id: createId(),
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    setItems((prev) => [newItem, ...prev])
    return newItem
  }, [])

  const getItem = useCallback((id: string) => items.find((item) => item.id === id), [items])

  const updateItem = useCallback((id: string, changes: Partial<WatchItemInput>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item,
      ),
    )
  }, [])

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)),
    )
  }, [])

  const setStatus = useCallback(
    (id: string, status: WatchStatus) => updateItem(id, { status }),
    [updateItem],
  )

  const clearAll = useCallback(() => setItems([]), [])

  const importItems = useCallback((newItems: WatchItem[]) => {
    setItems(newItems)
  }, [])

  const resetToSamples = useCallback(() => {
    setItems(sampleItems)
  }, [])

  const value = useMemo(
    () => ({
      items,
      addItem,
      getItem,
      updateItem,
      deleteItem,
      toggleFavorite,
      setStatus,
      clearAll,
      importItems,
      resetToSamples,
    }),
    [items, addItem, getItem, updateItem, deleteItem, toggleFavorite, setStatus, clearAll, importItems, resetToSamples],
  )

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlist(): WatchlistContextValue {
  const context = useContext(WatchlistContext)
  if (!context) throw new Error('useWatchlist, WatchlistProvider içinde kullanılmalıdır.')
  return context
}
