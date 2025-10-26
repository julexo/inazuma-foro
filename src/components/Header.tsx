// src/components/Header.tsx

import { Plus, LogIn, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image' 

export default function Header() {
 
  const isLoggedIn = false;
  

  return (
    <header className="bg-white py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo y Título (Alineados a la izquierda) */}
        <div className="flex items-center gap-3">
          {/* 2. Añade el componente Image */}
          <Link href="/" className="flex items-center gap-3">
             <Image
                src="/logo.png" 
                alt="Logo Inazuma Foro"
                width={40} 
                height={40} 
                className="h-25 w-25" 
             />
             <span className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors hidden sm:block">
                Victory Road Foro
             </span>
          </Link>
        </div>

        {/* Grupo de Botones (Alineados a la derecha) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            // --- Botones si el usuario SÍ está logueado ---
            <>
              <Link
                href="/threads/new"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                <Plus size={18} />
                Crear Hilo
              </Link>
              {/* Aquí podrías añadir un botón de Perfil o Salir */}
            </>
          ) : (
            // --- Botones si el usuario NO está logueado ---
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white border border-blue-400 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-sm transition-colors text-sm sm:text-base"
              >
                <LogIn size={18} />
                Iniciar Sesión
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                <User size={18} />
                Registrarse
              </Link>

              <Link
                href="/threads/new"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                <Plus size={18} />
                Crear Hilo
              </Link>
            </>

          )}
        </div>
      </div>
    </header>
  )
}