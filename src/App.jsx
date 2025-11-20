import { useEffect } from 'react'
import { Routes, Route, useLocation, useParams, Navigate, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './contexts/CartContext.jsx'
import { Layout } from './components/Layout.jsx'
import { Home } from './pages/Home.jsx'
import { ProductDetail } from './pages/ProductDetail.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { LocaleProvider, useLocale } from './contexts/LocaleContext.jsx'
import { ScrollManager } from './components/ScrollManager.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { getProductBySlug } from './data/allProducts.js'

const defaultPageTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

const fadeOnlyTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function App() {
  const location = useLocation()

  return (
    <CartProvider>
      <Routes location={location}>
        <Route path="/" element={<AutoLocaleRedirect />} />
        <Route
          path="/:locale/*"
          element={<LocalizedShell location={location} />}
        />
        <Route path="*" element={<Navigate to="/tr" replace />} />
      </Routes>
    </CartProvider>
  )
}

function LocalizedShell({ location }) {
  const { locale } = useParams()
  const languageKey = normalizeLocale(locale)
  const isProductDetailRoute = location.pathname.includes('/products/')
  const pageTransition = isProductDetailRoute
    ? fadeOnlyTransition
    : defaultPageTransition

  return (
    <LocaleProvider languageKey={languageKey}>
      <DocumentTitleManager location={location} />
      <ScrollManager />
      <Layout>
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pt-24 pb-20"
          >
            <Routes location={location} key={location.pathname}>
              <Route index element={<Home />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="women/:category" element={<CategoryPage gender="women" />} />
              <Route path="men/:category" element={<CategoryPage gender="men" />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </Layout>
    </LocaleProvider>
  )
}

function DocumentTitleManager({ location }) {
  const { t, language } = useLocale()

  useEffect(() => {
    if (typeof document === 'undefined') return

    const segments = location.pathname.split('/').filter(Boolean)
    const localeSegment = segments[0]
    const rest = segments.slice(1)

    let title = 'Albert R. Kolin'

    if (rest.length === 0) {
      // Home
      title =
        language === 'tr'
          ? 'Albert R. Kolin – Atelier'
          : 'Albert R. Kolin – Collection'
    } else if (rest[0] === 'products' && rest[1]) {
      const product = getProductBySlug(rest[1])
      if (product?.name) {
        title = `${product.name} – Albert R. Kolin`
      } else {
        title = `Albert R. Kolin – ${t('home.collection.title')}`
      }
    } else if ((rest[0] === 'women' || rest[0] === 'men') && rest[1]) {
      const gender =
        rest[0] === 'women'
          ? language === 'tr'
            ? 'Kadın'
            : 'Women'
          : language === 'tr'
            ? 'Erkek'
            : 'Men'

      const categoryKey = rest[1]
      const categoryLabelsTr = {
        bags: 'Çanta',
        shoes: 'Ayakkabı',
        accessories: 'Aksesuar',
      }
      const categoryLabelsEn = {
        bags: 'Bags',
        shoes: 'Shoes',
        accessories: 'Accessories',
      }
      const categoryLabel =
        (language === 'tr'
          ? categoryLabelsTr[categoryKey]
          : categoryLabelsEn[categoryKey]) || categoryKey

      title = `${gender} ${categoryLabel} – Albert R. Kolin`
    } else if (rest[0] === 'cart') {
      title = `${t('cart.label')} – Albert R. Kolin`
    } else if (rest[0] === 'checkout') {
      title = `${t('checkout.label')} – Albert R. Kolin`
    } else if (rest[0] === 'search') {
      const label = language === 'tr' ? 'Arama' : 'Search'
      title = `${label} – Albert R. Kolin`
    } else if (rest[0] === '404') {
      title = `${t('notFound.title')} – Albert R. Kolin`
    }

    document.title = title
  }, [language, location.pathname, t])

  return null
}

function normalizeLocale(locale) {
  const supported = ['us', 'uk', 'de', 'tr', 'fr', 'es', 'it', 'kr', 'pt', 'az', 'ar', 'ja', 'ru']
  if (!locale || !supported.includes(locale)) {
    return 'tr'
  }
  return locale
}

function detectInitialLocale() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'tr'
  }

  const raw =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    ''
  const lang = raw.toLowerCase()

  if (lang.startsWith('tr')) return 'tr'
  if (lang.startsWith('de')) return 'de'
  if (lang.startsWith('fr')) return 'fr'
  if (lang.startsWith('es')) return 'es'
  if (lang.startsWith('it')) return 'it'
  if (lang.startsWith('ko')) return 'kr'
  if (lang.startsWith('pt')) return 'pt'
  if (lang.startsWith('az')) return 'az'
  if (lang.startsWith('ar')) return 'ar'
  if (lang.startsWith('ja')) return 'ja'
  if (lang.startsWith('ru')) return 'ru'

  if (lang.startsWith('en-gb') || lang.startsWith('en-uk')) return 'uk'
  if (lang.startsWith('en')) return 'us'

  return 'tr'
}

function AutoLocaleRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const target = detectInitialLocale()
    navigate(`/${target}`, { replace: true })
  }, [navigate])

  return null
}
