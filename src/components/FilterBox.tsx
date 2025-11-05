// src/components/FilterBox.tsx
'use client' // Este componente es interactivo, así que es un Client Component

import { useState, useEffect, useRef } from 'react'
import { Filter, Search, TrendingUp, Clock, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Player } from '@/data/PlayerDataBase'
import { getAllPlayers, getPlayerAvatarUrl } from '@/data/PlayerDataBase'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formationNames } from '@/lib/formationDatabase'

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      e.preventDefault() // Prevenir submit del form
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
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600/50 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">Filtros de Búsqueda</h2>
        </div>
        {(searchQuery || formation !== 'all' || sortBy !== 'recent') && (
          <Button
            onClick={() => {
              setSearchQuery('')
              setFormation('all')
              setSortBy('recent')
            }}
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      <form 
        onSubmit={(e) => { 
          e.preventDefault() // Prevenir recarga de página
          applyFilters() 
        }} 
        className="space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Buscar por jugador */}
          <div className="space-y-2">
            <Label htmlFor="playerName" className="text-sm font-medium text-slate-200">
              Buscar por Jugador
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="playerName"
                type="text"
                placeholder="Ej: Mark Evans"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                className="pl-10 bg-slate-900/60 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 h-11"
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

          {/* Filtrar por formación */}
          <div className="space-y-2">
            <Label htmlFor="formation" className="text-sm font-medium text-slate-200">
              Formación
            </Label>
            <Select value={formation} onValueChange={handleFormationChange}>
              <SelectTrigger 
                id="formation"
                className="bg-slate-900/60 border-slate-600 text-white focus:ring-orange-500/50 h-11"
              >
                <SelectValue placeholder="Todas las formaciones" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600 max-h-[300px]">
                <SelectItem 
                  value="all"
                  className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                >
                  Todas las formaciones
                </SelectItem>
                {formationNames.map((name) => (
                  <SelectItem 
                    key={name} 
                    value={name}
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ordenar por */}
          <div className="space-y-2">
            <Label htmlFor="sortBy" className="text-sm font-medium text-slate-200">
              Ordenar por
            </Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger 
                id="sortBy"
                className="bg-slate-900/60 border-slate-600 text-white focus:ring-orange-500/50 h-11"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem 
                  value="recent"
                  className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                >
                  <Clock className="h-4 w-4 inline mr-2" />
                  Más recientes
                </SelectItem>
                <SelectItem 
                  value="popular"
                  className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  Más populares
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>

      {/* Contador de resultados */}
      {resultsCount !== undefined && (
        <div className="mt-4 pt-4 border-t border-slate-600/50">
          <p className="text-sm text-slate-300">
            {resultsCount === 0 ? (
              <span className="text-orange-400">No se encontraron resultados</span>
            ) : (
              <>
                Mostrando <span className="font-semibold text-white">{resultsCount}</span>{' '}
                {resultsCount === 1 ? 'alineación' : 'alineaciones'}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  )
}