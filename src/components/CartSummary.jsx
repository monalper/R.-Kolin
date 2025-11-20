import { Link } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function CartSummary({ subtotal, ctaLabel, ctaTo, disabled }) {
  const { formatCurrency, t } = useLocale()

  const shipping = subtotal > 0 ? 0 : 0
  const total = subtotal + shipping

  return (
    <section className="rounded-3xl bg-ivory px-5 py-6 md:px-6 md:py-7">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/50">
        <span>{t('summary.label')}</span>
        <span>{t('summary.taxes')}</span>
      </div>
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span>{t('summary.subtotal')}</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-ink/60">
          <span>{t('summary.shipping')}</span>
          <span>
            {shipping === 0
              ? t('summary.shippingIncluded')
              : formatCurrency(shipping)}
          </span>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.25em]">
        <span>{t('summary.total')}</span>
        <span>{formatCurrency(total)}</span>
      </div>
      {ctaTo && (
        <div className="mt-8">
          <Link
            to={ctaTo}
            className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.3em] ${
              disabled
                ? 'bg-ink/10 text-ink/40'
                : 'bg-ink text-ivory hover:bg-accent'
            }`}
            aria-disabled={disabled}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </section>
  )
}

