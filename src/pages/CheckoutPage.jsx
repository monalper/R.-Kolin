import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiDiscover,
} from 'react-icons/si'
import { FaArrowDown } from 'react-icons/fa'
import { useCart } from '../contexts/CartContext.jsx'
import { CartSummary } from '../components/CartSummary.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

const COUNTRY_BY_LANGUAGE = {
  tr: { code: 'TR', label: 'Türkiye' },
  uk: { code: 'UK', label: 'United Kingdom' },
  us: { code: 'US', label: 'United States' },
  de: { code: 'DE', label: 'Germany' },
  fr: { code: 'FR', label: 'France' },
  es: { code: 'ES', label: 'Spain' },
  it: { code: 'IT', label: 'Italy' },
  kr: { code: 'KR', label: 'South Korea' },
  pt: { code: 'PT', label: 'Portugal' },
  az: { code: 'AZ', label: 'Azerbaijan' },
  ar: { code: 'AE', label: 'United Arab Emirates' },
  ja: { code: 'JP', label: 'Japan' },
  ru: { code: 'RU', label: 'Russia' },
}

const CITY_OPTIONS = {
  TR: ['İstanbul', 'Ankara', 'İzmir'],
  UK: ['London', 'Manchester', 'Birmingham'],
  US: ['New York', 'Los Angeles', 'San Francisco'],
  DE: ['Berlin', 'Munich', 'Hamburg'],
  FR: ['Paris', 'Lyon', 'Marseille'],
  ES: ['Madrid', 'Barcelona', 'Valencia'],
  IT: ['Milano', 'Roma', 'Firenze'],
  KR: ['Seoul', 'Busan', 'Incheon'],
  PT: ['Lisboa', 'Porto', 'Coimbra'],
  AZ: ['Bakı', 'Gəncə', 'Sumqayıt'],
  AE: ['Dubai', 'Abu Dhabi', 'Sharjah'],
  JP: ['Tokyo', 'Osaka', 'Kyoto'],
  RU: ['Moscow', 'Saint Petersburg', 'Kazan'],
}

const PHONE_COUNTRY_OPTIONS = [
  { id: 'TR', code: '+90' },
  { id: 'UK', code: '+44' },
  { id: 'US', code: '+1' },
  { id: 'DE', code: '+49' },
  { id: 'FR', code: '+33' },
  { id: 'ES', code: '+34' },
  { id: 'IT', code: '+39' },
  { id: 'KR', code: '+82' },
  { id: 'PT', code: '+351' },
  { id: 'AZ', code: '+994' },
  { id: 'AE', code: '+971' },
  { id: 'JP', code: '+81' },
  { id: 'RU', code: '+7' },
]

