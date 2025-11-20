import { useMemo, useState } from 'react'
import { products } from '../data/products.js'
import { ProductCard } from '../components/ProductCard.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function SearchPage() {
  const { language } = useLocale()
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products
    }

    return products.filter((product) => {
      const text = [
        product.name,
        product.collection,
        product.category,
        ...(product.notes || []),
      ]
        .join(' ')
        .toLowerCase()

      return text.includes(normalizedQuery)
    })
  }, [normalizedQuery])

  const isTr = language === 'tr'

  const title = isTr ? 'Arama' : 'Search'
  const subtitle = isTr ? 'Koleksiyonda ara' : 'Search the collection'
  const placeholder = isTr
    ? 'Ürün, kategori veya koleksiyon ara'
    : 'Search products, categories or collections'
  const emptyText = isTr
    ? 'Aramanızla eşleşen ürün bulunamadı.'
    : 'No products match your search.'

  return (
    <section className="space-y-8">
      <header className="space-y-3 text-center md:text-left">
        <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
          {title}
        </p>
        <h1 className="text-2xl font-medium md:text-3xl">{subtitle}</h1>
      </header>

      <div className="rounded-full bg-ivory px-5 py-3 md:px-6 md:py-3.5">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none md:text-base"
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-ink/70">{emptyText}</p>
      )}
    </section>
  )
}

