'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronDown, MapPin } from 'lucide-react'
import { wilayas } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

export function WilayaSelect({ value, className, size = 'default' }: { value: number; className?: string; size?: 'default' | 'lg' }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function onChange(code: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('w', code)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <label
      className={cn(
        'glass group relative flex items-center gap-2.5 rounded-xl pl-3.5 pr-10 transition-colors hover:border-white/20 focus-within:border-primary/60 focus-within:ring-3 focus-within:ring-ring/30',
        size === 'lg' ? 'h-14' : 'h-11',
        className,
      )}
    >
      <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <span className="flex min-w-0 flex-col">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Wilaya</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent text-sm font-semibold text-foreground outline-none"
          aria-label="Sélectionner une wilaya"
        >
          {wilayas.map((w) => (
            <option key={w.code} value={w.code} className="bg-popover text-foreground">
              {String(w.code).padStart(2, '0')} · {w.name}
            </option>
          ))}
        </select>
      </span>
      <ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-muted-foreground transition-transform group-focus-within:rotate-180" aria-hidden="true" />
    </label>
  )
}
