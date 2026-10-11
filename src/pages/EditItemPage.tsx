import { Link, useNavigate, useParams } from 'react-router'
import EmptyState from '../components/EmptyState'
import PageHeading from '../components/PageHeading'
import WatchItemForm from '../components/WatchItemForm'
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
        icon="🤷"
        title="Kayıt bulunamadı"
        description="Düzenlemek istediğin kayıt silinmiş ya da hiç var olmamış olabilir."
        action={
          <Link to="/" className="btn-primary">
            Listeye dön
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
