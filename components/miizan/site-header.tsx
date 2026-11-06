import Link from 'next/link'
import { Suspense } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Logo } from './logo'
import { WilayaSelect } from './wilaya-select'

export function SiteHeader({ wilaya }: { wilaya: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:h-[72px] md:px-8">
        {/* Logo */}
        <Link href={`/?w=${wilaya}`} className="shrink-0">
          <Logo />
        </Link>

        {/* Badge officiel (desktop) */}
        <div className="hidden items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-primary/25 md:flex">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Plateforme officielle
        </div>

        {/* Navigation simple */}
        <nav aria-label="Navigation principale" className="ml-2 hidden items-center gap-1 md:flex">
          <Link
            href={`/?w=${wilaya}`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/6"
          >
            Prix du jour
          </Link>
        </nav>

        {/* Sélecteur de wilaya (desktop) */}
        <div className="ml-auto hidden w-64 md:block">
          <Suspense>
            <WilayaSelect value={wilaya} />
          </Suspense>
        </div>

        {/* Mobile : texte institutionnel */}
        <span lang="ar" className="ml-auto text-xs text-muted-foreground md:hidden">
          الجمهورية الجزائرية
        </span>
      </div>
    </header>
  )
}
