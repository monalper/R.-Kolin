import { products as baseProducts } from './products.js'

const extraProducts = [
  {
    id: 'ark-anatolian-bag-01',
    slug: 'anatolian-blue-tote',
    name: 'Anatolian Blue Tote',
    category: 'Çanta',
    collection: 'Anatolian Blue',
    description:
      'Deep Anatolian blue tote with soft lines, designed for long city evenings.',
    price: 21900,
    gender: 'women',
    categorySlug: 'bags',
    images: [
      {
        src: 'https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-bandouliere-50--M14837_PM2_Front%20view.png?wid=1090&hei=1090',
        alt: 'Anatolian Blue tone tote bag with graphic pattern.',
      },
    ],
    notes: [
      'Water-repellent finish',
      'Hidden interior zip compartment',
      'Limited Anatolian Blue capsule piece',
    ],
  },
  {
    id: 'ark-anatolian-shoe-01',
    slug: 'anatolian-blue-loafer',
    name: 'Anatolian Blue Loafer',
    category: 'Ayakkabı',
    collection: 'Anatolian Blue',
    description:
      'Monochrome blue loafer with a subtle heel detail, refined enough for day and night.',
    price: 16400,
    gender: 'women',
    categorySlug: 'shoes',
    images: [
      {
        src: 'https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-trainer-maxi-sneaker--BRQU1PDN20_PM2_Front%20view.png?wid=1090&hei=1090',
        alt: 'Anatolian Blue leather loafer on a neutral background.',
      },
    ],
    notes: ['Cushioned insole', 'Hidden monogram detail', 'Leather lining'],
  },
  {
    id: 'ark-anatolian-scarf-01',
    slug: 'anatolian-blue-scarf',
    name: 'Anatolian Silk Scarf',
    category: 'Aksesuar',
    collection: 'Anatolian Blue',
    description:
      'Silk scarf inspired by Anatolian blue geometries, cut in a generous, fluid silhouette.',
    price: 720,
    gender: 'unisex',
    categorySlug: 'accessories',
    images: [
      {
        src: 'https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-frosty-gradient-scarf--M97669_PM2_Front%20view.png?wid=1090&hei=1090',
        alt: 'Anatolian Blue leather loafer on a neutral background.',
      },
      {
        src: 'https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-frosty-gradient-scarf--M97669_PM1_Worn%20view.png?wid=1090&hei=1090',
        alt: 'Anatolian Blue leather loafer on a neutral background.',
      },
      {
        src: 'https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-frosty-gradient-scarf--M97669_PM1_Detail%20view.png?wid=1090&hei=1090',
        alt: 'Anatolian Blue leather loafer on a neutral background.',
      },
      {
        src: 'https://en.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-frosty-gradient-scarf--M97669_PM1_Cropped%20worn%20view.png?wid=1090&hei=1090',
        alt: 'Anatolian Blue leather loafer on a neutral background.',
      },
    ],
    notes: ['100% silk', 'Rolled edges', 'Anatolian Blue capsule exclusive'],
  },
]

export const products = [...baseProducts, ...extraProducts]

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug)
}

