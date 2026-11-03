import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import { PriceCalculator } from '@/components/miizan/price-calculator'
import { statusStyles } from '@/components/miizan/pending-table'
import { getPending, getProduct, getWilaya, pendingPrices, priceFor } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return pendingPrices.map((p) => ({ id: p.id }))
}

export default async function ValidationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pending = getPending(id)
  if (!pending) notFound()
  const product = getProduct(pending.productSlug)!
  const wilaya = getWilaya(pending.wilayaCode)
  const base = priceFor(product, wilaya.code)
  const s = statusStyles[pending.status]

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <Link href="/admin" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Tableau de bord
      </Link>

      <div className="flex flex-wrap items-center gap-4">
        <Image src={product.image || '/placeholder.svg'} alt={product.nameFr} width={64} height={64} className="size-16 rounded-2xl object-cover ring-1 ring-white/10" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{product.nameFr}</h1>
            <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium ring-1', s.cls)}>{s.label}</span>
          </div>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {pending.id} · {String(wilaya.code).padStart(2, '0')} {wilaya.name}
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {pending.submittedAt}
            </span>
          </p>
        </div>
      </div>

      <PriceCalculator
        unit={product.unit}
        submittedPrice={pending.submittedPrice}
        submittedBy={pending.submittedBy}
        initial={{ producer: base.producer, transport: base.transport }}
      />
    </main>
  )
}
