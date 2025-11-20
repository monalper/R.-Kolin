import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext.jsx'
import { CartSummary } from '../components/CartSummary.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, cartTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLocale()

  const hasItems = items.length > 0

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!hasItems || isSubmitting) return

    setIsSubmitting(true)

    setTimeout(() => {
      clearCart()
      navigate(-1)
    }, 700)
  }

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
            {t('checkout.label')}
          </p>
          <h1 className="mt-3 text-xl font-medium md:text-2xl">
            {t('checkout.title')}
          </h1>
        </div>
        <p className="hidden max-w-xs text-xs leading-relaxed text-ink/60 md:block">
          {t('checkout.subtitle')}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl bg-ivory px-5 py-8 md:px-6 md:py-9"
        >
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              {t('checkout.sections.info')}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t('checkout.fields.fullName')} required>
                <input
                  required
                  type="text"
                  placeholder="Örn. Elif Yılmaz"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
              <Field label={t('checkout.fields.email')} required>
                <input
                  required
                  type="email"
                  placeholder="ornek@mail.com"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t('checkout.fields.phone')}>
                <input
                  type="tel"
                  placeholder="+90"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              {t('checkout.sections.shipping')}
            </p>
            <div className="space-y-4">
              <Field label={t('checkout.fields.address')} required>
                <input
                  required
                  type="text"
                  placeholder="Sokak, bina, daire"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label={t('checkout.fields.city')} required>
                  <input
                    required
                    type="text"
                    placeholder="İstanbul"
                    className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                  />
                </Field>
                <Field label={t('checkout.fields.postalCode')} required>
                  <input
                    required
                    type="text"
                    placeholder="00000"
                    className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                  />
                </Field>
              </div>
              <Field label={t('checkout.fields.country')} required>
                <input
                  required
                  type="text"
                  defaultValue="Türkiye"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              {t('checkout.sections.payment')}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t('checkout.fields.cardName')} required>
                <input
                  required
                  type="text"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
              <Field label={t('checkout.fields.cardNumber')} required>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
              <Field label={t('checkout.fields.expiry')} required>
                <input
                  required
                  type="text"
                  placeholder="AA/YY"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
              <Field label={t('checkout.fields.cvv')} required>
                <input
                  required
                  type="password"
                  inputMode="numeric"
                  placeholder="***"
                  className="w-full rounded-full bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:bg-ivory focus-visible:outline-none"
                />
              </Field>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!hasItems || isSubmitting}
              className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.3em] ${
                !hasItems || isSubmitting
                  ? 'bg-ink/10 text-ink/40'
                  : 'bg-ink text-ivory hover:bg-accent'
              }`}
            >
              {isSubmitting ? t('checkout.submitting') : t('checkout.submit')}
            </button>
          </div>
        </form>

        <CartSummary subtotal={cartTotal} />
      </div>
    </motion.section>
  )
}

function Field({ label, required, children }) {
  const { t } = useLocale()

  return (
    <label className="space-y-1 text-xs">
      <span className="inline-flex items-center gap-1 text-ink/70">
        {label}
        {required && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
            {t('form.required')}
          </span>
        )}
      </span>
      {children}
    </label>
  )
}

