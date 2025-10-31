'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useSearchParams } from 'next/navigation' // Importamos useRouter y useSearchParams
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2, LogIn, Mail } from 'lucide-react' // Añadir Mail aquí

export default function LoginForm() {
  const searchParams = useSearchParams()
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Inicializamos useRouter

  // Efecto para detectar el parámetro verify
  useEffect(() => {
    if (searchParams.get('verify') === 'true') {
      setVerifyMessage('¡Registro exitoso! Por favor, verifica tu correo electrónico para activar tu cuenta.')
    }
  }, [searchParams])

  const handleSignIn = async () => {
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false); // Detenemos la carga si hay error
    } else {
      // El onAuthStateChange en AuthContext/layout.tsx se encargará de redirigir
      // Opcionalmente, puedes forzar un refresh o push aquí si es necesario
      router.push('/'); // Ya no es estrictamente necesario aquí
      router.refresh(); // Forzamos refresh para asegurar que el layout detecte el cambio
    }
    // setLoading(false); // No necesitamos esto aquí si hay redirección/refresh
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <Card className="w-full max-w-sm bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <LogIn className="h-6 w-6 text-orange-400" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Iniciar Sesión
            </CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Introduce tu email y contraseña para acceder.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {error && (
            <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2" role="alert">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertCircle className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {verifyMessage && (
            <div className="bg-blue-900/40 border border-blue-500/50 text-blue-200 px-4 py-3 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{verifyMessage}</span>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-200">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
              />
            </div>
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
              className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
            />
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
