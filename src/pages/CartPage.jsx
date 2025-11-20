import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext.jsx'
import { QuantitySelector } from '../components/QuantitySelector.jsx'
import { CartSummary } from '../components/CartSummary.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart()
  const { formatCurrency, t, language } = useLocale()

  const hasItems = items.length > 0
  const basePath = `/${language}`

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pt-6"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
            {t('cart.label')}
          </p>
          <h1 className="mt-3 text-xl font-medium md:text-2xl">
            {hasItems ? t('cart.title.nonEmpty') : t('cart.title.empty')}
          </h1>
        </div>
        {hasItems && (
          <p className="hidden max-w-xs text-xs leading-relaxed text-ink/60 md:block">
            {t('cart.subtitle')}
          </p>
        )}
      </div>

      {hasItems ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl bg-ivory px-5 py-6 md:px-6 md:py-7"
              >
                <div className="flex items-start gap-6">
                  {item.images?.[0] && (
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-canvas">
                      <img
                        src={item.images[0].src}
                        alt={item.images[0].alt || item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 items-start justify-between gap-6">
                    <div className="space-y-3">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
                        {item.category}
                      </p>
                      <h2 className="text-sm font-medium md:text-base">
                        {item.name}
                      </h2>
                      <p className="max-w-md text-xs leading-relaxed text-ink/70">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right text-xs uppercase tracking-[0.25em] text-ink/70">
                      <p>{formatCurrency(item.price)}</p>
                      <p className="mt-1 text-ink/50">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value)}
                    min={0}
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <CartSummary
            subtotal={cartTotal}
            ctaLabel={t('cart.cta.checkout')}
            ctaTo={`${basePath}/checkout`}
          />
        </div>
      ) : (
        <div className="mt-10 space-y-6 rounded-3xl bg-ivory px-5 py-8 md:px-6 md:py-9">
          <p className="text-sm leading-relaxed text-ink/70">
            {t('cart.empty.description')}
          </p>
          <Link
            to={basePath}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-ivory hover:bg-accent"
          >
            {t('cart.empty.cta')}
          </Link>
        </div>
      )}
    </motion.section>
  )
}