const INPUT_BASE =
  'w-full rounded-full border border-transparent bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus-visible:border-ink/20 focus-visible:bg-ivory focus-visible:outline-none'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, cartTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t, language, formatCurrency } = useLocale()

  const hasItems = items.length > 0
  const basePath = `/${language}`

  const defaultCountry = COUNTRY_BY_LANGUAGE[language] || COUNTRY_BY_LANGUAGE.tr
  const defaultPhoneCountryId =
    PHONE_COUNTRY_OPTIONS.find((opt) => opt.id === defaultCountry.code)?.id ||
    'TR'

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneCountryId, setPhoneCountryId] = useState(defaultPhoneCountryId)
  const [phoneNumber, setPhoneNumber] = useState('')

  const [address, setAddress] = useState('')
  const [countryCode, setCountryCode] = useState(defaultCountry.code)
  const [city, setCity] = useState(
    (CITY_OPTIONS[defaultCountry.code] && CITY_OPTIONS[defaultCountry.code][0]) ||
      '',
  )
  const [postalCode, setPostalCode] = useState('')

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCvvFocused, setIsCvvFocused] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)

  const cardDigits = cardNumber.replace(/\D/g, '')
  const cardBrand = detectCardBrand(cardDigits)

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

      {!hasItems ? (
        <div className="mt-10 space-y-6 rounded-3xl bg-ivory px-5 py-8 md:px-6 md:py-9">
          <p className="text-sm leading-relaxed text-ink/70">
            {language === 'tr'
              ? 'Ödeme adımına geçmek için sepetinize en az bir ürün ekleyin.'
              : 'Add at least one item to your bag before proceeding to checkout.'}
          </p>
          <Link
            to={basePath}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-ivory hover:bg-accent"
          >
            {t('cart.empty.cta')}
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid max-w-xl gap-10 mx-auto lg:mx-0 lg:max-w-none lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
          <form
            onSubmit={handleSubmit}
            className="space-y-7 rounded-3xl bg-ivory px-5 py-8 md:px-6 md:py-9"
          >
            {/* Info */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
                {t('checkout.sections.info')}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label={t('checkout.fields.fullName')} required>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder={
                      language === 'tr' ? 'Örn. Elif Yılmaz' : 'e.g. Jane Doe'
                    }
                    className={INPUT_BASE}
                  />
                </Field>
                <Field label={t('checkout.fields.email')} required>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="ornek@mail.com"
                    className={INPUT_BASE}
                  />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label={t('checkout.fields.phone')}>
                  <div className="flex gap-3">
                    <div className="relative">
                      <select
                        value={phoneCountryId}
                        onChange={(event) => {
                          const nextId = event.target.value
                          setPhoneCountryId(nextId)
                          setPhoneNumber('')
                        }}
                        className="w-24 appearance-none rounded-full border border-transparent bg-canvas px-3 py-3 pr-8 text-sm text-ink focus-visible:border-ink/20 focus-visible:bg-ivory focus-visible:outline-none"
                      >
                        {PHONE_COUNTRY_OPTIONS.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.code}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40">
                        <FaArrowDown className="h-3 w-3" />
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) =>
                        setPhoneNumber(
                          formatPhoneNumber(event.target.value, phoneCountryId),
                        )
                      }
                      placeholder={
                        phoneCountryId === 'TR'
                          ? '5xx xxx xx xx'
                          : phoneCountryId === 'UK'
                            ? '7xxx xxx xxx'
                            : 'xxx xxx xxxx'
                      }
                      className={INPUT_BASE}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Shipping */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
                {t('checkout.sections.shipping')}
              </p>
              <div className="space-y-4">
                <Field label={t('checkout.fields.address')} required>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder={
                      language === 'tr'
                        ? 'Sokak, bina, daire'
                        : 'Street, building, apartment'
                    }
                    className={INPUT_BASE}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label={t('checkout.fields.city')} required>
                    <div className="relative">
                      <select
                        required
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        className="w-full appearance-none rounded-full border border-transparent bg-canvas px-4 py-3 pr-9 text-sm text-ink focus-visible:border-ink/20 focus-visible:bg-ivory focus-visible:outline-none"
                      >
                        {(CITY_OPTIONS[countryCode] || ['']).map((option) => (
                          <option key={option} value={option}>
                            {option ||
                              (language === 'tr' ? 'Şehir seçin' : 'Select city')}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/40">
                        <FaArrowDown className="h-3 w-3" />
                      </span>
                    </div>
                  </Field>
                  <Field label={t('checkout.fields.postalCode')} required>
                    <input
                      required
                      type="text"
                      value={postalCode}
                      onChange={(event) => setPostalCode(event.target.value)}
                      placeholder="00000"
                      className={INPUT_BASE}
                    />
                  </Field>
                </div>
                <Field label={t('checkout.fields.country')} required>
                  <div className="relative">
                    <select
                      required
                      value={countryCode}
                      onChange={(event) => {
                        const nextCode = event.target.value
                        setCountryCode(nextCode)
                        const firstCity =
                          (CITY_OPTIONS[nextCode] && CITY_OPTIONS[nextCode][0]) ||
                          ''
                        setCity(firstCity)
                      }}
                      className="w-full appearance-none rounded-full border border-transparent bg-canvas px-4 py-3 pr-9 text-sm text-ink focus-visible:border-ink/20 focus-visible:bg-ivory focus-visible:outline-none"
                    >
                      {Object.values(COUNTRY_BY_LANGUAGE).map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/40">
                      <FaArrowDown className="h-3 w-3" />
                    </span>
                  </div>
                </Field>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
                {t('checkout.sections.payment')}
              </p>

              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-full border border-ink/10 bg-ink px-6 py-3 text-sm font-medium text-ivory"
                  >
                    {language === 'tr' ? 'Google Pay ile öde' : 'Pay with Google Pay'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-full border border-ink/10 bg-ivory px-6 py-3 text-sm font-medium text-ink"
                  >
                    {language === 'tr' ? 'iyzico ile öde' : 'Pay with iyzico'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCardForm((open) => !open)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-ink/10 bg-ivory px-6 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink"
                >
                  {language === 'tr' ? 'Kredi kartı ile öde' : 'Pay with card'}
                </button>

                {showCardForm && (
                  <>
                    <CardPreview
                      cardName={cardName}
                      cardNumber={cardNumber}
                      cardExpiry={cardExpiry}
                      cardCvv={cardCvv}
                      cardBrand={cardBrand}
                      language={language}
                      isBack={isCvvFocused}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label={t('checkout.fields.cardName')} required>
                        <input
                          required
                          type="text"
                          value={cardName}
                          onChange={(event) => setCardName(event.target.value)}
                          className={INPUT_BASE}
                        />
                      </Field>
                      <Field label={t('checkout.fields.cardNumber')} required>
                        <input
                          required
                          type="text"
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(event) =>
                            setCardNumber(formatCardNumber(event.target.value))
                          }
                          placeholder="0000 0000 0000 0000"
                          className={INPUT_BASE}
                        />
                      </Field>
                      <Field label={t('checkout.fields.expiry')} required>
                        <input
                          required
                          type="text"
                          inputMode="numeric"
                          value={cardExpiry}
                          onChange={(event) =>
                            setCardExpiry(formatExpiry(event.target.value))
                          }
                          placeholder="AA/YY"
                          className={INPUT_BASE}
                        />
                      </Field>
                      <Field label={t('checkout.fields.cvv')} required>
                        <input
                          required
                          type="password"
                          inputMode="numeric"
                          value={cardCvv}
                          onChange={(event) =>
                            setCardCvv(
                              event.target.value.replace(/\D/g, '').slice(0, 4),
                            )
                          }
                          onFocus={() => setIsCvvFocused(true)}
                          onBlur={() => setIsCvvFocused(false)}
                          placeholder="***"
                          className={INPUT_BASE}
                        />
                      </Field>
                    </div>
                  </>
                )}
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

          <div className="space-y-6">
            <section className="rounded-3xl bg-ivory px-5 py-6 md:px-6 md:py-7">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/50">
                <span>
                  {language === 'tr' ? 'Sipariş özeti' : 'Order summary'}
                </span>
                <span>{items.length}</span>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-ink/80 md:text-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="flex-1 truncate">
                      {item.name}{' '}
                      <span className="text-ink/50">×{item.quantity}</span>
                    </span>
                    <span className="whitespace-nowrap text-ink/70">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <CartSummary subtotal={cartTotal} />
          </div>
        </div>
      )}
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

function CardPreview({
  cardName,
  cardNumber,
  cardExpiry,
  cardCvv,
  cardBrand,
  language,
  isBack,
}) {
  const displayNumber = cardNumber || '0000 0000 0000 0000'
  const displayName =
    cardName || (language === 'tr' ? 'Kart sahibinin adı' : 'Cardholder name')
  const displayExpiry = cardExpiry || 'MM/YY'
  const displayCvv = cardCvv || '•••'

  return (
    <section
      className="relative w-full max-w-xs overflow-hidden rounded-[20px] border border-ink/10 bg-canvas text-ink"
      style={{ aspectRatio: '85 / 54' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(4,4,205,0.18),transparent_55%)]" />
      <div className="relative flex h-full select-none flex-col justify-between px-4 py-3 md:px-5 md:py-4">
        {isBack ? (
          <>
            <div className="h-7 w-full rounded bg-ink/10" />
            <div className="mt-4 flex justify-end">
              <div className="w-24 rounded bg-ink px-3 py-1 text-right text-[11px] tracking-[0.25em] text-ivory">
                {displayCvv}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-ink/60">
              <span>{language === 'tr' ? 'Güvenlik kodu' : 'Security code'}</span>
              <span>Kolin</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-ink/60">
              <span>Kolin</span>
              <span className="flex items-center gap-2 text-2xl text-ink">
                {cardBrand === 'visa' && <SiVisa />}
                {cardBrand === 'mastercard' && <SiMastercard />}
                {cardBrand === 'amex' && <SiAmericanexpress />}
                {cardBrand === 'discover' && <SiDiscover />}
              </span>
            </div>

            <div className="mt-4 text-sm tracking-[0.3em]">
              {displayNumber}
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-ink/60">
              <div className="flex flex-col">
                <span>{language === 'tr' ? 'Kart sahibi' : 'Cardholder'}</span>
                <span className="mt-1 text-[11px] tracking-normal text-ink">
                  {displayName}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span>{language === 'tr' ? 'Son kullanma' : 'Expires'}</span>
                <span className="mt-1 text-[11px] tracking-[0.25em] text-ink">
                  {displayExpiry}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 19)
  const parts = []
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4))
  }
  return parts.join(' ')
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function detectCardBrand(digits) {
  if (!digits) return null
  if (digits.startsWith('4')) return 'visa'
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard'
  if (/^3[47]/.test(digits)) return 'amex'
  if (digits.startsWith('6')) return 'discover'
  return null
}

function formatPhoneNumber(value, countryId) {
  const digits = value.replace(/\D/g, '')

  if (countryId === 'TR') {
    const sliced = digits.slice(0, 10)
    const parts = []
    if (sliced.length <= 3) return sliced
    parts.push(sliced.slice(0, 3))
    if (sliced.length <= 6) {
      parts.push(sliced.slice(3))
      return parts.join(' ')
    }
    parts.push(sliced.slice(3, 6))
    if (sliced.length <= 8) {
      parts.push(sliced.slice(6))
      return parts.join(' ')
    }
    parts.push(sliced.slice(6, 8))
    if (sliced.length > 8) parts.push(sliced.slice(8))
    return parts.join(' ')
  }

  if (countryId === 'UK') {
    const sliced = digits.slice(0, 10)
    const parts = []
    if (sliced.length <= 4) return sliced
    parts.push(sliced.slice(0, 4))
    if (sliced.length <= 7) {
      parts.push(sliced.slice(4))
      return parts.join(' ')
    }
    parts.push(sliced.slice(4, 7))
    if (sliced.length > 7) parts.push(sliced.slice(7))
    return parts.join(' ')
  }

  if (countryId === 'US' || countryId === 'DE') {
    const sliced = digits.slice(0, 10)
    const parts = []
    if (sliced.length <= 3) return sliced
    parts.push(sliced.slice(0, 3))
    if (sliced.length <= 6) {
      parts.push(sliced.slice(3))
      return parts.join(' ')
    }
    parts.push(sliced.slice(3, 6))
    if (sliced.length > 6) parts.push(sliced.slice(6))
    return parts.join(' ')
  }

  if (countryId === 'FR') {
    const sliced = digits.slice(0, 10)
    const parts = []
    if (sliced.length <= 2) return sliced
    parts.push(sliced.slice(0, 2))
    if (sliced.length <= 4) {
      parts.push(sliced.slice(2))
      return parts.join(' ')
    }
    parts.push(sliced.slice(2, 4))
    if (sliced.length <= 6) {
      parts.push(sliced.slice(4))
      return parts.join(' ')
    }
    parts.push(sliced.slice(4, 6))
    if (sliced.length <= 8) {
      parts.push(sliced.slice(6))
      return parts.join(' ')
    }
    parts.push(sliced.slice(6, 8))
    if (sliced.length > 8) parts.push(sliced.slice(8))
    return parts.join(' ')
  }

  if (countryId === 'ES') {
    const sliced = digits.slice(0, 9)
    const parts = []
    if (sliced.length <= 3) return sliced
    parts.push(sliced.slice(0, 3))
    if (sliced.length <= 6) {
      parts.push(sliced.slice(3))
      return parts.join(' ')
    }
    parts.push(sliced.slice(3, 6))
    if (sliced.length > 6) parts.push(sliced.slice(6))
    return parts.join(' ')
  }

  const sliced = digits.slice(0, 10)
  const parts = []
  if (sliced.length <= 3) return sliced
  parts.push(sliced.slice(0, 3))
  if (sliced.length <= 6) {
    parts.push(sliced.slice(3))
    return parts.join(' ')
  }
  parts.push(sliced.slice(3, 6))
  if (sliced.length > 6) parts.push(sliced.slice(6))
  return parts.join(' ')
}
