'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async () => {
    setError(null)
    setMessage(null)
    setLoading(true)
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      setError(error.message)
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      setMessage("Este correo ya está registrado. Por favor, inicia sesión.")
    } else if (data.user) {
      setMessage("¡Registro casi listo! Revisa tu correo electrónico para confirmar tu cuenta.")
    }
    setLoading(false)
  }

  const handleSignIn = async () => {
    setError(null)
    setMessage(null)
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("¡Inicio de sesión exitoso! Redirigiendo...")
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 1000)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
          Acceso / Registro
        </CardTitle>
        <CardDescription className="text-slate-400">
          Introduce tu email y contraseña para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3" role="alert">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        {/* Mensaje informativo */}
        {message && (
          <div className="bg-green-900/40 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg flex items-center gap-3" role="alert">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">{message}</span>
          </div>
        )}
        
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-slate-200">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-slate-200">Contraseña</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-slate-900/50 border-slate-700 text-white"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          onClick={handleSignIn} 
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white" 
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Iniciar Sesión
        </Button>
        <Button 
          onClick={handleSignUp} 
          className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600" 
          variant="outline" 
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Registrarse
        </Button>
      </CardFooter>
    </Card>
  )
}