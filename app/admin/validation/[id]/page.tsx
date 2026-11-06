import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react'
import { PriceCalculator } from '@/components/miizan/price-calculator'
import { statusStyles } from '@/components/miizan/pending-table'
import {
  getPending,
  getProduct,
  getWilaya,
  pendingPrices,
  priceFor,
} from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return pendingPrices.map((p) => ({ id: p.id }))
}

export default async function ValidationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pending = getPending(id)
  if (!pending) notFound()

  const product = getProduct(pending.productSlug)!
  const wilaya = getWilaya(pending.wilayaCode)
  const base = priceFor(product, wilaya.code)
  const s = statusStyles[pending.status]

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      {/* Retour */}
      <Link
        href="/admin"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Tableau de bord
      </Link>

      {/* En-tête */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.nameFr}
            width={64}
            height={64}
            className="size-16 rounded-2xl object-cover ring-1 ring-white/10"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {product.nameFr}
              </h1>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-medium ring-1',
                  s.cls,
                )}
              >
                {s.label}
              </span>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>
                {pending.id} · {String(wilaya.code).padStart(2, '0')} {wilaya.name}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {pending.submittedAt}
              </span>
              <span>par {pending.submittedBy}</span>
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-primary/25">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Validation officielle
        </div>
      </div>

      {/* Calculateur */}
      <PriceCalculator
        unit={product.unit}
        submittedPrice={pending.submittedPrice}
        submittedBy={pending.submittedBy}
        initial={{ producer: base.producer, transport: base.transport }}
      />
    </main>
  )
}
