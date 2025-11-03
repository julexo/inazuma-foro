'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2, UserPlus, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="w-full max-w-md">
      <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-3 pb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 ring-1 ring-orange-500/30">
                <UserPlus className="h-7 w-7 text-orange-400" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                Crear Cuenta
              </CardTitle>
              <CardDescription className="text-slate-400">
                Únete a la comunidad de Victory Road
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            {error && (
              <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 shadow-lg">
                <div className="p-2 rounded-lg bg-red-500/30">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {message && (
              <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-500/50 text-blue-200 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg">
                <div className="p-2 rounded-lg bg-blue-500/30">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{message}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-slate-200 text-sm font-medium">
                  Nombre
                </Label>
                <Input 
                  id="first-name" 
                  placeholder="Juan" 
                  required 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  disabled={loading}
                  className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-slate-200 text-sm font-medium">
                  Apellidos
                </Label>
                <Input 
                  id="last-name" 
                  placeholder="Pérez" 
                  required 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  disabled={loading}
                  className="bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-200 text-sm font-medium">
                Nombre de Usuario
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
                <Input 
                  id="username" 
                  placeholder="tu_username" 
                  required 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  disabled={loading}
                  className="pl-10 bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200 text-sm font-medium">
                Correo Electrónico
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={loading}
                  className="pl-10 bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200 text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-400 transition-colors" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  disabled={loading}
                  className="pl-10 pr-10 bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2 pb-6">
            <Button 
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-semibold shadow-lg shadow-orange-900/30 hover:shadow-xl hover:shadow-orange-900/40 transition-all duration-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  <span>Crear Cuenta</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

