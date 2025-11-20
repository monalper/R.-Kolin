import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './contexts/CartContext.jsx'
import { Layout } from './components/Layout.jsx'
import { Home } from './pages/Home.jsx'
import { ProductDetail } from './pages/ProductDetail.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { CategoryPage } from './pages/CategoryPage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { LocaleProvider } from './contexts/LocaleContext.jsx'
import { ScrollManager } from './components/ScrollManager.jsx'
import { NotFound } from './pages/NotFound.jsx'

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

function normalizeLocale(locale) {
  const supported = ['us', 'uk', 'de', 'tr', 'fr', 'es']
  if (!locale || !supported.includes(locale)) {
    return 'tr'
  }
  return locale
}
