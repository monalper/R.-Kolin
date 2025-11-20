import { useParams } from 'react-router-dom'
import { products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function CategoryPage({ gender }) {
  const { category } = useParams()
  const { language } = useLocale()

  const normalizedCategory = category ?? ''

  const filteredProducts = products.filter(
    (product) =>
      product.categorySlug === normalizedCategory &&
      (product.gender === gender || product.gender === 'unisex'),
  )

  const genderLabel =
    gender === 'women'
      ? language === 'tr'
        ? 'Kadın'
        : 'Women'
      : language === 'tr'
        ? 'Erkek'
        : 'Men'

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
      ? categoryLabelsTr[normalizedCategory]
      : categoryLabelsEn[normalizedCategory]) || normalizedCategory

  const title =
    language === 'tr'
      ? `${genderLabel} ${categoryLabel}`
      : `${genderLabel} ${categoryLabel}`

  const hasProducts = filteredProducts.length > 0

  return (
    <section className="space-y-8">
      <header className="space-y-3 text-center md:text-left">
        <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
          {language === 'tr' ? 'Kategori' : 'Category'}
        </p>
        <h1 className="text-2xl font-medium md:text-3xl">{title}</h1>
        <p className="text-sm leading-relaxed text-ink/70">
          {language === 'tr'
            ? 'Seçtiğiniz kategori için küratörlüğü yapılmış parçalar.'
            : 'Curated pieces for the selected category.'}
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
          {language === 'tr'
            ? 'Bu kategoride şimdilik ürün bulunmuyor.'
            : 'There are no products in this category yet.'}
        </p>
      )}
    </section>
  )
}

