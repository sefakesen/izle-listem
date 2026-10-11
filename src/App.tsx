import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import { ToastProvider } from './context/ToastContext'
import { WatchlistProvider } from './context/WatchlistContext'
import AboutPage from './pages/AboutPage'
import AddItemPage from './pages/AddItemPage'
import EditItemPage from './pages/EditItemPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <WatchlistProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="ekle" element={<AddItemPage />} />
              <Route path="duzenle/:id" element={<EditItemPage />} />
              <Route path="hakkinda" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </WatchlistProvider>
  )
}
