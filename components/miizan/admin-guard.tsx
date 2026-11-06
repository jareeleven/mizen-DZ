'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Ne pas protéger la page de login
    if (pathname === '/admin/login') {
      setReady(true)
      return
    }

    const isAuth = localStorage.getItem('miizan_admin') === 'true'
    if (!isAuth) {
      router.replace('/admin/login')
    } else {
      setReady(true)
    }
  }, [pathname, router])

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm text-muted-foreground">Vérification…</p>
      </div>
    )
  }

  return <>{children}</>
}
