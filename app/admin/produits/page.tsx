import Link from 'next/link'
import Image from 'next/image'
import { Package, Plus, Tag } from 'lucide-react'
import { categories, products, formatDA } from '@/lib/miizan-data'
import { Button } from '@/components/ui/button'

export const metadata = { title: 'Produits & catégories | MIIZAN Admin' }

export default function AdminProductsPage() {
  const cats = categories.filter((c) => c.id !== 'all')

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Produits & catégories
          </h1>
          <p className="text-sm text-muted-foreground">
            {products.length} produits · {cats.length} catégories
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="lg" disabled>
            <Tag className="size-4" aria-hidden="true" />
            Nouvelle catégorie
          </Button>
          <Button size="lg" disabled>
            <Plus className="size-4" aria-hidden="true" />
            Nouveau produit
          </Button>
        </div>
      </div>

      <section className="glass rounded-3xl p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Tag className="size-4 text-primary" aria-hidden="true" />
          <h2 className="font-semibold">Catégories</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const count = products.filter((p) => p.category === c.id).length
            return (
              <div
                key={c.id}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
              >
                <span className="font-medium">{c.label}</span>
                <span lang="ar" className="text-xs text-muted-foreground">
                  {c.labelAr}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          L’ajout dynamique de catégories sera activé avec la base de données.
        </p>
      </section>

      <section className="glass overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between p-5 md:p-6">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-primary" aria-hidden="true" />
            <h2 className="font-semibold">Tous les produits</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-y border-white/6 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Produit</th>
                <th className="px-3 py-3 font-medium">Catégorie</th>
                <th className="px-3 py-3 text-right font-medium">Prix producteur</th>
                <th className="px-3 py-3 font-medium">Unité</th>
                <th className="px-6 py-3">
                  <span className="sr-only">Lien</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const cat = categories.find((c) => c.id === p.category)
                return (
                  <tr
                    key={p.slug}
                    className="border-b border-white/4 transition-colors last:border-0 hover:bg-white/4"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={p.image || '/placeholder.svg'}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{p.nameFr}</p>
                          <p lang="ar" className="text-xs text-muted-foreground">
                            {p.nameAr}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {cat?.label ?? p.category}
                    </td>
                    <td className="px-3 py-3 text-right font-semibold tabular-nums">
                      {formatDA(p.producerPrice)} DA
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{p.unit}</td>
                    <td className="px-6 py-3 text-right">
                      <Link
                        href={`/produit/${p.slug}`}
                        className="text-sm text-accent-foreground hover:underline"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
