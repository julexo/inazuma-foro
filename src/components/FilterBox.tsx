'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Filter, Search, TrendingUp, Calendar, Sparkles, ArrowUpDown, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Player } from '@/data/PlayerDataBase'
import { searchPlayersByName, getPlayerAvatarUrl } from '@/data/PlayerDataBase' 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formationNames } from '@/lib/formationDatabase'
import { Badge } from '@/components/ui/badge'

interface FilterBoxProps {
  onFilterChange?: (filters: { playerName: string; formation: string; sortBy: string }) => void
  resultsCount?: number
}

export default function FilterBox({ onFilterChange, resultsCount }: FilterBoxProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [formation, setFormation] = useState('all')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<Player[]>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const searchRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ... (useEffect de handleClickOutside se mantiene) ...
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

  // ... (useEffect de autocompletado se mantiene) ...
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (!isInputFocused) {
      return
    }
    timeoutRef.current = setTimeout(async () => {
      const query = searchQuery.trim().toLowerCase()
      if (query.length >= 2) {
        const filtered = await searchPlayersByName(query)
        setSearchResults(filtered.slice(0, 5))
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
  }, [searchQuery, isInputFocused])


  // Función para aplicar filtros (usada por Enter)
  const applyFilters = useCallback(() => {
    if (onFilterChange) {
      onFilterChange({
        playerName: searchQuery,
        formation: formation,
        sortBy: sortBy
      })
    }
    setShowResults(false)
    setIsInputFocused(false)
  }, [onFilterChange, searchQuery, formation, sortBy])

  // Manejar Enter en el input
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      applyFilters()
    }
  }, [applyFilters])

  // Manejadores de foco y selección (se mantienen)
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true)
    if (searchQuery.length >= 2) {
      setShowResults(true)
    }
  }, [searchQuery])

  const handlePlayerSelect = useCallback((player: Player) => {
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
  }, [onFilterChange, formation, sortBy])

  // ✅ --- ESTA ES LA FUNCIÓN QUE REEMPLAZA A LAS OTRAS DOS ---
  // Se usa en el 'onChange' del Input y en los 'onValueChange' de los Select
  const handleChange = useCallback((newPlayerName?: string, newFormation?: string, newSortBy?: string) => {
    const pn = newPlayerName ?? searchQuery
    const fm = newFormation ?? formation
    const sb = newSortBy ?? sortBy

    setSearchQuery(pn)
    setFormation(fm)
    setSortBy(sb)

    if (onFilterChange) {
      onFilterChange({ playerName: pn, formation: fm, sortBy: sb })
    }
  }, [onFilterChange, searchQuery, formation, sortBy])
  

  return (
    <div className="relative overflow-hidden">
      {/* ... (Efectos decorativos) ... */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative">
        {/* ... (Header premium) ... */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-700/50">
           <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 via-orange-600/20 to-amber-600/20 border border-orange-500/40 shadow-lg">
              <Filter className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Filtros de Búsqueda
                <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Encuentra la alineación perfecta</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-md animate-pulse" />
            <Badge className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 text-white border-blue-500/50 px-4 py-1.5 text-sm font-bold shadow-xl">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5 inline" />
              {resultsCount} {resultsCount === 1 ? 'Resultado' : 'Resultados'}
            </Badge>
          </div>
        </div>

        {/* Grid de filtros premium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Buscar por Jugador */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/50 to-amber-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-850/90 to-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/60 p-4 shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/20 border border-orange-500/30">
                    <Search className="h-3.5 w-3.5 text-orange-400" />
                  </div>
                  <label className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Buscar Jugador
                  </label>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
              </div>
              
              <div className="relative" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                <Input
                  type="text"
                  placeholder="Ej: Mark Evans"
                  value={searchQuery}
                  // ✅ Usa la nueva función 'handleChange'
                  onChange={(e) => handleChange(e.target.value, undefined, undefined)}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                  className="pl-10 bg-slate-900/70 border-slate-700/70 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all duration-300 h-11"
                  autoComplete="off"
                />

                {/* Lista de resultados (se mantiene) */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20 overflow-hidden">
                    <ul className="divide-y divide-slate-700">
                      {searchResults.map((player) => (
                        <li key={player.id}>
                          <button
                            type="button"
                            className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-700 transition-colors"
                            onClick={() => handlePlayerSelect(player)}
                          >
                            <Avatar className="h-9 w-9 border border-slate-600">
                              <AvatarImage src={getPlayerAvatarUrl(player.avatar)} />
                              <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-white">{player.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Busca por nombre de jugador
              </p>
            </div>
          </div>

          {/* Formación */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-850/90 to-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/60 p-4 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30">
                    <Filter className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  <label className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Formación
                  </label>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
              
              {/* ✅ Usa la nueva función 'handleChange' */}
              <Select value={formation} onValueChange={(val) => handleChange(undefined, val, undefined)}>
                <SelectTrigger className="bg-slate-900/70 border-slate-700/70 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 h-11">
                  <SelectValue placeholder="Todas las formaciones" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all" className="text-white hover:bg-slate-700">Todas las formaciones</SelectItem>
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
              <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Filtra por sistema táctico
              </p>
            </div>
          </div>

          {/* Ordenar por */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-850/90 to-slate-900/9AF0 backdrop-blur-xl rounded-xl border border-slate-700/60 p-4 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <ArrowUpDown className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <label className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Ordenar Por
                  </label>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
              </div>
              
              {/* ✅ Usa la nueva función 'handleChange' */}
              <Select value={sortBy} onValueChange={(val) => handleChange(undefined, undefined, val)}>
                <SelectTrigger className="bg-slate-900/70 border-slate-700/70 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 h-11">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="recent" className="text-white hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-blue-400" />
                      Más recientes
                    </div>
                  </SelectItem>
                  <SelectItem value="popular" className="text-white hover:bg-slate-700">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-orange-400" />
                      Más populares
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Ordena los resultados
              </p>
            </div>
          </div>
        </div>

        {/* Footer con estadísticas */}
        <div className="mt-6 pt-5 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Filtros activos: <span className="font-bold text-white">{[searchQuery, formation !== 'all', sortBy !== 'recent'].filter(Boolean).length}/3</span>
          </div>
          {(searchQuery || formation !== 'all' || sortBy !== 'recent') && (
            <Button
              onClick={() => handleChange('', 'all', 'recent')}
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white hover:bg-slate-700/50"
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}