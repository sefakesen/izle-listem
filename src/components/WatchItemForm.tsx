import { useState } from 'react'
import type { FormEvent } from 'react'
import type { MediaType, WatchItemInput, WatchStatus } from '../interfaces/WatchItem'
import { GENRES, STATUS_META, TYPE_META } from '../utils/constants'
import Poster from './Poster'
import StarRating from './StarRating'

interface WatchItemFormProps {
  /** Düzenleme modunda mevcut kaydın verileri */
  initialValues?: WatchItemInput
  submitLabel: string
  onSubmit: (values: WatchItemInput) => void
  onCancel: () => void
}

/** Form alanlarının ham (string) hali */
interface FormState {
  title: string
  type: MediaType
  genre: string
  year: string
  status: WatchStatus
  rating: number
  posterUrl: string
  notes: string
  season: string
  episode: string
  favorite: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

const CURRENT_YEAR = new Date().getFullYear()

function toFormState(values?: WatchItemInput): FormState {
  return {
    title: values?.title ?? '',
    type: values?.type ?? 'film',
    genre: values?.genre ?? GENRES[0],
    year: values?.year ? String(values.year) : '',
    status: values?.status ?? 'izlenecek',
    rating: values?.rating ?? 0,
    posterUrl: values?.posterUrl ?? '',
    notes: values?.notes ?? '',
    season: values?.season ? String(values.season) : '',
    episode: values?.episode ? String(values.episode) : '',
    favorite: values?.favorite ?? false,
  }
}

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {}
  const title = state.title.trim()
  if (!title) errors.title = 'Başlık zorunludur.'
  else if (title.length > 100) errors.title = 'Başlık en fazla 100 karakter olabilir.'

  if (state.year) {
    const year = Number(state.year)
    if (!Number.isInteger(year) || year < 1888 || year > CURRENT_YEAR + 5)
      errors.year = `1888 ile ${CURRENT_YEAR + 5} arasında bir yıl girin.`
  }

  if (state.posterUrl && !/^https?:\/\/\S+$/i.test(state.posterUrl.trim()))
    errors.posterUrl = 'Geçerli bir http(s) adresi girin.'

  for (const key of ['season', 'episode'] as const) {
    if (state[key] && (!Number.isInteger(Number(state[key])) || Number(state[key]) < 1))
      errors[key] = 'Pozitif bir sayı girin.'
  }

  if (state.notes.length > 500) errors.notes = 'Not en fazla 500 karakter olabilir.'
  return errors
}

