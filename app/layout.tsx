import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import { SiteFooter } from '@/components/miizan/site-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: 'MIIZAN — Prix justes des produits agricoles en Algérie',
  description:
    'Plateforme officielle des prix équitables des produits agricoles et agroalimentaires par wilaya : prix producteur, gros et détail recommandé.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MIIZAN',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B1120',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${notoArabic.variable} dark`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <div className="flex-1">{children}</div>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
