import { Check, Search, X } from 'lucide-react'
import { SiteHeader } from '@/components/miizan/site-header'
import { ChangeBadge } from '@/components/miizan/change-badge'
import { ProductCard } from '@/components/miizan/product-card'
import { Button } from '@/components/ui/button'
import { DEFAULT_WILAYA, products } from '@/lib/miizan-data'

export const metadata = { title: 'Design System | MIIZAN' }

const colors = [
  { name: 'Background', token: '--background', hex: '#0B1120', cls: 'bg-background ring-1 ring-white/10' },
  { name: 'Primary', token: '--primary', hex: '#0A84FF', cls: 'bg-primary' },
  { name: 'Success', token: '--success', hex: '#00C853', cls: 'bg-success' },
  { name: 'Warning', token: '--warning', hex: '#FFB020', cls: 'bg-warning' },
  { name: 'Foreground', token: '--foreground', hex: '#F0F4F8', cls: 'bg-foreground' },
  { name: 'Glass', token: '--glass', hex: 'rgba(255,255,255,.07)', cls: 'glass' },
]

const type = [
  { name: 'Display', spec: '72 / 1.0 · Bold · −2%', cls: 'text-7xl font-bold tracking-tighter', sample: '88 DA' },
  { name: 'H1', spec: '48 / 1.1 · Bold', cls: 'text-5xl font-bold tracking-tight', sample: 'Le juste prix' },
  { name: 'H2', spec: '20 / 1.4 · Semibold', cls: 'text-xl font-semibold', sample: 'Prix du jour' },
  { name: 'Body', spec: '16 / 1.6 · Regular', cls: 'text-base', sample: 'Prix producteur, transport et marges.' },
  { name: 'Caption', spec: '11 · Medium · +14% caps', cls: 'text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground', sample: 'Prix détail recommandé' },
  { name: 'Arabic', spec: 'Noto Sans Arabic · 18', cls: 'text-lg', sample: 'السعر العادل', ar: true },
]

const spacing = [4, 8, 12, 16, 24, 32, 48, 64]

export default function DesignSystemPage() {
  return (
    <>
      <SiteHeader wilaya={DEFAULT_WILAYA} />
      <main className="mx-auto flex max-w-7xl flex-col gap-14 px-4 pb-24 pt-10 md:px-8">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-accent-foreground">MIIZAN · v1.0</span>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Design System</h1>
          <p className="max-w-2xl text-muted-foreground">
            Mode sombre, glassmorphism (blur 20px, fond blanc 7 %, bordure 9 %), grille 8 pt, rayons 12/16/24 px. Mobile 375 · Desktop 1440.
          </p>
        </header>

        <Section title="Couleurs">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {colors.map((c) => (
              <div key={c.name} className="glass rounded-2xl p-3">
                <div className={`h-20 rounded-xl ${c.cls}`} />
                <p className="mt-3 text-sm font-semibold">{c.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.hex}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.token}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typographie" subtitle="Inter (latin) · Noto Sans Arabic (arabe)">
          <div className="glass divide-y divide-white/6 rounded-3xl">
            {type.map((t) => (
              <div key={t.name} className="flex flex-col gap-2 p-5 md:flex-row md:items-center md:gap-8">
                <div className="w-48 shrink-0">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{t.spec}</p>
                </div>
                <p lang={t.ar ? 'ar' : undefined} dir={t.ar ? 'rtl' : undefined} className={`${t.cls} truncate`}>
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Boutons" subtitle="États : défaut · survol (glow) · focus (anneau 3px) · désactivé">
          <div className="glass flex flex-col gap-6 rounded-3xl p-6">
            <Row label="Primary">
              <Button size="lg">Rechercher</Button>
              <Button size="lg" className="bg-[#2b95ff] shadow-[0_10px_32px_-6px_rgba(10,132,255,0.8)]">Survol</Button>
              <Button size="lg" className="ring-3 ring-ring/50">Focus</Button>
              <Button size="lg" disabled>Désactivé</Button>
            </Row>
            <Row label="Success / Destructive">
              <Button variant="success" size="lg"><Check aria-hidden="true" />Valider</Button>
              <Button variant="destructive" size="lg"><X aria-hidden="true" />Rejeter</Button>
            </Row>
            <Row label="Glass / Ghost">
              <Button variant="glass" size="lg">Secondaire</Button>
              <Button variant="glass" size="lg" aria-pressed="true">Actif</Button>
              <Button variant="ghost" size="lg">Ghost</Button>
            </Row>
          </div>
        </Section>

        <Section title="Champs, chips & badges">
          <div className="glass grid gap-6 rounded-3xl p-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="glass flex h-14 items-center gap-3 rounded-2xl px-4">
                <Search className="size-5 text-muted-foreground" aria-hidden="true" />
                <span className="text-muted-foreground">Recherche — défaut</span>
              </div>
              <div className="glass flex h-14 items-center gap-3 rounded-2xl border-primary/60 bg-white/10 px-4 ring-3 ring-ring/25">
                <Search className="size-5 text-primary" aria-hidden="true" />
                <span>Recherche — focus</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="flex h-11 items-center rounded-full border border-primary/60 bg-primary/18 px-4 text-sm font-medium shadow-[0_0_24px_-6px_rgba(10,132,255,0.7)]">Chip actif</span>
                <span className="flex h-11 items-center rounded-full border border-white/8 bg-white/5 px-4 text-sm font-medium text-muted-foreground">Chip inactif</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <ChangeBadge value={-4.2} />
                <ChangeBadge value={3.1} />
                <ChangeBadge value={0} />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Carte produit" subtitle="Survol : élévation −4px, zoom image 105 %, glow bleu">
          <div className="grid max-w-xl grid-cols-2 gap-4">
            <ProductCard product={products[0]} wilaya={DEFAULT_WILAYA} />
            <ProductCard product={products[2]} wilaya={DEFAULT_WILAYA} />
          </div>
        </Section>

        <Section title="Espacements" subtitle="Grille 8 pt">
          <div className="glass flex flex-wrap items-end gap-6 rounded-3xl p-6">
            {spacing.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="rounded bg-primary/70" style={{ width: s, height: s }} />
                <span className="font-mono text-[11px] text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <span className="w-44 shrink-0 text-sm text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  )
}
