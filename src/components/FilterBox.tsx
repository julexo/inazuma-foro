// src/components/FilterBox.tsx
'use client' // Este componente es interactivo, así que es un Client Component

import { Filter, Search, ChevronDown } from 'lucide-react'

export default function FilterBox() {
  return (
    <div className="bg-slate-100 p-6 rounded-2xl shadow-sm mb-8">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-black mb-4">
        <Filter size={22} />
        Filtros de Búsqueda
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Buscar por jugador */}
        <div>
          <label htmlFor="search-player" className="block text-sm font-medium text-black mb-1">
            Buscar por jugador
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-black" />
            </div>
            <input
              type="text"
              id="search-player"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Endou, Gouenji..."
            />
          </div>
        </div>

        {/* Filtrar por alineación */}
        <div>
          <label htmlFor="filter-formation" className="block text-sm font-medium text-black mb-1">
            Filtrar por alineación
          </label>
          <div className="relative">
            <select
              id="filter-formation"
              className="w-full appearance-none py-2 px-3 pr-8 border border-slate-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Todas las alineaciones</option>
              <option>4-4-2</option>
              <option>4-3-3 Ofensivo</option>
              <option>5-3-2 Defensivo</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}