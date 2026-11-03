'use client'

import { useMemo, useState } from 'react'
import { Apple, Beef, Drumstick, LayoutGrid, Search, ShoppingBasket, Carrot, X } from 'lucide-react'
import { categories, products, type CategoryId } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

const icons: Record<CategoryId | 'all', typeof Apple> = {
  all: LayoutGrid,
  legumes: Carrot,
  fruits: Apple,
  viandes: Beef,
  volailles: Drumstick,
  epicerie: ShoppingBasket,
}

export function HomeExplorer({ wilaya }: { wilaya: number }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q || p.nameFr.toLowerCase().includes(q) || p.nameAr.includes(q)),
    )
  }, [query, category])

  return (
    <section aria-labelledby="products-title" className="flex flex-col gap-6">
      <div className="glass group flex h-14 items-center gap-3 rounded-2xl px-4 transition-all focus-within:border-primary/60 focus-within:bg-white/10 focus-within:ring-3 focus-within:ring-ring/25 md:h-16 md:px-5">
        <Search className="size-5 text-muted-foreground transition-colors group-focus-within:text-primary" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un produit… (tomate, بطاطا)"
          aria-label="Rechercher un produit"
          className="h-full flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/80 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-foreground"
            aria-label="Effacer la recherche"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div role="tablist" aria-label="Catégories" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {categories.map((c) => {
          const Icon = icons[c.id]
          const active = category === c.id
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c.id)}
              className={cn(
                'flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                active
                  ? 'border-primary/60 bg-primary/18 text-foreground shadow-[0_0_24px_-6px_rgba(10,132,255,0.7)]'
                  : 'border-white/8 bg-white/5 text-muted-foreground hover:border-white/16 hover:bg-white/9 hover:text-foreground',
              )}
            >
              <Icon className={cn('size-4', active && 'text-primary')} aria-hidden="true" />
              {c.label}
              <span lang="ar" className="text-xs opacity-60">
                {c.labelAr}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-end justify-between">
        <h2 id="products-title" className="text-lg font-semibold md:text-xl">
          Prix du jour
        </h2>
        <span className="text-sm text-muted-foreground tabular-nums">{filtered.length} produits</span>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} wilaya={wilaya} />
          ))}
        </div>
      ) : (
        <div className="glass flex flex-col items-center gap-2 rounded-2xl px-6 py-14 text-center">
          <Search className="size-6 text-muted-foreground" aria-hidden="true" />
          <p className="font-medium">Aucun produit trouvé</p>
          <p className="text-sm text-muted-foreground">Essayez un autre terme ou une autre catégorie.</p>
        </div>
      )}
    </section>
  )
}
