import { useNavigate } from 'react-router'
import PageHeading from '../components/PageHeading'
import WatchItemForm from '../components/WatchItemForm'
import { useToast } from '../context/ToastContext'
import { useWatchlist } from '../context/WatchlistContext'
import type { WatchItemInput } from '../interfaces/WatchItem'

/** EKLE sayfası */
export default function AddItemPage() {
  const { addItem } = useWatchlist()
  const { notify } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (values: WatchItemInput) => {
    addItem(values)
    notify(`"${values.title}" koleksiyonunuza eklendi.`)
    navigate('/')
  }

  return (
    <div className="space-y-6">
      <PageHeading
        title="Yeni Film / Dizi Ekle"
        description="İzlediğiniz ya da izlemek istediğiniz bir yapımı koleksiyonunuza ekleyin."
      />
      <WatchItemForm submitLabel="Koleksiyona Ekle" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </div>
  )
}
