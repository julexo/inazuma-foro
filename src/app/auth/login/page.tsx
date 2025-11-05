'use client'

import { useState } from 'react'
import { TurnstileWidget } from '@/components/TurnstileWidget'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaToken) {
      alert('Por favor, completa el captcha')
      return
    }

    setIsSubmitting(true)

    try {
      // Verificar captcha en el servidor
      const verifyResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success) {
        alert('Verificación de captcha fallida')
        setIsSubmitting(false)
        return
      }

      // Proceder con el login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(error.message)
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al iniciar sesión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-bold text-white text-center">Iniciar sesión</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div className="flex justify-center">
            <TurnstileWidget
              onSuccess={(token) => {
                console.log('Captcha completado!')
                setCaptchaToken(token)
              }}
              onError={() => setCaptchaToken(null)}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !captchaToken}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>
      </div>
    </div>
  )
}
