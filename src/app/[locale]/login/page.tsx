'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/atoms/Logo'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { createClient } from '@/lib/supabase/client'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [debugMsg, setDebugMsg] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error') === 'auth' || params.get('error') === 'unauthorized') {
      setStatus('error')
      setDebugMsg(params.get('msg') ?? '')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    })

    if (error) {
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div variants={fadeUpVariants} className="text-center mb-8">
          <Logo size="lg" href="/" />
          <p className="mt-3 text-[var(--text-muted)] text-sm">
            Panel de Administración
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8"
        >
          {status === 'sent' ? (
            <div className="text-center">
              <div className="h-14 w-14 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-[var(--color-success)]" aria-hidden />
              </div>
              <h2 className="font-display text-xl font-bold text-[var(--text)] mb-2">
                ¡Revisa tu correo!
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Enviamos un enlace de acceso a <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-[var(--text)] mb-6">
                Iniciar sesión
              </h1>

              <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
                <Input
                  label="Correo electrónico"
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  autoComplete="email"
                  error={status === 'error' ? `Hubo un error. ${debugMsg ? `(${debugMsg})` : 'Intenta de nuevo.'}` : undefined}
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={status === 'loading' || !email}
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar enlace de acceso'}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </form>

              <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                Recibirás un enlace mágico sin contraseña.
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
