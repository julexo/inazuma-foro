'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react' // Para mostrar errores y carga

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null); // Para mensajes (ej: revisa tu email)
  const router = useRouter()

  const handleSignUp = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // Opciones adicionales (ej: redirigir tras confirmación de email)
      // options: {
      //   emailRedirectTo: `${location.origin}/`,
      // }
    });

    if (error) {
      setError(error.message);
    } else if (data.user && data.user.identities?.length === 0) {
       // Si Supabase requiere confirmación de email (comportamiento por defecto)
       setMessage("¡Registro casi listo! Revisa tu correo electrónico para confirmar tu cuenta.");
    } else if (data.user) {
       // Si la confirmación no está habilitada o ya está confirmado
       setMessage("¡Registro completado! Redirigiendo...");
       router.push('/'); // Redirige a la página principal
       router.refresh(); // Refresca para actualizar el estado del servidor
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      // El onAuthStateChange en layout/AuthContext se encargará de redirigir
      // No necesitamos redirigir aquí manualmente si AuthContext funciona bien.
      // router.push('/');
      // router.refresh();
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Acceso / Registro</CardTitle>
        <CardDescription>
          Introduce tu email y contraseña para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center gap-2" role="alert">
            <AlertCircle className="h-4 w-4" />
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {/* Mensaje informativo */}
        {message && (
           <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
             {message}
           </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={handleSignIn} className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Iniciar Sesión
        </Button>
        <Button onClick={handleSignUp} className="w-full" variant="outline" disabled={loading}>
           {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
           Registrarse
        </Button>
      </CardFooter>
    </Card>
  );
}