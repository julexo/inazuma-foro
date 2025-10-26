// src/components/Header.tsx

import { Plus,User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const isLoggedIn = false;
  return (
  <header className="bg-gradient-to-r from-cyan-50 to-blue-100 py-6 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Título y Descripción */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Inazuma Foro - Alineaciones
          </h1>
          <p className="mt-1 text-md sm:text-lg text-slate-600 hidden md:block">
            Comparte y discute las mejores formaciones
          </p>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href="/threads/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors text-sm sm:text-base"
            >
              <Plus size={18} />
              Nuevo Hilo
            </Link>
            
          ) : (
          
            <Link
              href="/login" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors text-sm sm:text-base"
            >
              <User size={18} />
              Registrarse
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}