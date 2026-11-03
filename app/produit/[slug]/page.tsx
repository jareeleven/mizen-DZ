import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Factory, Info, Store, Truck, Warehouse } from 'lucide-react'
import { SiteHeader } from '@/components/miizan/site-header'
import { ChangeBadge } from '@/components/miizan/change-badge'
import { PriceChart } from '@/components/miizan/price-chart'
import { ReportGap } from '@/components/miizan/report-gap'
import {
  DEFAULT_WILAYA,
  LAST_UPDATE,
  RETAIL_MARGIN,
  WHOLESALE_MARGIN,
  formatDA,
  getProduct,
  getWilaya,
  priceFor,
  products,
} from '@/lib/miizan-data'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  return { title: product ? `${product.nameFr} — Prix juste | MIIZAN` : 'Produit | MIIZAN' }
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ w?: string }>
}) {
  const [{ slug }, { w }] = await Promise.all([params, searchParams])
  const product = getProduct(slug)
  if (!product) notFound()

  const wilaya = getWilaya(Number(w) || DEFAULT_WILAYA)
  const price = priceFor(product, wilaya.code)
  const ratio = wilaya.transport / 4
  const chartData = product.history.map((v, i) => ({ week: `S${i + 1}`, price: Math.round(v * (0.97 + ratio * 0.03)) }))

  return (
    <>
      <SiteHeader wilaya={wilaya.code} />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:pt-10">
        <Link href={`/?w=${wilaya.code}`} className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Tous les produits
        </Link>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <section className="flex flex-col gap-5">
            <div className="glass relative aspect-square overflow-hidden rounded-3xl">
              <Image src={product.image || '/placeholder.svg'} alt={product.nameFr} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.nameFr}</h1>
                  <p lang="ar" dir="rtl" className="mt-1 text-left text-xl text-muted-foreground">
                    {product.nameAr}
                  </p>
                </div>
                <span className="glass rounded-full px-3 py-1 text-xs font-medium">
                  {String(wilaya.code).padStart(2, '0')} · {wilaya.name}
                </span>
              </div>
            </div>
            <div className="hidden lg:block">
              <ReportGap productName={product.nameFr} recommended={price.retail} unit={product.unit} />
            </div>
          </section>

          <section className="flex flex-col gap-5" aria-label="Détail des prix">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/30 blur-3xl" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground">
                    <Store className="size-4" aria-hidden="true" />
                    Prix détail recommandé
                  </span>
                  <ChangeBadge value={price.weeklyChange} />
                </div>
                <p className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold leading-none tracking-tighter tabular-nums md:text-7xl">{formatDA(price.retail)}</span>
                  <span className="text-lg font-medium text-muted-foreground">DA/{product.unit}</span>
                </p>
                <div className="flex flex-col gap-2">
                  <div className="relative h-2 rounded-full bg-white/8">
                    <div className="absolute inset-y-0 left-[15%] right-[15%] rounded-full bg-gradient-to-r from-success/70 via-primary to-warning/70" />
                    <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-primary shadow-[0_0_12px_rgba(10,132,255,0.9)]" />
                  </div>
                  <div className="flex justify-between text-xs tabular-nums text-muted-foreground">
                    <span>Min {formatDA(price.retailMin)} DA</span>
                    <span>Fourchette acceptable ±5 %</span>
                    <span>Max {formatDA(price.retailMax)} DA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <PriceBlock icon={Factory} label="Prix producteur" value={price.producer} unit={product.unit} note="Sortie ferme" />
              <PriceBlock icon={Warehouse} label="Prix gros" value={price.wholesale} unit={product.unit} note={`Transport ${price.transport} DA + marge ${WHOLESALE_MARGIN * 100} %`} />
              <PriceBlock icon={Store} label="Prix détail" value={price.retail} unit={product.unit} note={`Marge détaillant ${RETAIL_MARGIN * 100} %`} highlight />
            </div>

            <div className="glass rounded-3xl p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Évolution sur 8 semaines</h2>
                <span className="text-xs text-muted-foreground">Prix détail · {wilaya.name}</span>
              </div>
              <PriceChart data={chartData} unit={product.unit} />
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/3 p-4 text-sm text-muted-foreground">
              <Truck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                Le prix tient compte du coût de transport vers {wilaya.name} ({price.transport} DA/{product.unit}). Mis à jour le {LAST_UPDATE}.
              </p>
              <Info className="ml-auto size-4 shrink-0" aria-hidden="true" />
            </div>

            <div className="lg:hidden">
              <ReportGap productName={product.nameFr} recommended={price.retail} unit={product.unit} />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

function PriceBlock({
  icon: Icon,
  label,
  value,
  unit,
  note,
  highlight,
}: {
  icon: typeof Factory
  label: string
  value: number
  unit: string
  note: string
  highlight?: boolean
}) {
  return (
    <div className={highlight ? 'glass rounded-2xl border-primary/40 bg-primary/10 p-4' : 'glass rounded-2xl p-4'}>
      <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className={highlight ? 'size-4 text-primary' : 'size-4'} aria-hidden="true" />
        {label}
      </span>
      <p className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums">{formatDA(value)}</span>
        <span className="text-xs text-muted-foreground">DA/{unit}</span>
      </p>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{note}</p>
    </div>
  )
}