/** Hem "Ekle" hem "Güncelle" sayfalarında kullanılan ortak form */
export default function WatchItemForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: WatchItemFormProps) {
  const [state, setState] = useState<FormState>(() => toFormState(initialValues))
  const [errors, setErrors] = useState<FormErrors>({})

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(state)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const isSeries = state.type === 'dizi'
    onSubmit({
      title: state.title.trim(),
      type: state.type,
      genre: state.genre,
      year: state.year ? Number(state.year) : undefined,
      status: state.status,
      rating: state.rating,
      posterUrl: state.posterUrl.trim() || undefined,
      notes: state.notes.trim() || undefined,
      season: isSeries && state.season ? Number(state.season) : undefined,
      episode: isSeries && state.episode ? Number(state.episode) : undefined,
      favorite: state.favorite,
    })
  }

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-xs font-medium text-red-400">
        {errors[key]}
      </p>
    ) : null

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="card space-y-5 p-6">
        {/* Tür seçimi */}
        <fieldset>
          <legend className="label">İçerik Türü</legend>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(TYPE_META) as MediaType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set('type', t)}
                aria-pressed={state.type === t}
                className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  state.type === t
                    ? 'border-rose-500/60 bg-rose-500/10 text-white ring-4 ring-rose-500/10'
                    : 'border-white/10 bg-ink-900 text-slate-400 hover:text-slate-100'
                }`}
              >
                <span className="mr-2 text-lg">{TYPE_META[t].icon}</span>
                {TYPE_META[t].label}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="title" className="label">
            Başlık *
          </label>
          <input
            id="title"
            value={state.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder={state.type === 'film' ? 'Örn. Inception' : 'Örn. Dark'}
            className="input"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            autoFocus
          />
          {fieldError('title')}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="genre" className="label">
              Tür
            </label>
            <select
              id="genre"
              value={state.genre}
              onChange={(e) => set('genre', e.target.value)}
              className="input cursor-pointer"
            >
              {GENRES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="year" className="label">
              Yapım Yılı
            </label>
            <input
              id="year"
              type="number"
              inputMode="numeric"
              value={state.year}
              onChange={(e) => set('year', e.target.value)}
              placeholder={String(CURRENT_YEAR)}
              className="input"
              aria-invalid={Boolean(errors.year)}
            />
            {fieldError('year')}
          </div>
        </div>

        <fieldset>
          <legend className="label">Durum</legend>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(STATUS_META) as WatchStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set('status', s)}
                aria-pressed={state.status === s}
                className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-inset transition ${
                  state.status === s
                    ? STATUS_META[s].badge
                    : 'bg-ink-900 text-slate-400 ring-white/10 hover:text-slate-100'
                }`}
              >
                {STATUS_META[s].label}
              </button>
            ))}
          </div>
        </fieldset>

        {state.type === 'dizi' && (
          <div className="grid animate-fade-in gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="season" className="label">
                Sezon
              </label>
              <input
                id="season"
                type="number"
                min={1}
                value={state.season}
                onChange={(e) => set('season', e.target.value)}
                placeholder="1"
                className="input"
              />
              {fieldError('season')}
            </div>
            <div>
              <label htmlFor="episode" className="label">
                Bölüm
              </label>
              <input
                id="episode"
                type="number"
                min={1}
                value={state.episode}
                onChange={(e) => set('episode', e.target.value)}
                placeholder="1"
                className="input"
              />
              {fieldError('episode')}
            </div>
          </div>
        )}

        <div>
          <span className="label">Puanın</span>
          <div className="flex items-center gap-3">
            <StarRating value={state.rating} onChange={(v) => set('rating', v)} size="lg" />
            <span className="text-sm text-slate-500">
              {state.rating ? `${state.rating} / 5` : 'Puanlanmadı'}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="posterUrl" className="label">
            Afiş URL (isteğe bağlı)
          </label>
          <input
            id="posterUrl"
            type="url"
            value={state.posterUrl}
            onChange={(e) => set('posterUrl', e.target.value)}
            placeholder="https://..."
            className="input"
            aria-invalid={Boolean(errors.posterUrl)}
          />
          {fieldError('posterUrl')}
        </div>

        <div>
          <label htmlFor="notes" className="label">
            Notlar
          </label>
          <textarea
            id="notes"
            rows={3}
            value={state.notes}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Kim önerdi, nerede izlenir, düşüncelerin..."
            className="input resize-y"
          />
          <div className="mt-1 flex justify-between">
            {fieldError('notes') ?? <span />}
            <span className="text-xs text-slate-500">{state.notes.length}/500</span>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 select-none">
          <input
            type="checkbox"
            checked={state.favorite}
            onChange={(e) => set('favorite', e.target.checked)}
            className="h-5 w-5 accent-rose-500"
          />
          <span className="text-sm font-medium">❤️ Favorilerime ekle</span>
        </label>

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="btn-ghost">
            Vazgeç
          </button>
          <button type="submit" className="btn-primary px-6">
            {submitLabel}
          </button>
        </div>
      </div>

      {/* Canlı önizleme */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="label">Önizleme</p>
          <div className="card overflow-hidden">
            <div className="aspect-[3/4]">
              <Poster
                title={state.title || 'Yeni Kayıt'}
                type={state.type}
                posterUrl={/^https?:\/\//i.test(state.posterUrl) ? state.posterUrl : undefined}
              />
            </div>
            <div className="space-y-1 p-4">
              <p className="line-clamp-1 font-bold">{state.title || 'Başlık'}</p>
              <p className="text-sm text-slate-400">
                {[state.year, state.genre].filter(Boolean).join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </form>
  )
}
