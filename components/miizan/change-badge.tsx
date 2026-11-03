import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

/** For consumers, a price drop is good news (green), a rise is a warning (amber). */
export function ChangeBadge({ value, className, suffix = 'vs S-1' }: { value: number; className?: string; suffix?: string }) {
  const rounded = Math.round(value * 10) / 10
  const flat = Math.abs(rounded) < 0.1
  const down = rounded < 0
  const Icon = flat ? Minus : down ? ArrowDownRight : ArrowUpRight

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums',
        flat && 'bg-white/8 text-muted-foreground',
        !flat && down && 'bg-success/15 text-success',
        !flat && !down && 'bg-warning/15 text-warning',
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {flat ? '0 %' : `${rounded > 0 ? '+' : ''}${rounded.toLocaleString('fr-FR')} %`}
      {suffix && <span className="font-medium opacity-70">{suffix}</span>}
    </span>
  )
}
