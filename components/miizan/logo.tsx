import Link from 'next/link'
import { Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ href = '/', className, suffix }: { href?: string; className?: string; suffix?: string }) {
  return (
    <Link href={href} className={cn('group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#0060d0] shadow-[0_6px_20px_-6px_rgba(10,132,255,0.8)] ring-1 ring-white/20">
        <Scale className="size-[18px] text-white" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.18em] text-foreground">MIIZAN</span>
        <span lang="ar" className="mt-1 text-[11px] text-muted-foreground">
          ميزان{suffix ? ` · ${suffix}` : ''}
        </span>
      </span>
    </Link>
  )
}
