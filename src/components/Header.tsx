// src/components/Header.tsx

import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-cyan-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Inazuma Eleven - Foro de Alineaciones
          </h1>
          <p className="mt-1 text-lg text-slate-600">
            Comparte y discute las mejores formaciones
          </p>
        </div>
        <Link
          href="/threads/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors"
        >
          <Plus size={20} />
          Nuevo Hilo
        </Link>
      </div>
    </header>
  )
}