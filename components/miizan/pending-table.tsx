import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { formatDA, getProduct, getWilaya, pendingPrices, priceFor, type PendingStatus } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

export const statusStyles: Record<PendingStatus, { label: string; cls: string }> = {
  'en-attente': { label: 'En attente', cls: 'bg-primary/15 text-accent-foreground ring-primary/30' },
  ecart: { label: 'Écart détecté', cls: 'bg-warning/15 text-warning ring-warning/30' },
  urgent: { label: 'Urgent', cls: 'bg-destructive/15 text-destructive ring-destructive/30' },
}

export function PendingTable() {
  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between p-5 md:p-6">
        <div>
          <h2 className="font-semibold">Prix en attente de validation</h2>
          <p className="text-sm text-muted-foreground">{pendingPrices.length} propositions soumises aujourd&apos;hui</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-y border-white/6 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="px-6 py-3 font-medium">Produit</th>
              <th scope="col" className="px-3 py-3 font-medium">Wilaya</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Proposé</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Calculé</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Écart</th>
              <th scope="col" className="px-3 py-3 font-medium">Statut</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {pendingPrices.map((p) => {
              const product = getProduct(p.productSlug)!
              const wilaya = getWilaya(p.wilayaCode)
              const calc = priceFor(product, wilaya.code).retail
              const gap = ((p.submittedPrice - calc) / calc) * 100
              const s = statusStyles[p.status]
              return (
                <tr key={p.id} className="group border-b border-white/4 transition-colors last:border-0 hover:bg-white/4">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Image src={product.image || '/placeholder.svg'} alt="" width={40} height={40} className="size-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{product.nameFr}</p>
                        <p className="text-xs text-muted-foreground">{p.id} · {p.submittedBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{wilaya.name}</td>
                  <td className="px-3 py-3 text-right font-semibold tabular-nums">{formatDA(p.submittedPrice)} DA</td>
                  <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">{formatDA(calc)} DA</td>
                  <td className={cn('px-3 py-3 text-right font-semibold tabular-nums', Math.abs(gap) > 5 ? 'text-warning' : 'text-success')}>
                    {gap > 0 ? '+' : ''}
                    {gap.toFixed(1)} %
                  </td>
                  <td className="px-3 py-3">
                    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1', s.cls)}>{s.label}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/admin/validation/${p.id}`}
                      className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-primary/15"
                    >
                      Examiner
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
