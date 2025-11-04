// src/components/FilterBox.tsx
'use client' // Este componente es interactivo, así que es un Client Component

import { useState, useEffect, useRef } from 'react'
import { Filter, Search, TrendingUp, Clock } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Player } from '@/data/PlayerDataBase'
import { getAllPlayers, getPlayerAvatarUrl } from '@/data/PlayerDataBase'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FilterBoxProps {
  onFilterChange?: (filters: { playerName: string; formation: string; sortBy: string }) => void
  resultsCount?: number // Añadir esta prop
}

export default function FilterBox({ onFilterChange, resultsCount }: FilterBoxProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [formation, setFormation] = useState('all')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Player[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [sortBy, setSortBy] = useState('recent') // 'recent' o 'popular'
  const searchRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Ejemplo de formaciones disponibles
  const formations = [
    'all',
    '4-4-2',
    '4-3-3',
    '5-3-2',
    '3-5-2',
    '4-2-3-1'
  ]

  // Efecto mejorado para manejar clics fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
        setIsInputFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Efecto para autocompletado
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!isInputFocused) {
      return
    }

    timeoutRef.current = setTimeout(() => {
      const query = searchQuery.trim().toLowerCase()
      if (query.length >= 2) {
        const filtered = players
          .filter(player => player.name.toLowerCase().includes(query))
          .slice(0, 5)
        setSearchResults(filtered)
        setShowResults(true)
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [searchQuery, isInputFocused, players])

  // Función para aplicar filtros
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        playerName: searchQuery,
        formation: formation,
        sortBy: sortBy
      })
    }
    setShowResults(false)
    setIsInputFocused(false)
  }

  // Manejar Enter en el input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilters()
    }
  }

  // Función para manejar cambios en la formación
  const handleFormationChange = (value: string) => {
    setFormation(value)
    if (onFilterChange) {
      onFilterChange({
        playerName: searchQuery,
        formation: value,
        sortBy: sortBy
      })
    }
  }

  // Función para manejar cambios en el orden
  const handleSortChange = (value: string) => {
    setSortBy(value)
    if (onFilterChange) {
      onFilterChange({
        playerName: searchQuery,
        formation: formation,
        sortBy: value
      })
    }
  }

  // Manejadores mejorados
  const handleInputFocus = () => {
    setIsInputFocused(true)
    if (searchQuery.length >= 2) {
      setShowResults(true)
    }
  }

  // Manejar selección de jugador
  const handlePlayerSelect = (player: Player) => {
    setSearchQuery(player.name)
    setShowResults(false)
    setIsInputFocused(false)
    if (onFilterChange) {
      onFilterChange({
        playerName: player.name,
        formation: formation,
        sortBy: sortBy
      })
    }
  }

  useEffect(() => {
    // Carga inicial de jugadores para autocompletado
    getAllPlayers().then(setPlayers).catch(() => setPlayers([]))
  }, [])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg mb-8">
      {/* Header con efecto gradient */}
      <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
        <div className="p-2 rounded-lg bg-orange-500/20">
          <Filter className="h-5 w-5 text-orange-400" />
        </div>
        <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Filtros de Búsqueda
        </span>
      </h2>

      <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Búsqueda por jugador con autocompletado mejorado */}
          <div className="space-y-2">
            <label htmlFor="search-player" className="block text-sm font-medium text-slate-300">
              Buscar por jugador
            </label>
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                id="search-player"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                className="pl-9 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50"
                placeholder="Ej: Endou, Gouenji..."
              />
              
              {/* Lista de resultados con posición mejorada */}
              {isInputFocused && showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-[9999] mt-1 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                  {searchResults.map((player) => {
                    const avatarUrl = getPlayerAvatarUrl(player.avatar)
                    return (
                      <button
                        key={player.id}
                        type="button"
                        onClick={() => handlePlayerSelect(player)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-slate-700/70 transition-colors duration-150 border-b border-slate-700/50 last:border-0"
                      >
                        <Avatar className="h-8 w-8 border border-slate-600">
                          <AvatarImage src={avatarUrl} />
                          <AvatarFallback className="bg-slate-700 text-slate-300">
                            {player.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <p className="text-sm text-slate-200 font-medium">{player.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-orange-400">{player.position || 'N/A'}</span>
                            <span className="text-xs text-slate-400">{(player.team || []).join(', ')}</span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Selector de formación mejorado */}
          <div className="space-y-2">
            <label htmlFor="filter-formation" className="block text-sm font-medium text-slate-300">
              Filtrar por alineación
            </label>
            <Select value={formation} onValueChange={handleFormationChange}>
              <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-slate-200">
                <SelectValue placeholder="Selecciona formación" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {formations.map((f) => (
                  <SelectItem 
                    key={f} 
                    value={f}
                    className="text-slate-200 focus:bg-slate-700 cursor-pointer"
                  >
                    {f === 'all' ? 'Todas las formaciones' : f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nuevo: Ordenar por */}
          <div className="space-y-2">
            <label htmlFor="sort-by" className="block text-sm font-medium text-slate-300">
              Ordenar por
            </label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="recent" className="text-slate-200 focus:bg-slate-700 cursor-pointer">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Más recientes
                </SelectItem>
                <SelectItem value="popular" className="text-slate-200 focus:bg-slate-700 cursor-pointer">
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  Más populares
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium shadow-lg transition-all duration-300"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar Hilos
        </Button>
      </form>

      {/* Contador de resultados */}
      {resultsCount !== undefined && (
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <span className="text-xs text-slate-400">Resultados:</span>
            <span className="text-sm font-semibold text-orange-400">{resultsCount}</span>
          </div>
        </div>
      )}
    </div>
  )
}