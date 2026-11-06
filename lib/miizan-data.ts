export type CategoryId = 'legumes' | 'fruits' | 'viandes' | 'volailles' | 'epicerie'

export const categories: { id: CategoryId | 'all'; label: string; labelAr: string }[] = [
  { id: 'all', label: 'Tout', labelAr: 'الكل' },
  { id: 'legumes', label: 'Légumes', labelAr: 'خضر' },
  { id: 'fruits', label: 'Fruits', labelAr: 'فواكه' },
  { id: 'viandes', label: 'Viandes', labelAr: 'لحوم' },
  { id: 'volailles', label: 'Volailles', labelAr: 'دواجن' },
  { id: 'epicerie', label: 'Épicerie', labelAr: 'بقالة' },
]

export type Product = {
  slug: string
  nameFr: string
  nameAr: string
  category: CategoryId
  unit: 'kg' | 'L'
  image: string
  producerPrice: number
  /** Retail national average, oldest → newest, 8 weeks */
  history: number[]
}

export const products: Product[] = [
  { slug: 'tomate', nameFr: 'Tomate', nameAr: 'طماطم', category: 'legumes', unit: 'kg', image: '/products/tomate.png', producerPrice: 62, history: [118, 112, 105, 100, 96, 98, 92, 88] },
  { slug: 'pomme-de-terre', nameFr: 'Pomme de terre', nameAr: 'بطاطا', category: 'legumes', unit: 'kg', image: '/products/pomme-de-terre.png', producerPrice: 48, history: [70, 72, 74, 75, 73, 76, 78, 80] },
  { slug: 'oignon', nameFr: 'Oignon', nameAr: 'بصل', category: 'legumes', unit: 'kg', image: '/products/oignon.png', producerPrice: 38, history: [66, 64, 60, 62, 59, 58, 56, 55] },
  { slug: 'orange', nameFr: 'Orange Thomson', nameAr: 'برتقال طومسون', category: 'fruits', unit: 'kg', image: '/products/orange.png', producerPrice: 105, history: [170, 168, 165, 162, 160, 158, 155, 152] },
  { slug: 'dattes', nameFr: 'Dattes Deglet Nour', nameAr: 'تمر دقلة نور', category: 'fruits', unit: 'kg', image: '/products/dattes.png', producerPrice: 420, history: [610, 615, 620, 625, 618, 622, 630, 635] },
  { slug: 'agneau', nameFr: "Viande d'agneau", nameAr: 'لحم الخروف', category: 'viandes', unit: 'kg', image: '/products/agneau.png', producerPrice: 1650, history: [2350, 2380, 2400, 2420, 2410, 2440, 2450, 2470] },
  { slug: 'poulet', nameFr: 'Poulet entier', nameAr: 'دجاج كامل', category: 'volailles', unit: 'kg', image: '/products/poulet.png', producerPrice: 290, history: [420, 410, 395, 390, 400, 398, 392, 385] },
  { slug: 'huile-olive', nameFr: "Huile d'olive", nameAr: 'زيت الزيتون', category: 'epicerie', unit: 'L', image: '/products/huile-olive.png', producerPrice: 820, history: [1180, 1190, 1200, 1210, 1205, 1215, 1220, 1230] },
]

export type Wilaya = {
  code: number
  name: string
  nameAr: string
  /** Transport cost added per kg, in DA */
  transport: number
  /** Cartogram tile position */
  col: number
  row: number
}

