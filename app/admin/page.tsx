import { AlertTriangle, CheckCircle2, Clock, TrendingDown } from 'lucide-react'
import { AlgeriaHeatmap } from '@/components/miizan/algeria-heatmap'
import { PendingTable } from '@/components/miizan/pending-table'
import { LAST_UPDATE, pendingPrices } from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

const kpis = [
  { label: 'Prix validés aujourd’hui', value: '1 284', delta: '+12 %', icon: CheckCircle2, tone: 'text-success bg-success/15' },
  { label: 'En attente', value: String(pendingPrices.length), delta: '2 urgents', icon: Clock, tone: 'text-accent-foreground bg-primary/15' },
  { label: 'Écarts signalés', value: '37', delta: '−8 vs hier', icon: AlertTriangle, tone: 'text-warning bg-warning/15' },
  { label: 'Indice national', value: '−1,8 %', delta: 'sur 7 jours', icon: TrendingDown, tone: 'text-success bg-success/15' },
]

export default function AdminDashboard() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground">Synchronisé le {LAST_UPDATE}</p>
        </div>
      </div>

      <section aria-label="Indicateurs clés" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4 md:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground md:text-sm">{k.label}</span>
              <span className={cn('flex size-8 items-center justify-center rounded-lg', k.tone)}>
                <k.icon className="size-4" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold tabular-nums md:text-3xl">{k.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.delta}</p>
          </div>
        ))}
      </section>

      <section className="glass rounded-3xl p-5 md:p-6">
        <AlgeriaHeatmap />
      </section>

      <PendingTable />
    </main>
  )
}
