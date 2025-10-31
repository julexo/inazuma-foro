'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2, UserPlus, User, Mail, Lock } from 'lucide-react'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp();
  };

  const handleSignUp = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);

    // Validación básica de campos
    if (!firstName || !lastName || !username || !email || !password) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    // Validar si el email ya existe en Supabase Auth
try {
  const res = await fetch('/api/check-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const { exists } = await res.json();

  if (exists) {
    setError('Este correo ya está registrado o pendiente de confirmación.');
    setLoading(false);
    return; // detenemos el flujo
  }
} catch (err) {
  console.error('Error verificando email:', err);
}


    const { data: signUpData, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username, // <- Debe coincidir con ->> 'username' en el trigger
          firstName: firstName, // <- Debe coincidir con ->> 'firstName' en el trigger
          lastName: lastName    // <- Debe coincidir con ->> 'lastName' en el trigger
        }
      }
    });

    setLoading(false);

    if (error) {
      if (error) {
        console.error("Error de Supabase signUp:", error); // <-- Añade esto
        setError(error.message);
      }
    } else if (signUpData.user) {
      // Si Supabase requiere confirmación de email
      router.push('/login?verify=true');
      setMessage("¡Registro casi listo! Revisa tu correo electrónico para confirmar tu cuenta.");
    } else {
      setError("Ha ocurrido un error inesperado durante el registro.")
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <UserPlus className="h-6 w-6 text-orange-400" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Crear Cuenta
            </CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Rellena los campos para registrarte en el foro.
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

          {message && (
            <div className="bg-blue-900/40 border border-blue-500/50 text-blue-200 px-4 py-3 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{message}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name" className="text-slate-200">Nombre</Label>
              <Input 
                id="first-name" 
                placeholder="Tu nombre" 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                disabled={loading}
                className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name" className="text-slate-200">Apellidos</Label>
              <Input 
                id="last-name" 
                placeholder="Tus apellidos" 
                required 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                disabled={loading}
                className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username" className="text-slate-200">Nombre de Usuario</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                id="username" 
                placeholder="Username" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                disabled={loading}
                className="pl-9 bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
              />
            </div>
          </div>

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
              className="bg-slate-900/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
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
                <span>Creando cuenta...</span>
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Crear Cuenta</span>
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

