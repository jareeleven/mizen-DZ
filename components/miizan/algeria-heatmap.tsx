'use client'

import { useState } from 'react'
import { regionalIndex, wilayas, type Wilaya } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

function tone(index: number) {
  if (index <= -4) return 'bg-success/70 border-success/60'
  if (index <= 0) return 'bg-success/30 border-success/30'
  if (index <= 4) return 'bg-primary/35 border-primary/40'
  if (index <= 9) return 'bg-warning/45 border-warning/50'
  return 'bg-destructive/60 border-destructive/60'
}

const legend = [
  { label: '≤ −4 %', cls: 'bg-success/70' },
  { label: '−4 à 0 %', cls: 'bg-success/30' },
  { label: '0 à +4 %', cls: 'bg-primary/35' },
  { label: '+4 à +9 %', cls: 'bg-warning/45' },
  { label: '> +9 %', cls: 'bg-destructive/60' },
]

export function AlgeriaHeatmap() {
  const [hovered, setHovered] = useState<Wilaya>(wilayas.find((w) => w.code === 16)!)
  const idx = regionalIndex(hovered)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Carte des écarts régionaux</h2>
          <p className="text-sm text-muted-foreground">Indice des prix détail vs moyenne nationale · 58 wilayas</p>
        </div>
        <div className="glass-strong min-w-44 rounded-xl px-4 py-3" aria-live="polite">
          <p className="text-xs text-muted-foreground">
            {String(hovered.code).padStart(2, '0')} · <span lang="ar">{hovered.nameAr}</span>
          </p>
          <p className="font-semibold">{hovered.name}</p>
          <p className={cn('text-2xl font-bold tabular-nums', idx > 4 ? 'text-warning' : idx <= 0 ? 'text-success' : 'text-accent-foreground')}>
            {idx > 0 ? '+' : ''}
            {idx} %
          </p>
        </div>
      </div>

      <div
        className="grid gap-1 md:gap-1.5"
        style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))', gridTemplateRows: 'repeat(9, minmax(0, 1fr))' }}
        role="list"
        aria-label="Wilayas"
      >
        {wilayas.map((w) => {
          const i = regionalIndex(w)
          return (
            <button
              key={w.code}
              type="button"
              role="listitem"
              onMouseEnter={() => setHovered(w)}
              onFocus={() => setHovered(w)}
              onClick={() => setHovered(w)}
              aria-label={`${w.name} : ${i > 0 ? '+' : ''}${i} %`}
              style={{ gridColumnStart: w.col + 1, gridRowStart: w.row + 1 }}
              className={cn(
                'flex aspect-square items-center justify-center rounded-md border text-[9px] font-semibold tabular-nums text-white/90 transition-all outline-none hover:scale-110 hover:z-10 focus-visible:ring-2 focus-visible:ring-ring md:rounded-lg md:text-[11px]',
                tone(i),
                hovered.code === w.code && 'z-10 scale-110 ring-2 ring-foreground',
              )}
            >
              {String(w.code).padStart(2, '0')}
            </button>
          )
        })}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {legend.map((l) => (
          <li key={l.label} className="flex items-center gap-1.5">
            <span className={cn('size-3 rounded', l.cls)} aria-hidden="true" />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
