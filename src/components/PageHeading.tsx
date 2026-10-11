import { Link } from 'react-router'

interface PageHeadingProps {
  title: string
  description?: string
}

/** Alt sayfalarda geri bağlantısı ile başlık */
export default function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div>
      <Link to="/" className="text-sm font-medium text-slate-400 transition hover:text-white">
        ← Listeye dön
      </Link>
      <h1 className="mt-2 text-3xl font-black tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-slate-400">{description}</p>}
    </div>
  )
}
