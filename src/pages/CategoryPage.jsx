import { useParams } from 'react-router-dom'
import { products } from '../data/allProducts.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function CategoryPage({ gender }) {
  const { category } = useParams()
  const { t } = useLocale()

  const normalizedCategory = category ?? ''

  const filteredProducts = products.filter(
    (product) =>
      product.categorySlug === normalizedCategory &&
      (product.gender === gender || product.gender === 'unisex'),
  )

  const translatedGenderLabel =
    gender === 'women' ? t('category.gender.women') : t('category.gender.men')

  const translatedCategoryKey =
    normalizedCategory === 'bags'
      ? 'category.category.bags'
      : normalizedCategory === 'shoes'
        ? 'category.category.shoes'
        : normalizedCategory === 'accessories'
          ? 'category.category.accessories'
          : null

  const translatedCategoryLabel =
    (translatedCategoryKey && t(translatedCategoryKey)) || normalizedCategory

  const title = `${translatedGenderLabel} ${translatedCategoryLabel}`
  const hasProducts = filteredProducts.length > 0

  return (
    <section className="space-y-8">
      <header className="space-y-3 text-center md:text-left">
        <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
          {t('category.label')}
        </p>
        <h1 className="text-2xl font-medium md:text-3xl">{title}</h1>
        <p className="text-sm leading-relaxed text-ink/70">
          {t('category.description')}
        </p>
      </header>

      {hasProducts ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-ink/70">
          {t('category.empty')}
        </p>
      )}
    </section>
  )
}
