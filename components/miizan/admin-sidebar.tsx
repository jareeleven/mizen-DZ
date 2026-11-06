'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  ClipboardCheck,
  Globe,
  LayoutDashboard,
  Package,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

const items = [
  {
    href: '/admin',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/validation/PX-2041',
    label: 'Validation des prix',
    icon: ClipboardCheck,
    match: '/admin/validation',
  },
  {
    href: '/admin/produits',
    label: 'Produits & catégories',
    icon: Package,
  },
  {
    href: '/admin/saisons',
    label: 'Saisons & événements',
    icon: Calendar,
  },
  {
    href: '/admin',
    label: 'Paramètres',
    icon: Settings,
    disabled: true,
  },
  {
    href: '/',
    label: 'Voir le site public',
    icon: Globe,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="glass sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-8 rounded-none border-y-0 border-l-0 p-5 lg:flex">
      <Logo href="/admin" suffix="Admin" />

      <nav aria-label="Administration" className="flex flex-col gap-1">
        {items.map((item) => {
          const active = item.match
            ? pathname.startsWith(item.match)
            : pathname === item.href && !item.disabled

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              aria-disabled={item.disabled}
              className={cn(
                'flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/15 text-foreground ring-1 ring-primary/40'
                  : 'text-muted-foreground hover:bg-white/6 hover:text-foreground',
                item.disabled && 'pointer-events-none opacity-40',
              )}
            >
              <item.icon
                className={cn('size-4', active && 'text-primary')}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-xl bg-white/4 p-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-accent-foreground">
          KB
        </span>
        <div className="min-w-0 text-sm">
          <p className="truncate font-medium">Karim Benali</p>
          <p className="truncate text-xs text-muted-foreground">
            Contrôleur national
          </p>
        </div>
      </div>
    </aside>
  )
}