export const wilayas: Wilaya[] = [
  { code: 1, name: 'Adrar', nameAr: 'أدرار', transport: 22, col: 2, row: 5 },
  { code: 2, name: 'Chlef', nameAr: 'الشلف', transport: 5, col: 4, row: 0 },
  { code: 3, name: 'Laghouat', nameAr: 'الأغواط', transport: 11, col: 5, row: 3 },
  { code: 4, name: 'Oum El Bouaghi', nameAr: 'أم البواقي', transport: 7, col: 11, row: 2 },
  { code: 5, name: 'Batna', nameAr: 'باتنة', transport: 8, col: 9, row: 2 },
  { code: 6, name: 'Béjaïa', nameAr: 'بجاية', transport: 6, col: 9, row: 0 },
  { code: 7, name: 'Biskra', nameAr: 'بسكرة', transport: 9, col: 9, row: 3 },
  { code: 8, name: 'Béchar', nameAr: 'بشار', transport: 18, col: 0, row: 3 },
  { code: 9, name: 'Blida', nameAr: 'البليدة', transport: 4, col: 5, row: 1 },
  { code: 10, name: 'Bouira', nameAr: 'البويرة', transport: 5, col: 7, row: 1 },
  { code: 11, name: 'Tamanrasset', nameAr: 'تمنراست', transport: 30, col: 7, row: 7 },
  { code: 12, name: 'Tébessa', nameAr: 'تبسة', transport: 9, col: 13, row: 2 },
  { code: 13, name: 'Tlemcen', nameAr: 'تلمسان', transport: 7, col: 0, row: 1 },
  { code: 14, name: 'Tiaret', nameAr: 'تيارت', transport: 7, col: 3, row: 2 },
  { code: 15, name: 'Tizi Ouzou', nameAr: 'تيزي وزو', transport: 5, col: 8, row: 0 },
  { code: 16, name: 'Alger', nameAr: 'الجزائر', transport: 4, col: 6, row: 0 },
  { code: 17, name: 'Djelfa', nameAr: 'الجلفة', transport: 9, col: 6, row: 2 },
  { code: 18, name: 'Jijel', nameAr: 'جيجل', transport: 6, col: 10, row: 0 },
  { code: 19, name: 'Sétif', nameAr: 'سطيف', transport: 6, col: 9, row: 1 },
  { code: 20, name: 'Saïda', nameAr: 'سعيدة', transport: 8, col: 1, row: 2 },
  { code: 21, name: 'Skikda', nameAr: 'سكيكدة', transport: 6, col: 11, row: 0 },
  { code: 22, name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس', transport: 6, col: 1, row: 1 },
  { code: 23, name: 'Annaba', nameAr: 'عنابة', transport: 6, col: 12, row: 0 },
  { code: 24, name: 'Guelma', nameAr: 'قالمة', transport: 7, col: 12, row: 1 },
  { code: 25, name: 'Constantine', nameAr: 'قسنطينة', transport: 6, col: 11, row: 1 },
  { code: 26, name: 'Médéa', nameAr: 'المدية', transport: 6, col: 6, row: 1 },
  { code: 27, name: 'Mostaganem', nameAr: 'مستغانم', transport: 5, col: 3, row: 0 },
  { code: 28, name: "M'Sila", nameAr: 'المسيلة', transport: 7, col: 7, row: 2 },
  { code: 29, name: 'Mascara', nameAr: 'معسكر', transport: 6, col: 2, row: 1 },
  { code: 30, name: 'Ouargla', nameAr: 'ورقلة', transport: 15, col: 10, row: 4 },
  { code: 31, name: 'Oran', nameAr: 'وهران', transport: 5, col: 2, row: 0 },
  { code: 32, name: 'El Bayadh', nameAr: 'البيض', transport: 11, col: 2, row: 2 },
  { code: 33, name: 'Illizi', nameAr: 'إليزي', transport: 28, col: 12, row: 6 },
  { code: 34, name: 'Bordj Bou Arréridj', nameAr: 'برج بوعريريج', transport: 6, col: 8, row: 1 },
  { code: 35, name: 'Boumerdès', nameAr: 'بومرداس', transport: 4, col: 7, row: 0 },
  { code: 36, name: 'El Tarf', nameAr: 'الطارف', transport: 7, col: 13, row: 0 },
  { code: 37, name: 'Tindouf', nameAr: 'تندوف', transport: 32, col: 0, row: 6 },
  { code: 38, name: 'Tissemsilt', nameAr: 'تيسمسيلت', transport: 7, col: 4, row: 2 },
  { code: 39, name: 'El Oued', nameAr: 'الوادي', transport: 12, col: 12, row: 3 },
  { code: 40, name: 'Khenchela', nameAr: 'خنشلة', transport: 8, col: 12, row: 2 },
  { code: 41, name: 'Souk Ahras', nameAr: 'سوق أهراس', transport: 7, col: 13, row: 1 },
  { code: 42, name: 'Tipaza', nameAr: 'تيبازة', transport: 4, col: 5, row: 0 },
  { code: 43, name: 'Mila', nameAr: 'ميلة', transport: 6, col: 10, row: 1 },
  { code: 44, name: 'Aïn Defla', nameAr: 'عين الدفلى', transport: 5, col: 4, row: 1 },
  { code: 45, name: 'Naâma', nameAr: 'النعامة', transport: 12, col: 0, row: 2 },
  { code: 46, name: 'Aïn Témouchent', nameAr: 'عين تموشنت', transport: 6, col: 1, row: 0 },
  { code: 47, name: 'Ghardaïa', nameAr: 'غرداية', transport: 13, col: 6, row: 4 },
  { code: 48, name: 'Relizane', nameAr: 'غليزان', transport: 5, col: 3, row: 1 },
  { code: 49, name: 'Timimoun', nameAr: 'تيميمون', transport: 21, col: 4, row: 5 },
  { code: 50, name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار', transport: 34, col: 3, row: 7 },
  { code: 51, name: 'Ouled Djellal', nameAr: 'أولاد جلال', transport: 10, col: 8, row: 3 },
  { code: 52, name: 'Béni Abbès', nameAr: 'بني عباس', transport: 20, col: 1, row: 4 },
  { code: 53, name: 'In Salah', nameAr: 'عين صالح', transport: 26, col: 6, row: 6 },
  { code: 54, name: 'In Guezzam', nameAr: 'عين قزام', transport: 36, col: 7, row: 8 },
  { code: 55, name: 'Touggourt', nameAr: 'تقرت', transport: 13, col: 11, row: 4 },
  { code: 56, name: 'Djanet', nameAr: 'جانت', transport: 33, col: 13, row: 7 },
  { code: 57, name: "El M'Ghair", nameAr: 'المغير', transport: 11, col: 10, row: 3 },
  { code: 58, name: 'El Meniaa', nameAr: 'المنيعة', transport: 17, col: 7, row: 5 },
]

export const DEFAULT_WILAYA = 16
export const WHOLESALE_MARGIN = 0.08
export const RETAIL_MARGIN = 0.15
export const RANGE_TOLERANCE = 0.05
export const LAST_UPDATE = '11 mars 2026 · 08:30'

export function getWilaya(code: number) {
  return wilayas.find((w) => w.code === code) ?? wilayas.find((w) => w.code === DEFAULT_WILAYA)!
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

/** Heavier/perishable goods carry proportionally more transport cost */
function transportFor(product: Product, wilaya: Wilaya) {
  const weight = product.category === 'viandes' ? 3 : product.category === 'epicerie' ? 1.5 : 1
  return Math.round(wilaya.transport * weight)
}

export type PriceBreakdown = {
  producer: number
  transport: number
  wholesale: number
  retail: number
  retailMin: number
  retailMax: number
  weeklyChange: number
}

export function computePrice(
  producer: number,
  transport: number,
  wholesaleMargin = WHOLESALE_MARGIN,
  retailMargin = RETAIL_MARGIN,
) {
  const wholesale = Math.round((producer + transport) * (1 + wholesaleMargin))
  const retail = Math.round(wholesale * (1 + retailMargin))
  return {
    wholesale,
    retail,
    retailMin: Math.round(retail * (1 - RANGE_TOLERANCE)),
    retailMax: Math.round(retail * (1 + RANGE_TOLERANCE)),
  }
}

export function priceFor(product: Product, wilayaCode: number): PriceBreakdown {
  const wilaya = getWilaya(wilayaCode)
  const transport = transportFor(product, wilaya)
  const producer = seasonalProducerPrice(product.producerPrice)
  const computed = computePrice(producer, transport)
  const h = product.history
  const weeklyChange = ((h[h.length - 1] - h[h.length - 2]) / h[h.length - 2]) * 100
  return {
    producer,
    transport,
    ...computed,
    weeklyChange,
  }
}

export function formatDA(value: number) {
  return new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(value)
}

/** Regional retail index vs national average, in % */
function rawRegionalIndex(wilaya: Wilaya) {
  const seasonal = ((wilaya.code * 37) % 9) - 4
  return wilaya.transport * 4 + seasonal
}

const regionalMean = wilayas.reduce((s, w) => s + rawRegionalIndex(w), 0) / wilayas.length

export function regionalIndex(wilaya: Wilaya) {
  return Math.round(rawRegionalIndex(wilaya) - regionalMean)
}

export type PendingStatus = 'en-attente' | 'ecart' | 'urgent'

export type PendingPrice = {
  id: string
  productSlug: string
  wilayaCode: number
  submittedBy: string
  submittedPrice: number
  submittedAt: string
  status: PendingStatus
}

export const pendingPrices: PendingPrice[] = [
  { id: 'PX-2041', productSlug: 'tomate', wilayaCode: 31, submittedBy: 'DCP Oran', submittedPrice: 104, submittedAt: 'il y a 12 min', status: 'ecart' },
  { id: 'PX-2040', productSlug: 'pomme-de-terre', wilayaCode: 16, submittedBy: 'Marché Rouiba', submittedPrice: 72, submittedAt: 'il y a 34 min', status: 'en-attente' },
  { id: 'PX-2039', productSlug: 'agneau', wilayaCode: 17, submittedBy: 'DSA Djelfa', submittedPrice: 2690, submittedAt: 'il y a 1 h', status: 'urgent' },
  { id: 'PX-2038', productSlug: 'dattes', wilayaCode: 7, submittedBy: 'Coop. Tolga', submittedPrice: 598, submittedAt: 'il y a 2 h', status: 'en-attente' },
  { id: 'PX-2037', productSlug: 'poulet', wilayaCode: 19, submittedBy: 'DCP Sétif', submittedPrice: 430, submittedAt: 'il y a 3 h', status: 'ecart' },
  { id: 'PX-2036', productSlug: 'orange', wilayaCode: 9, submittedBy: 'Marché Boufarik', submittedPrice: 148, submittedAt: 'il y a 5 h', status: 'en-attente' },
]

export function getPending(id: string) {
  return pendingPrices.find((p) => p.id === id)
}

// === Saisons & événements ===

export type SeasonType = 'normale' | 'haute' | 'basse' | 'evenement'

export type Season = {
  id: string
  name: string
  type: SeasonType
  /** Multiplicateur appliqué au prix producteur (ex: 1.15 = +15 %) */
  coefficient: number
  active: boolean
  note?: string
}

export const seasons: Season[] = [
  {
    id: 's-normale',
    name: 'Saison normale',
    type: 'normale',
    coefficient: 1,
    active: true,
    note: 'Aucun ajustement',
  },
  {
    id: 's-haute',
    name: 'Haute saison',
    type: 'haute',
    coefficient: 1.12,
    active: false,
    note: 'Demande forte / rareté relative',
  },
  {
    id: 's-basse',
    name: 'Basse saison',
    type: 'basse',
    coefficient: 0.92,
    active: false,
    note: 'Offre abondante',
  },
  {
    id: 's-ramadan',
    name: 'Ramadan',
    type: 'evenement',
    coefficient: 1.08,
    active: false,
    note: 'Événement religieux — pression sur certains produits',
  },
]

export function getActiveSeason() {
  return seasons.find((s) => s.active) ?? seasons[0]
}

/** Prix producteur ajusté par la saison active */
export function seasonalProducerPrice(base: number) {
  const season = getActiveSeason()
  return Math.round(base * season.coefficient)
}
