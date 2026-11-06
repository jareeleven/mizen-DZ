'use client'

import { useState } from 'react'
import {
  Check,
  Factory,
  Percent,
  RotateCcw,
  Store,
  Truck,
  Warehouse,
  X,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  RANGE_TOLERANCE,
  RETAIL_MARGIN,
  WHOLESALE_MARGIN,
  computePrice,
  formatDA,
} from '@/lib/miizan-data'
import { cn } from '@/lib/utils'

type Props = {
  unit: string
  submittedPrice: number
  submittedBy: string
  initial: { producer: number; transport: number }
}

export function PriceCalculator({
  unit,
  submittedPrice,
  submittedBy,
  initial,
}: Props) {
  const [producer, setProducer] = useState(initial.producer)
  const [transport, setTransport] = useState(initial.transport)
  const [wm, setWm] = useState(WHOLESALE_MARGIN * 100)
  const [rm, setRm] = useState(RETAIL_MARGIN * 100)
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null)

  const calc = computePrice(producer, transport, wm / 100, rm / 100)
  const gap = ((submittedPrice - calc.retail) / calc.retail) * 100
  const withinRange = Math.abs(gap) <= RANGE_TOLERANCE * 100

  const steps = [
    { icon: Factory, label: 'Prix producteur', value: producer },
    { icon: Truck, label: 'Transport', value: transport, op: '+' },
    {
      icon: Warehouse,
      label: `Prix gros (marge ${wm} %)`,
      value: calc.wholesale,
      op: '=',
    },
    {
      icon: Store,
      label: `Prix détail (marge ${rm} %)`,
      value: calc.retail,
      op: '=',
    },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
      {/* Colonne gauche : paramètres */}
      <section className="glass rounded-3xl p-5 md:p-6" aria-labelledby="calc-inputs">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="calc-inputs" className="font-semibold">
            Paramètres de calcul
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setProducer(initial.producer)
              setTransport(initial.transport)
              setWm(WHOLESALE_MARGIN * 100)
              setRm(RETAIL_MARGIN * 100)
              setDecision(null)
            }}
          >
            <RotateCcw aria-hidden="true" />
            Réinitialiser
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            label="Prix producteur"
            suffix={`DA/${unit}`}
            icon={Factory}
            value={producer}
            onChange={setProducer}
          />
          <NumberField
            label="Coût de transport"
            suffix={`DA/${unit}`}
            icon={Truck}
            value={transport}
            onChange={setTransport}
          />
          <NumberField
            label="Marge grossiste"
            suffix="%"
            icon={Percent}
            value={wm}
            onChange={setWm}
            step={0.5}
          />
          <NumberField
            label="Marge détaillant"
            suffix="%"
            icon={Percent}
            value={rm}
            onChange={setRm}
            step={0.5}
          />
        </div>

        {/* Décomposition */}
        <ol className="mt-6 flex flex-col gap-2" aria-label="Décomposition du prix">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3',
                i === steps.length - 1
                  ? 'bg-primary/12 ring-1 ring-primary/40'
                  : 'bg-white/4',
              )}
            >
              <span className="w-4 text-center font-mono text-muted-foreground">
                {s.op ?? ''}
              </span>
              <s.icon
                className={cn(
                  'size-4',
                  i === steps.length - 1 ? 'text-primary' : 'text-muted-foreground',
                )}
                aria-hidden="true"
              />
              <span className="text-sm">{s.label}</span>
              <span className="ml-auto font-semibold tabular-nums">
                {formatDA(s.value)}{' '}
                <span className="text-xs font-normal text-muted-foreground">DA</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Le prix final doit protéger le revenu de l’agriculteur et le pouvoir d’achat du citoyen.
        </p>
      </section>

      {/* Colonne droite : comparaison + décision */}
      <section className="flex flex-col gap-5" aria-label="Comparaison et décision">
        <div className="glass-strong rounded-3xl p-5 md:p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Prix proposé</p>
              <p className="text-xs text-muted-foreground">par {submittedBy}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums">
                {formatDA(submittedPrice)}
              </p>
            </div>
            <div className="border-l border-white/8 pl-4">
              <p className="text-xs text-muted-foreground">Prix calculé</p>
              <p className="text-xs text-muted-foreground">
                fourchette {formatDA(calc.retailMin)}–{formatDA(calc.retailMax)}
              </p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-accent-foreground">
                {formatDA(calc.retail)}
              </p>
            </div>
          </div>

          <div
            className={cn(
              'mt-5 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium',
              withinRange
                ? 'bg-success/12 text-success'
                : 'bg-warning/12 text-warning',
            )}
          >
            <span>
              {withinRange
                ? 'Dans la fourchette acceptable'
                : 'Hors fourchette (±5 %)'}
            </span>
            <span className="tabular-nums">
              {gap > 0 ? '+' : ''}
              {gap.toFixed(1)} %
            </span>
          </div>
        </div>

        {decision ? (
          <div
            role="status"
            className={cn(
              'flex items-center gap-3 rounded-2xl border p-5 animate-in fade-in zoom-in-95',
              decision === 'approved'
                ? 'border-success/40 bg-success/10'
                : 'border-destructive/40 bg-destructive/10',
            )}
          >
            {decision === 'approved' ? (
              <Check className="size-5 text-success" aria-hidden="true" />
            ) : (
              <X className="size-5 text-destructive" aria-hidden="true" />
            )}
            <div className="text-sm">
              <p className="font-semibold">
                {decision === 'approved'
                  ? `Prix publié : ${formatDA(calc.retail)} DA/${unit}`
                  : 'Proposition rejetée'}
              </p>
              <p className="text-muted-foreground">
                {decision === 'approved'
                  ? 'Visible immédiatement sur le site public.'
                  : `${submittedBy} a été notifié.`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => setDecision(null)}
            >
              Annuler
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="destructive"
              size="xl"
              onClick={() => setDecision('rejected')}
            >
              <X aria-hidden="true" />
              Rejeter
            </Button>
            <Button
              variant="success"
              size="xl"
              onClick={() => setDecision('approved')}
            >
              <Check aria-hidden="true" />
              Valider et publier
            </Button>
          </div>
        )}

        <p className="text-xs leading-relaxed text-muted-foreground">
          La validation publie le prix calculé sur le site public.  
          Le prix proposé est archivé pour l’audit et le suivi.
        </p>
      </section>
    </div>
  )
}

function NumberField({
  label,
  suffix,
  icon: Icon,
  value,
  onChange,
  step = 1,
}: {
  label: string
  suffix: string
  icon: typeof Factory
  value: number
  onChange: (v: number) => void
  step?: number
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="group flex h-12 items-center gap-2 rounded-xl border border-input bg-white/5 px-3.5 transition focus-within:border-primary/60 focus-within:bg-white/8 focus-within:ring-3 focus-within:ring-ring/30 hover:border-white/20">
        <Icon
          className="size-4 text-muted-foreground group-focus-within:text-primary"
          aria-hidden="true"
        />
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-full min-w-0 bg-transparent text-base font-semibold tabular-nums outline-none"
        />
        <span className="shrink-0 text-xs text-muted-foreground">{suffix}</span>
      </span>
    </label>
  )
}
