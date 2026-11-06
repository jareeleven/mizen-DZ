import Link from 'next/link'
import { AdminSidebar } from '@/components/miizan/admin-sidebar'
import { AdminGuard } from '@/components/miizan/admin-guard'
import { Logo } from '@/components/miizan/logo'

export const metadata = { title: 'Administration | MIIZAN' }

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-dvh">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-white/6 px-4 lg:hidden">
            <Logo href="/admin" suffix="Admin" />
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Site public
            </Link>
          </header>
          {children}
        </div>
      </div>
    </AdminGuard>
  )
}
