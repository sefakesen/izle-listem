import { Link } from 'react-router'
import { IconArrowLeft } from './icons'

interface PageHeadingProps {
  title: string
  description?: string
}

/** Alt sayfalarda geri bağlantısı ile başlık */
export default function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div className="space-y-1">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition hover:text-white"
      >
        <IconArrowLeft className="h-3.5 w-3.5" />
        <span>Koleksiyona dön</span>
      </Link>
      <h1 className="pt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
      {description && <p className="text-xs text-neutral-400">{description}</p>}
    </div>
  )
}
