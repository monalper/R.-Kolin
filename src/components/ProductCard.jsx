import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function ProductCard({ product }) {
  const { formatCurrency, language } = useLocale()
  const primaryImage = product.images?.[0]
  const basePath = `/${language}`
  const location = useLocation()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link
        to={`${basePath}/products/${product.slug}`}
        className="flex flex-col overflow-hidden"
        onClick={() => {
          const key = `scroll:${location.pathname}`
          sessionStorage.setItem(key, String(window.scrollY || 0))
        }}
      >
        <div className="aspect-square w-full bg-canvas">
          {primaryImage && (
            <img
              src={primaryImage.src}
              alt={primaryImage.alt || product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs md:text-sm">
          <h3 className="text-sm font-medium md:text-base">{product.name}</h3>
          <span className="text-xs uppercase tracking-[0.25em] text-ink/70">
            {formatCurrency(product.price)}
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
