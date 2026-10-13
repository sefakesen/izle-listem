import { Link } from 'react-router'
import EmptyState from '../components/EmptyState'
import { IconFilm } from '../components/icons'

export default function NotFoundPage() {
  return (
    <EmptyState
      icon={<IconFilm className="h-8 w-8 text-[#c5a880]" />}
      title="404 · Sayfa Bulunamadı"
      description="Aradığınız sayfa silinmiş veya taşınmış olabilir."
      action={
        <Link to="/" className="btn-primary py-2 text-xs">
          Koleksiyona Dön
        </Link>
      }
    />
  )
}
