import { Link, useNavigate, useParams } from 'react-router'
import EmptyState from '../components/EmptyState'
import PageHeading from '../components/PageHeading'
import WatchItemForm from '../components/WatchItemForm'
import { IconFilm } from '../components/icons'
import { useToast } from '../context/ToastContext'
import { useWatchlist } from '../context/WatchlistContext'
import type { WatchItemInput } from '../interfaces/WatchItem'

/** GÜNCELLE sayfası: URL'deki id ile kaydı bulur ve formu doldurur */
export default function EditItemPage() {
  const { id = '' } = useParams()
  const { getItem, updateItem } = useWatchlist()
  const { notify } = useToast()
  const navigate = useNavigate()
  const item = getItem(id)

  if (!item) {
    return (
      <EmptyState
        icon={<IconFilm className="h-8 w-8 text-neutral-400" />}
        title="Kayıt bulunamadı"
        description="Düzenlemek istediğiniz kayıt silinmiş veya bulunamıyor olabilir."
        action={
          <Link to="/" className="btn-primary py-2 text-xs">
            Koleksiyona dön
          </Link>
        }
      />
    )
  }

  // id ve tarih alanlarını ayırıp sadece form verilerini gönder
  const { id: _id, createdAt: _c, updatedAt, ...initialValues } = item

  const handleSubmit = (values: WatchItemInput) => {
    updateItem(item.id, values)
    notify(`"${values.title}" güncellendi.`)
    navigate('/')
  }

  return (
    <div className="space-y-6">
      <PageHeading
        title="Kaydı Düzenle"
        description={`Son güncelleme: ${new Date(updatedAt).toLocaleString('tr-TR')}`}
      />
      <WatchItemForm
        key={item.id}
        initialValues={initialValues}
        submitLabel="Değişiklikleri Kaydet"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}
