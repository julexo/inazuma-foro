import { Plus, LogIn, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  // --- Lógica de Autenticación (Reemplaza con tu lógica real) ---
  const isLoggedIn = false;
  // --- ---

  return (
    // Estilos del header oscuro y semi-transparente
    <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-900/90 via-indigo-800/85 to-indigo-950/90 backdrop-blur-sm py-3 px-4 sm:px-6 lg:px-8 border-b border-b-indigo-950/50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo y Título */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
             <Image
                src="/icon0.svg" // Asegúrate que este archivo exista en /public
                alt="Logo Victory Road Foro"
                width={40}
                height={40}
                // Corregido: Clases de tamaño estándar de Tailwind (10 = 2.5rem = 40px)
                className="h-25 w-25"
             />
             {/* Corregido: Colores de texto para fondo oscuro */}
             <span className="text-xl sm:text-2xl font-bold text-slate-100 hover:text-sky-300 transition-colors hidden sm:block">
                Victory Road Foro
             </span>
          </Link>
        </div>

        {/* Grupo de Botones */}
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
              {/* Botón Iniciar Sesión adaptado */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-sm transition-colors text-sm sm:text-base"
              >
                <LogIn size={18} />
                Iniciar Sesión
              </Link>
              {/* Botón Registrarse adaptado */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
              >
                <User size={18} />
                Registrarse
              </Link>
              {/* Corregido: Botón "Crear Hilo" duplicado eliminado de aquí */}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
