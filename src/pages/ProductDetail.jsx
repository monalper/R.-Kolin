import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/allProducts.js'
import { useCart } from '../contexts/CartContext.jsx'
import { QuantitySelector } from '../components/QuantitySelector.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const timeoutRef = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef(null)
  const stickyRef = useRef(null)
  const { formatCurrency, t } = useLocale()

  useEffect(() => {
    const containerEl = containerRef.current
    const imagesEl = imagesRef.current
    const stickyEl = stickyRef.current

    if (!containerEl || !imagesEl || !stickyEl) {
      console.log('[StickyDebug] element eksik', {
        hasContainer: !!containerEl,
        hasImages: !!imagesEl,
        hasSticky: !!stickyEl,
      })
      return
    }

    const logMetrics = () => {
      const containerRect = containerEl.getBoundingClientRect()
      const imagesRect = imagesEl.getBoundingClientRect()
      const stickyRect = stickyEl.getBoundingClientRect()
      const position = window.getComputedStyle(stickyEl).position
      const deltaImages = imagesRect.bottom - stickyRect.bottom
      const deltaContainer = containerRect.bottom - stickyRect.bottom

      const reason =
        containerRect.height <= stickyRect.height
          ? 'container_kisa_veya_sticky_cok_yuksek'
          : imagesRect.height <= stickyRect.height
            ? 'gorsel_kisa_veya_yetersiz_alan'
            : 'belirsiz'

      console.log('[StickyDebug] scroll', {
        scrollY: window.scrollY,
        position,
        viewportHeight: window.innerHeight,
        containerTop: containerRect.top,
        containerBottom: containerRect.bottom,
        containerHeight: containerRect.height,
        imagesTop: imagesRect.top,
        imagesBottom: imagesRect.bottom,
        imagesHeight: imagesRect.height,
        stickyTop: stickyRect.top,
        stickyBottom: stickyRect.bottom,
        stickyHeight: stickyRect.height,
        deltaImages, // imagesBottom - stickyBottom
        deltaContainer, // containerBottom - stickyBottom
        analysisReason: reason,
      })
    }

    logMetrics()

    const onScroll = () => {
      window.requestAnimationFrame(logMetrics)
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', logMetrics)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', logMetrics)
    }
  }, [])

  if (!product) {
    return (
      <div className="pt-10">
        <p className="text-sm text-ink/70">Ürün bulunamadı.</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setAdded(true)
    timeoutRef.current = window.setTimeout(() => {
      setAdded(false)
    }, 1000)
  }

  return (
    <section className="pt-2">
      <div
        ref={containerRef}
        className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
      >
        <div
          ref={imagesRef}
          className="-ml-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar gap-0 md:-ml-10 md:flex-col md:overflow-x-visible md:snap-none lg:-ml-12"
        >
          {product.images?.map((image) => (
            <div
              key={image.src}
              className="w-screen flex-shrink-0 snap-center overflow-hidden bg-canvas md:w-auto md:flex-none md:snap-none"
            >
              <img
                src={image.src}
                alt={image.alt || product.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div
          ref={stickyRef}
          className="sticky top-24 space-y-8 md:top-28"
        >
          <div className="space-y-3">
            <h1 className="text-2xl font-medium md:text-3xl">{product.name}</h1>
            <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">
              {product.category} · {product.collection}
            </p>
            <p className="text-lg font-medium text-ink md:text-xl">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="space-y-6 rounded-3xl bg-ivory px-5 py-6 md:px-6 md:py-7">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
              <span>{t('product.quantityLabel')}</span>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
            <p className="text-xs leading-relaxed text-ink/60">
              {t('product.shippingNote')}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-ivory hover:bg-accent"
            >
              {added ? t('product.added') : t('product.addToCart')}
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              {t('product.details.label')}
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-ink/80">
              {product.notes?.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
