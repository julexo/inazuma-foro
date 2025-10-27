'use client' // <- Necesario por useAuth

import { Plus, LogIn, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button' // Importamos Button para Logout
import { useAuth } from '@/context/AuthContext' // Importa el hook useAuth

export default function Header() {
  // Usa el hook para obtener el estado de autenticación
  const { user, signOut, loading } = useAuth();

  // Muestra un estado de carga si es necesario
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-900/90 via-indigo-800/85 to-indigo-950/90 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8 border-b border-b-indigo-950/50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[56px]">
          {/* Placeholder o spinner mientras carga */}
          <div className="animate-pulse h-8 w-48 bg-slate-700 rounded"></div>
          <div className="flex gap-3">
             <div className="animate-pulse h-10 w-24 bg-slate-700 rounded-lg"></div>
             <div className="animate-pulse h-10 w-24 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    // Estilos del header oscuro y semi-transparente (del código que pasaste)
    <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-900/90 via-indigo-800/85 to-indigo-950/90 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8 border-b border-b-indigo-950/50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo y Título (del código que pasaste, con colores corregidos) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
             <Image
                src="/icon0.svg" // Asegúrate que este archivo exista en /public
                alt="Logo Victory Road Foro"
                width={40}
                height={40}
                // Corregido: Clases de tamaño estándar de Tailwind (h-10 w-10 = 40px)
                className="h-20 w-20"
             />
             {/* Corregido: Colores de texto para fondo oscuro */}
             <span className="text-xl sm:text-2xl font-bold text-slate-100 hover:text-sky-300 transition-colors hidden sm:block">
                Victory Road Foro
             </span>
          </Link>
        </div>

        {/* Grupo de Botones (con lógica de Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? ( // <--- Lógica de Auth
            // --- Botones si el usuario SÍ está logueado ---
            <>
              {/* Saludo (opcional) */}
              <span className="text-sm text-slate-300 hidden sm:inline">
                 Hola, {user.email?.split('@')[0]} {/* Muestra parte del email */}
              </span>

              <Link
                href="/threads/new"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                <Plus size={18} />
                 <span className="hidden sm:inline">Crear Hilo</span>
              </Link>

              {/* Botón Salir */}
              <Button
                onClick={signOut}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 px-3 sm:px-4 py-2 text-sm sm:text-base"
                size="sm"
              >
                <LogOut size={18} className="sm:mr-2" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </>
          ) : (
            // --- Botones si el usuario NO está logueado ---
            <>
              {/* Botón Iniciar Sesión (del código que pasaste) */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-sm transition-colors text-sm sm:text-base"
              >
                <LogIn size={18} />
                Iniciar Sesión
              </Link>
                 <Link
                href="/signup" // <-- Ruta Correcta
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
                >
                <User size={18} />
                Registrarse
                </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}


