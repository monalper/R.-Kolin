import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LANGUAGE_CONFIG = {
  us: { key: 'us', intlLocale: 'en-US', currency: 'USD' },
  uk: { key: 'uk', intlLocale: 'en-GB', currency: 'GBP' },
  de: { key: 'de', intlLocale: 'de-DE', currency: 'EUR' },
  tr: { key: 'tr', intlLocale: 'tr-TR', currency: 'TRY' },
  fr: { key: 'fr', intlLocale: 'fr-FR', currency: 'EUR' },
  es: { key: 'es', intlLocale: 'es-ES', currency: 'EUR' },
}

const TRANSLATIONS = {
  tr: {
    'nav.collection': 'Koleksiyon',
    'nav.maison': 'Maison',
    'nav.cart': 'Sepet',

    'home.atelierLabel': 'Albert R. Kolin Atelier',
    'home.hero.titleMain': 'Zamansız formlar,',
    'home.hero.titleAccent': 'kişisel ritminize göre tasarlandı.',
    'home.hero.body':
      'Louis Vuitton estetiğinden ilham alan, ultra minimal ve dokunsal bir dijital butik. Her parça, görünmez detaylarla rafine edildi.',
    'home.hero.tags.bags': 'Çanta',
    'home.hero.tags.shoes': 'Ayakkabı',
    'home.hero.tags.accessories': 'Aksesuar',
    'home.hero.panel.new': 'Yeni Koleksiyon',
    'home.hero.panel.body':
      'Atelier Noir serisi, mimari hatları yumuşak formlarla buluşturur. Şehir ışıkları için tasarlandı.',
    'home.hero.panel.baseline': 'Çizgi · Denge · Sessizlik',
    'home.collection.label': 'Yeni Koleksiyon',
    'home.collection.title': 'Atelier Noir · İlk Drop',
    'home.maisonNote.label': 'Maison Notu',
    'home.maisonNote.body':
      'Albert R. Kolin, her parçayı görünmez detaylar, yavaş ritimler ve zamansız silüetler etrafında kurgulayan bir maison’dur. Koleksiyonlar, sezonsuz ve şehir hayatına uyarlanabilir olacak şekilde tasarlanır.',

    'cart.label': 'Sepet',
    'cart.title.nonEmpty': 'Seçili parçalarınız',
    'cart.title.empty': 'Sepetiniz şu an sakin',
    'cart.subtitle':
      'Siparişi tamamlamadan önce adetleri güncelleyebilir veya dilediğiniz ürünü sessizce çıkarabilirsiniz.',
    'cart.remove': 'Ürünü kaldır',
    'cart.empty.description':
      'Sepetinizde henüz ürün yok. Koleksiyonu keşfederek ritminize uygun parçaları seçebilirsiniz.',
    'cart.empty.cta': 'Koleksiyona dön',
    'cart.cta.checkout': 'Ödemeye ilerle',

    'checkout.label': 'Ödeme',
    'checkout.title': 'Son adım: onay ve teslimat',
    'checkout.subtitle':
      'Tüm bilgileriniz SSL ile korunur; ödeme, güncel güvenlik standartları ile işlenir.',
    'checkout.sections.info': 'Bilgiler',
    'checkout.sections.shipping': 'Teslimat',
    'checkout.sections.payment': 'Ödeme',
    'checkout.fields.fullName': 'Ad Soyad',
    'checkout.fields.email': 'E-posta',
    'checkout.fields.phone': 'Telefon',
    'checkout.fields.address': 'Adres',
    'checkout.fields.city': 'Şehir',
    'checkout.fields.postalCode': 'Posta Kodu',
    'checkout.fields.country': 'Ülke',
    'checkout.fields.cardName': 'Kart üzerindeki isim',
    'checkout.fields.cardNumber': 'Kart numarası',
    'checkout.fields.expiry': 'Son kullanma',
    'checkout.fields.cvv': 'Güvenlik kodu',
    'checkout.submit': 'Ödemeyi tamamla ve onayla',
    'checkout.submitting': 'Siparişiniz hazırlanıyor...',
    'form.required': 'Zorunlu',

    'product.back': 'Koleksiyona dön',
    'product.details.label': 'Detaylar',
    'product.shippingNote':
      'Tüm gönderimler karbon nötr kargo ile, 2–4 iş günü içerisinde adresinize ulaştırılır.',
    'product.addToCart': 'Sepete ekle',

    'summary.label': 'Özet',
    'summary.taxes': 'Vergiler dahil',
    'summary.subtotal': 'Ara toplam',
    'summary.shipping': 'Kargo',
    'summary.shippingIncluded': 'Dahil',
    'summary.total': 'Genel Toplam',

    'quantity.decrease': 'Azalt',
    'quantity.increase': 'Artır',

    'notFound.title': 'Sayfa bulunamadı',
    'notFound.body':
      'Aradığınız sayfa taşınmış, yeniden adlandırılmış veya kaldırılmış olabilir.',
    'notFound.back': 'Koleksiyona dön',
  },
  us: {
    'nav.collection': 'Collection',
    'nav.maison': 'Maison',
    'nav.cart': 'Cart',

    'home.atelierLabel': 'Albert R. Kolin Atelier',
    'home.hero.titleMain': 'Timeless forms,',
    'home.hero.titleAccent': 'sculpted around your own rhythm.',
    'home.hero.body':
      'A digital boutique inspired by Louis Vuitton: ultra-minimal, tactile and quietly luxurious.',
    'home.hero.tags.bags': 'Bags',
    'home.hero.tags.shoes': 'Shoes',
    'home.hero.tags.accessories': 'Accessories',
    'home.hero.panel.new': 'New Collection',
    'home.hero.panel.body':
      'The Atelier Noir line merges architectural lines with softened silhouettes, designed for the city lights.',
    'home.hero.panel.baseline': 'Line · Balance · Silence',
    'home.collection.label': 'New Collection',
    'home.collection.title': 'Atelier Noir · First Drop',
    'home.maisonNote.label': 'Maison Note',
    'home.maisonNote.body':
      'Albert R. Kolin is a maison that shapes every piece around invisible details, slow rhythms and timeless silhouettes. Collections are seasonless and tailored to the pace of the city.',

    'cart.label': 'Cart',
    'cart.title.nonEmpty': 'Your selected pieces',
    'cart.title.empty': 'Your cart is currently quiet',
    'cart.subtitle':
      'Adjust quantities or gently remove pieces before completing your order.',
    'cart.remove': 'Remove item',
    'cart.empty.description':
      'There are no items in your cart yet. Explore the collection to find pieces that match your rhythm.',
    'cart.empty.cta': 'Return to collection',
    'cart.cta.checkout': 'Proceed to checkout',

    'checkout.label': 'Checkout',
    'checkout.title': 'Final step: confirmation & delivery',
    'checkout.subtitle':
      'Your details are protected with SSL and payments are processed using current security standards.',
    'checkout.sections.info': 'Details',
    'checkout.sections.shipping': 'Shipping',
    'checkout.sections.payment': 'Payment',
    'checkout.fields.fullName': 'Full name',
    'checkout.fields.email': 'Email',
    'checkout.fields.phone': 'Phone',
    'checkout.fields.address': 'Address',
    'checkout.fields.city': 'City',
    'checkout.fields.postalCode': 'Postal code',
    'checkout.fields.country': 'Country',
    'checkout.fields.cardName': 'Name on card',
    'checkout.fields.cardNumber': 'Card number',
    'checkout.fields.expiry': 'Expiry',
    'checkout.fields.cvv': 'Security code',
    'checkout.submit': 'Complete payment and confirm',
    'checkout.submitting': 'Preparing your order...',
    'form.required': 'Required',

    'product.back': 'Back to collection',
    'product.details.label': 'Details',
    'product.shippingNote':
      'All orders ship carbon-neutral and arrive within 2–4 business days.',
    'product.addToCart': 'Add to cart',

    'summary.label': 'Summary',
    'summary.taxes': 'Taxes included',
    'summary.subtotal': 'Subtotal',
    'summary.shipping': 'Shipping',
    'summary.shippingIncluded': 'Included',
    'summary.total': 'Total',

    'quantity.decrease': 'Decrease',
    'quantity.increase': 'Increase',

    'notFound.title': 'Page not found',
    'notFound.body':
      'The page you are looking for may have been moved, renamed or removed.',
    'notFound.back': 'Back to collection',
  },
  de: {
    'nav.collection': 'Kollektion',
    'nav.maison': 'Maison',
    'nav.cart': 'Warenkorb',

    'cart.label': 'Warenkorb',
    'summary.label': 'Übersicht',
    'summary.taxes': 'Inklusive Steuern',
    'summary.subtotal': 'Zwischensumme',
    'summary.shipping': 'Versand',
    'summary.shippingIncluded': 'Inklusive',
    'summary.total': 'Gesamt',
    'cart.cta.checkout': 'Zur Kasse',
    'product.back': 'Zurück zur Kollektion',
    'product.details.label': 'Details',
    'product.addToCart': 'In den Warenkorb',
    'quantity.decrease': 'Verringern',
    'quantity.increase': 'Erhöhen',
  },
  fr: {
    'nav.collection': 'Collection',
    'nav.maison': 'Maison',
    'nav.cart': 'Panier',

    'cart.label': 'Panier',
    'summary.label': 'Récapitulatif',
    'summary.taxes': 'Taxes incluses',
    'summary.subtotal': 'Sous-total',
    'summary.shipping': 'Livraison',
    'summary.shippingIncluded': 'Inclus',
    'summary.total': 'Total',
    'cart.cta.checkout': 'Passer au paiement',
    'product.back': 'Retour à la collection',
    'product.details.label': 'Détails',
    'product.addToCart': 'Ajouter au panier',
    'quantity.decrease': 'Diminuer',
    'quantity.increase': 'Augmenter',
  },
  es: {
    'nav.collection': 'Colección',
    'nav.maison': 'Maison',
    'nav.cart': 'Carrito',

    'cart.label': 'Carrito',
    'summary.label': 'Resumen',
    'summary.taxes': 'Impuestos incluidos',
    'summary.subtotal': 'Subtotal',
    'summary.shipping': 'Envío',
    'summary.shippingIncluded': 'Incluido',
    'summary.total': 'Total',
    'cart.cta.checkout': 'Continuar al pago',
    'product.back': 'Volver a la colección',
    'product.details.label': 'Detalles',
    'product.addToCart': 'Añadir al carrito',
    'quantity.decrease': 'Disminuir',
    'quantity.increase': 'Aumentar',
  },
}

const LocaleContext = createContext(null)

export function LocaleProvider({ children, languageKey = 'tr' }) {
  const normalizedKey = LANGUAGE_CONFIG[languageKey] ? languageKey : 'tr'
  const [language, setLanguage] = useState(normalizedKey)

  useEffect(() => {
    setLanguage(normalizedKey)
  }, [normalizedKey])

  const config = LANGUAGE_CONFIG[language] ?? LANGUAGE_CONFIG.tr

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(config.intlLocale, {
        style: 'currency',
        currency: config.currency,
        maximumFractionDigits: 0,
      }),
    [config.intlLocale, config.currency],
  )

  const formatCurrency = (value) => formatter.format(value)

  const t = (key) => {
    const table = TRANSLATIONS[language] || {}
    if (table[key]) return table[key]
    if (language !== 'us' && TRANSLATIONS.us?.[key]) return TRANSLATIONS.us[key]
    if (language !== 'tr' && TRANSLATIONS.tr?.[key]) return TRANSLATIONS.tr[key]
    return key
  }

  const value = {
    language,
    config,
    formatCurrency,
    t,
  }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

