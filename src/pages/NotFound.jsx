import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function NotFound() {
  const { t, language } = useLocale()
  const basePath = `/${language}`

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
      <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
        404
      </p>
      <h1 className="text-center text-2xl font-medium md:text-3xl">
        {t('notFound.title')}
      </h1>
      <p className="max-w-md text-center text-sm leading-relaxed text-ink/70 md:text-base">
        {t('notFound.body')}
      </p>
      <Link
        to={basePath}
        className="mt-4 inline-flex items-center justify-center rounded-full border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-ink transition-colors hover:bg-ink hover:text-ivory"
      >
        {t('notFound.back')}
      </Link>
    </section>
  )
}

