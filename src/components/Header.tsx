'use client' // <- Necesario por useAuth

import { Plus, LogIn, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button' // Importamos Button para Logout
import { useAuth } from '@/context/AuthContext' // Importa el hook useAuth

interface HeaderProps {
  pageTitle?: string; // Hacemos pageTitle opcional (string o undefined)
}


export default function Header({ pageTitle }: HeaderProps) {
  // Usa el hook para obtener el estado de autenticación
  const { user, signOut, loading } = useAuth();

  // Muestra un estado de carga si es necesario
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-950 via-blue-900 to-slate-900/95 backdrop-blur-sm border-b border-indigo-800/30 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4">
          <div className="animate-pulse h-8 w-48 bg-slate-800 rounded-lg"></div>
          <div className="flex gap-3">
             <div className="animate-pulse h-10 w-24 bg-slate-800 rounded-lg"></div>
             <div className="animate-pulse h-10 w-24 bg-slate-800 rounded-lg"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-950 via-blue-900 to-slate-900/95 backdrop-blur-sm border-b border-indigo-800/30 shadow-xl">
      <div className="relative overflow-hidden">
        {/* Efectos de brillo */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-orange-500/5" />
        
        {/* Líneas decorativas */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_15%,transparent_30%)] animate-[shimmer_2s_infinite]" />
        
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 relative">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
                <Image
                  src="/icon0.svg"
                  alt="Logo Victory Road Foro"
                  width={40}
                  height={40}
                  className="h-12 w-12 relative transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-orange-200 group-hover:to-orange-400 transition-all duration-300 hidden sm:block">
                Victory Road Foro
              </span>
            </Link>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-400 hidden sm:inline">
                  Hola, <span className="text-orange-400">{user.email?.split('@')[0]}</span>
                </span>

                <Link
                  href="/threads/new"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all duration-300 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Crear Hilo</span>
                </Link>

                <Button
                  onClick={signOut}
                  variant="outline"
                  className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-orange-500/30 font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 text-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-orange-900/20 transition-all duration-300 text-sm"
                >
                  <User className="h-4 w-4" />
                  <span>Registrarse</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


