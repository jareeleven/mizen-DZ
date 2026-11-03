'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ReportGap({ productName, recommended, unit }: { productName: string; recommended: number; unit: string }) {
  const [open, setOpen] = useState(false)
  const [observed, setObserved] = useState('')
  const [sent, setSent] = useState(false)

  const value = Number(observed)
  const gap = value > 0 ? ((value - recommended) / recommended) * 100 : null

  if (sent) {
    return (
      <div role="status" className="flex items-center gap-3 rounded-2xl border border-success/40 bg-success/10 p-4 text-sm">
        <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
        <p>
          Merci ! Votre signalement pour <span className="font-semibold">{productName}</span> a été transmis aux services de contrôle.
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <Button variant="glass" size="xl" className="w-full border-warning/40 text-warning hover:border-warning/70 hover:bg-warning/10" onClick={() => setOpen(true)}>
        <AlertTriangle aria-hidden="true" />
        Signaler un écart
      </Button>
    )
  }

  return (
    <form
      className="glass-strong flex flex-col gap-4 rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (value > 0) setSent(true)
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <AlertTriangle className="size-4 text-warning" aria-hidden="true" />
          Signaler un écart de prix
        </h3>
        <button type="button" onClick={() => setOpen(false)} className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white/10" aria-label="Fermer">
          <X className="size-4" />
        </button>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Prix constaté (DA/{unit})</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          required
          value={observed}
          onChange={(e) => setObserved(e.target.value)}
          className="h-12 rounded-xl border border-input bg-white/5 px-4 text-lg font-semibold tabular-nums outline-none transition focus:border-primary/60 focus:ring-3 focus:ring-ring/30"
          placeholder={String(recommended)}
        />
      </label>
      {gap !== null && (
        <p className={gap > 5 ? 'text-sm text-warning' : 'text-sm text-success'}>
          Écart de {gap > 0 ? '+' : ''}
          {gap.toFixed(1)} % par rapport au prix recommandé.
        </p>
      )}
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Lieu (marché, commerce)</span>
        <input className="h-11 rounded-xl border border-input bg-white/5 px-4 outline-none transition focus:border-primary/60 focus:ring-3 focus:ring-ring/30" placeholder="Ex. Marché Clauzel" />
      </label>
      <Button type="submit" size="xl" disabled={!(value > 0)}>
        Envoyer le signalement
      </Button>
    </form>
  )
}
