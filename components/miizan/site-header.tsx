import Link from 'next/link'
import { Suspense } from 'react'
import { Logo } from './logo'
import { WilayaSelect } from './wilaya-select'

const nav = [
  { href: '/', label: 'Prix' },
  { href: '/design-system', label: 'Design System' },
  { href: '/admin', label: 'Espace admin' },
]

export function SiteHeader({ wilaya }: { wilaya: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:h-[72px] md:px-8">
        <Logo />
        <nav aria-label="Navigation principale" className="ml-6 hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/6 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-64 md:block">
          <Suspense>
            <WilayaSelect value={wilaya} />
          </Suspense>
        </div>
        <span lang="ar" className="ml-auto text-xs text-muted-foreground md:hidden">
          الجمهورية الجزائرية
        </span>
      </div>
    </header>
  )
}
