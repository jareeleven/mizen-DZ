import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  href = '/',
  className,
  suffix,
}: {
  href?: string
  className?: string
  suffix?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
    >
      <span className="relative flex size-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-[1.03]">
        <Image
          src="/icons/icon-512.png"
          alt="MIIZAN"
          width={40}
          height={40}
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.18em] text-foreground">
          MIIZAN
        </span>
        <span lang="ar" className="mt-1 text-[11px] text-muted-foreground">
          ميزان{suffix ? ` · ${suffix}` : ''}
        </span>
      </span>
    </Link>
  )
}
