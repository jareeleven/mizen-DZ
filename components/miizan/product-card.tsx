import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatDA, priceFor, type Product } from '@/lib/miizan-data'
import { ChangeBadge } from './change-badge'

export function ProductCard({ product, wilaya }: { product: Product; wilaya: number }) {
  const price = priceFor(product, wilaya)

  return (
    <Link
      href={`/produit/${product.slug}?w=${wilaya}`}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-3 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/10 hover:shadow-[0_20px_50px_-20px_rgba(10,132,255,0.45)] focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 md:p-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/4">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.nameFr}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="size-4 text-white" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground md:text-base">{product.nameFr}</h3>
          <p lang="ar" dir="rtl" className="truncate text-left text-xs text-muted-foreground md:text-sm">
            {product.nameAr}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 border-t border-white/6 pt-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Prix détail recommandé</span>
        <p className="flex items-baseline gap-1.5">
          <span className="text-[28px] font-bold leading-none tracking-tight tabular-nums text-foreground md:text-[34px]">
            {formatDA(price.retail)}
          </span>
          <span className="text-xs font-medium text-muted-foreground">DA/{product.unit}</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[11px] tabular-nums text-muted-foreground">
            {formatDA(price.retailMin)}–{formatDA(price.retailMax)} DA
          </span>
          <ChangeBadge value={price.weeklyChange} suffix="" />
        </div>
      </div>
    </Link>
  )
}
