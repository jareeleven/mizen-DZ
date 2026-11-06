'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/miizan/logo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Auth mock — à remplacer plus tard par une vraie API
    setTimeout(() => {
      if (email === 'admin@miizan.dz' && password === 'miizan2026') {
        localStorage.setItem('miizan_admin', 'true')
        router.push('/admin')
      } else {
        setError('Identifiants incorrects')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo href="/" />
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-primary/25">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Espace administrateur
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Connexion</h1>
          <p className="text-sm text-muted-foreground">
            Réservé aux agents autorisés de MIIZAN
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass flex flex-col gap-5 rounded-3xl p-6 md:p-8"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Identifiant
            </span>
            <span className="group flex h-12 items-center gap-2 rounded-xl border border-input bg-white/5 px-3.5 transition focus-within:border-primary/60 focus-within:ring-3 focus-within:ring-ring/30">
              <User
                className="size-4 text-muted-foreground group-focus-within:text-primary"
                aria-hidden="true"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@miizan.dz"
                className="w-full bg-transparent text-sm outline-none"
                autoComplete="username"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Mot de passe
            </span>
            <span className="group flex h-12 items-center gap-2 rounded-xl border border-input bg-white/5 px-3.5 transition focus-within:border-primary/60 focus-within:ring-3 focus-within:ring-ring/30">
              <Lock
                className="size-4 text-muted-foreground group-focus-within:text-primary"
                aria-hidden="true"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
                autoComplete="current-password"
              />
            </span>
          </label>

          {error && (
            <p className="rounded-xl bg-destructive/12 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" size="xl" className="w-full" disabled={loading}>
            {loading ? 'Vérification…' : 'Se connecter'}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Démo : <code className="text-foreground">admin@miizan.dz</code> /{' '}
            <code className="text-foreground">miizan2026</code>
          </p>
        </form>
      </div>
    </div>
  )
}
