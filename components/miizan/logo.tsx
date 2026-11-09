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
      <img
        src="/icons/icon-512.png"
        alt="MIIZAN"
        width={44}
        height={44}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          objectFit: 'cover',
          display: 'block',
          flexShrink: 0,
          backgroundColor: '#000',
        }}
      />
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
