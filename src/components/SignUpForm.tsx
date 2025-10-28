'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'

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

   const { data: signUpData, error } = await supabase.auth.signUp({
  email: email,
  password: password,
  options: {
    // 👇 ¡ASEGÚRATE DE QUE ESTO ESTÉ AQUÍ Y LOS NOMBRES COINCIDAN CON EL TRIGGER! 👇
    data: {
      username: username, // <- Debe coincidir con ->> 'username' en el trigger
      firstName: firstName, // <- Debe coincidir con ->> 'firstName' en el trigger
      lastName: lastName    // <- Debe coincidir con ->> 'lastName' en el trigger
    }
  }
  });

    if (error) {
      setError(error.message);
    } else if (signUpData.user ) {
       // Si Supabase requiere confirmación de email
       router.push('/login');
       setMessage("¡Registro casi listo! Revisa tu correo electrónico para confirmar tu cuenta.");
    }  else {
        setError("Ha ocurrido un error inesperado durante el registro.")
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md"> {/* Aumentamos un poco el tamaño */}
      <CardHeader>
        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
        <CardDescription>
          Rellena los campos para registrarte en el foro.
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
        {/* Campos del formulario */}
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input id="first-name" placeholder="Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={loading} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last-name">Apellidos</Label>
                <Input id="last-name" placeholder="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={loading} />
            </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Nombre de Usuario</Label>
          <Input id="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp} className="w-full" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Registrarse
        </Button>
      </CardFooter>
    </Card>
  );
}

