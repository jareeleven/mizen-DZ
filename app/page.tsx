import { Suspense } from 'react'
import { RefreshCw, ShieldCheck, Scale } from 'lucide-react'
import { SiteHeader } from '@/components/miizan/site-header'
import { WilayaSelect } from '@/components/miizan/wilaya-select'
import { HomeExplorer } from '@/components/miizan/home-explorer'
import { DEFAULT_WILAYA, LAST_UPDATE, getWilaya } from '@/lib/miizan-data'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>
}) {
  const { w } = await searchParams
  const wilaya = getWilaya(Number(w) || DEFAULT_WILAYA)

  return (
    <>
      <SiteHeader wilaya={wilaya.code} />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-20 pt-6 md:gap-10 md:px-8 md:pt-10">
        {/* Bandeau dernière mise à jour */}
        <div
          role="status"
          className="glass flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success" />
          </span>
          <span className="text-muted-foreground">
            Dernière mise à jour :{' '}
            <span className="font-medium text-foreground">{LAST_UPDATE}</span>
          </span>
          <RefreshCw className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
        </div>

        {/* Hero */}
        <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-primary/30">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Plateforme officielle des prix justes
            </span>

            <h1 className="text-balance text-[32px] font-bold leading-[1.1] tracking-tight md:text-5xl">
              Le juste prix, de la ferme à votre panier.
            </h1>

            <p lang="ar" dir="rtl" className="text-right text-lg text-muted-foreground md:text-left">
              السعر العادل، من المزرعة إلى سلتك
            </p>

            <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Prix producteur, transport vers{' '}
              <span className="font-medium text-foreground">{wilaya.name}</span> et
              marges raisonnables : un prix équitable pour l&apos;agriculteur et le citoyen.
            </p>
          </div>

          {/* Sélecteur wilaya (mobile) */}
          <div className="w-full md:hidden">
            <Suspense>
              <WilayaSelect value={wilaya.code} size="lg" />
            </Suspense>
          </div>
        </section>

        {/* Encadré explicatif court */}
        <div className="glass flex flex-col gap-3 rounded-2xl p-5 md:flex-row md:items-center md:gap-6 md:p-6">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Scale className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Comment sont calculés les prix ?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Chaque prix affiché combine le coût producteur, le transport réel vers votre wilaya
              et des marges raisonnables. L’objectif est de protéger à la fois le revenu des
              agriculteurs et le pouvoir d’achat des citoyens.
            </p>
          </div>
        </div>

        {/* Produits */}
        <HomeExplorer wilaya={wilaya.code} />
      </main>
    </>
  )
}
