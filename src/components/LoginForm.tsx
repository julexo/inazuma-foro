'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, AlertCircle, LogIn } from 'lucide-react'
import { TurnstileWidget } from '@/components/TurnstileWidget'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams?.get('redirectTo') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validar captcha
    if (!captchaToken) {
      setError('Por favor, completa la verificación de seguridad')
      return
    }

    setIsLoading(true)
    try {
      // Verificar captcha primero
      const verifyResponse = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      })
      const verifyData = await verifyResponse.json()
      if (!verifyData.success) {
        setError('Verificación de seguridad fallida. Intenta de nuevo.')
        setCaptchaToken(null)
        setIsLoading(false)
        return
      }

      // Login con Supabase
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message.includes('Invalid')
          ? 'Email o contraseña incorrectos'
          : signInError.message
        )
        setIsLoading(false)
        return
      }

      router.push(redirectTo)
      router.refresh()
    } catch (err: unknown) {
      // Mostrar detalles útiles si es un fallo de red/CSP
      if (err instanceof TypeError) {
        setError('No se pudo contactar con el servicio. Revisa tu conexión o configuración de CSP.')
        console.error('Failed to fetch (posible CSP o red):', err)
      } else {
        setError('Error inesperado. Intenta de nuevo.')
        console.error('Error en login:', err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/90 backdrop-blur-xl border-slate-700/50 shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-white">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center text-slate-400">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-orange-500"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-orange-500"
              />
            </div>
          </div>

          {/* CAPTCHA - AQUÍ ESTÁ EL WIDGET */}
          <div className="flex justify-center py-2">
            <TurnstileWidget
              onSuccess={(token) => {
                console.log('✅ Captcha completado')
                setCaptchaToken(token)
                setError(null)
              }}
              onError={() => {
                console.error('❌ Error en captcha')
                setCaptchaToken(null)
                setError('Error al cargar la verificación de seguridad. Recarga la página.')
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Botón de Submit */}
          <Button
            type="submit"
            disabled={isLoading || !captchaToken}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-semibold shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
