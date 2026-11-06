
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/6 bg-background/40">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Identité */}
          <div className="flex max-w-sm flex-col gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              <span className="font-semibold tracking-tight">MIIZAN</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Plateforme officielle des prix justes des produits agricoles et agroalimentaires.
              Les prix affichés tiennent compte du coût producteur, du transport par wilaya et de marges raisonnables.
            </p>
            <p lang="ar" dir="rtl" className="text-sm text-muted-foreground">
              المنصة الرسمية للأسعار العادلة للمنتجات الفلاحية والغذائية
            </p>
          </div>

          {/* Liens utiles */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-medium text-foreground">Informations</span>
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Prix du jour
            </Link>
            <span className="text-muted-foreground">
              Mise à jour hebdomadaire
            </span>
            <span className="text-muted-foreground">
              Données validées par les services compétents
            </span>
          </div>

          {/* Légitimité */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-medium text-foreground">Engagement</span>
            <p className="max-w-[220px] leading-relaxed text-muted-foreground">
              Protection du pouvoir d’achat des citoyens et des revenus des agriculteurs.
            </p>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/6 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} MIIZAN — République Algérienne Démocratique et Populaire</span>
          <span>Les prix sont indicatifs et mis à jour régulièrement</span>
        </div>
      </div>
    </footer>
  )
}
