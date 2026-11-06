import { Calendar, CheckCircle2 } from 'lucide-react'
import { seasons, type SeasonType } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

export const metadata = { title: 'Saisons | MIIZAN Admin' }

const typeLabel: Record<SeasonType, string> = {
  normale: 'Normale',
  haute: 'Haute saison',
  basse: 'Basse saison',
  evenement: 'Événement',
}

const typeTone: Record<SeasonType, string> = {
  normale: 'bg-white/10 text-muted-foreground',
  haute: 'bg-warning/15 text-warning',
  basse: 'bg-success/15 text-success',
  evenement: 'bg-primary/15 text-accent-foreground',
}

export default function AdminSeasonsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-8 md:py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Saisons & événements
        </h1>
        <p className="text-sm text-muted-foreground">
          Les coefficients ajustent le prix producteur avant calcul du prix juste.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {seasons.map((s) => (
          <div
            key={s.id}
            className={cn(
              'glass relative rounded-3xl p-5 md:p-6',
              s.active && 'ring-1 ring-primary/50',
            )}
          >
            {s.active && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Active
              </span>
            )}

            <div className="mb-3 flex items-center gap-2">
              <Calendar className="size-4 text-primary" aria-hidden="true" />
              <h2 className="font-semibold">{s.name}</h2>
            </div>

            <span
              className={cn(
                'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                typeTone[s.type],
              )}
            >
              {typeLabel[s.type]}
            </span>

            <p className="mt-4 text-3xl font-bold tabular-nums">
              × {s.coefficient.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              {s.coefficient === 1
                ? 'Aucun ajustement'
                : s.coefficient > 1
                  ? `+${Math.round((s.coefficient - 1) * 100)} % sur le prix producteur`
                  : `${Math.round((s.coefficient - 1) * 100)} % sur le prix producteur`}
            </p>

            {s.note && (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {s.note}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Pour activer une autre saison, change le flag <code>active</code> dans{' '}
        <code>lib/miizan-data.ts</code> (une seule saison active à la fois).
      </p>
    </main>
  )
}
