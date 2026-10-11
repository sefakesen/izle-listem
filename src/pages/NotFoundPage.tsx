import { Link } from 'react-router'
import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState
      icon="🎞️"
      title="404 · Sayfa bulunamadı"
      description="Aradığın sahne kurgu masasında kalmış olmalı."
      action={
        <Link to="/" className="btn-primary">
          Ana sayfaya dön
        </Link>
      }
    />
  )
}
