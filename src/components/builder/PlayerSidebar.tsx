'use client'

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Flame, Wind, TreePine, Mountain, Loader2 } from 'lucide-react';
import { getAllPlayers, searchPlayersByName, getPlayerAvatarUrl, type Player } from '@/data/PlayerDataBase';

interface PlayerSidebarProps {
  onPlayerSelect: (player: Player) => void;
  usedPlayerIds: Set<string>;
}

const elementIcons: Record<string, typeof Flame> = {
  Fuego: Flame,
  Viento: Wind,
  Bosque: TreePine,
  Montaña: Mountain,
};

const elementColors: Record<string, string> = {
  Fuego: 'bg-orange-500/90 text-white',
  Viento: 'bg-cyan-500/90 text-white',
  Bosque: 'bg-green-500/90 text-white',
  Montaña: 'bg-amber-600/90 text-white',
};

const positions = ['Portero', 'Defensa', 'Centrocampista', 'Delantero'];
const elements = ['Fuego', 'Viento', 'Bosque', 'Montaña'];

export default function PlayerSidebar({ onPlayerSelect, usedPlayerIds }: PlayerSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPosition, setFilterPosition] = useState<string>('all')
  const [elementFilter, setElementFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')
  const [allPlayers, setAllPlayers] = useState<Player[]>([]) // Todos los jugadores originales
  const [loading, setLoading] = useState(true)

  // Extraer equipos únicos
  const teams = useMemo(() => {
    const allTeams = new Set<string>()
    allPlayers.forEach(player => {
      if (player.team && Array.isArray(player.team)) {
        player.team.forEach(team => {
          if (team && team.trim()) {
            allTeams.add(team.trim())
          }
        })
      }
    })
    return Array.from(allTeams).sort()
  }, [allPlayers])

  // Cargar jugadores al montar el componente
  useEffect(() => {
    loadPlayers()
  }, [])

  async function loadPlayers() {
    setLoading(true)
    try {
      const players = await getAllPlayers()
      console.log('Total de jugadores cargados:', players.length) // Debug
      setAllPlayers(players)
    } catch (error) {
      console.error('Error loading players:', error)
    } finally {
      setLoading(false)
    }
  }

  // Buscar jugadores cuando cambia searchQuery
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        setLoading(true)
        try {
          const results = await searchPlayersByName(searchQuery)
          console.log('Resultados de búsqueda:', results.length) // Debug
          setAllPlayers(results)
        } catch (error) {
          console.error('Error searching:', error)
        } finally {
          setLoading(false)
        }
      } else {
        // Si no hay búsqueda, recargar todos los jugadores
        loadPlayers()
      }
    }
    performSearch()
  }, [searchQuery])

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setSearchQuery(searchTerm)
    }
  }

  useEffect(() => {
    if (searchTerm === '') {
      setSearchQuery('')
    }
  }, [searchTerm])

  // Filtrar jugadores localmente
  const filteredPlayers = useMemo(() => {
    let filtered = [...allPlayers]

    console.log('Jugadores antes de filtrar:', filtered.length) // Debug
    console.log('Jugadores usados:', usedPlayerIds.size) // Debug

    // Excluir jugadores ya usados
    filtered = filtered.filter(player => !usedPlayerIds.has(player.id))
    console.log('Después de excluir usados:', filtered.length) // Debug

    if (filterPosition !== 'all') {
      filtered = filtered.filter(player => player.position === filterPosition)
      console.log(`Después de filtrar por posición (${filterPosition}):`, filtered.length) // Debug
    }

    if (elementFilter !== 'all') {
      filtered = filtered.filter(player => player.element === elementFilter)
      console.log(`Después de filtrar por elemento (${elementFilter}):`, filtered.length) // Debug
    }

    if (teamFilter !== 'all') {
      filtered = filtered.filter(player => {
        if (!player.team || !Array.isArray(player.team)) {
          return false
        }
        return player.team.some(team => team === teamFilter)
      })
      console.log(`Después de filtrar por equipo (${teamFilter}):`, filtered.length) // Debug
    }

    console.log('Jugadores finales a mostrar:', filtered.length) // Debug
    return filtered
  }, [allPlayers, filterPosition, elementFilter, teamFilter, usedPlayerIds])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Buscador */}
      <div className="flex-shrink-0 p-4 border-b border-slate-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar jugador... (presiona Enter)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
          />
        </div>
        {searchQuery && (
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Buscando: <span className="text-orange-400 font-medium">{searchQuery}</span>
            </span>
            <button
              onClick={() => {
                setSearchTerm('')
                setSearchQuery('')
              }}
              className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Filtros */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-slate-700/50 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-slate-300">Posición</Label>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="h-9 bg-slate-800/50 border-slate-700 text-slate-200 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 max-h-[300px]">
                <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">Todas</SelectItem>
                {positions.map(pos => (
                  <SelectItem key={pos} value={pos} className="text-slate-200 focus:bg-slate-700">{pos}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-slate-300">Elemento</Label>
            <Select value={elementFilter} onValueChange={setElementFilter}>
              <SelectTrigger className="h-9 bg-slate-800/50 border-slate-700 text-slate-200 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 max-h-[300px]">
                <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">Todos</SelectItem>
                {elements.map(elem => (
                  <SelectItem key={elem} value={elem} className="text-slate-200 focus:bg-slate-700">{elem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium text-slate-300">Equipo</Label>
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="h-9 bg-slate-800/50 border-slate-700 text-slate-200 text-sm">
              <SelectValue placeholder="Seleccionar equipo" />
            </SelectTrigger>
            <SelectContent 
              className="bg-slate-800 border-slate-700 max-h-[300px]"
              position="popper"
              sideOffset={5}
            >
              <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-white">
                Todos los equipos
              </SelectItem>
              {teams.map(team => (
                <SelectItem 
                  key={team} 
                  value={team} 
                  className="text-slate-200 focus:bg-slate-700 focus:text-white cursor-pointer"
                >
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de jugadores */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            {/* Indicador de total */}
            <div className="text-xs text-slate-400 mb-2 px-2">
              Mostrando {filteredPlayers.length} de {allPlayers.length} jugadores
              {usedPlayerIds.size > 0 && ` (${usedPlayerIds.size} en uso)`}
            </div>

            {filteredPlayers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                {searchQuery 
                  ? 'No se encontraron jugadores con ese nombre' 
                  : usedPlayerIds.size > 0 
                    ? 'Todos los jugadores disponibles están en uso' 
                    : 'No hay jugadores disponibles'}
              </div>
            ) : (
              filteredPlayers.map((player) => {
                const ElementIcon = elementIcons[player.element || ''] || Flame;
                const elementColor = elementColors[player.element || ''] || 'bg-slate-600 text-white';
                const avatarUrl = getPlayerAvatarUrl(player.avatar);
                
                return (
                  <div
                    key={player.id}
                    draggable
                    onDragStart={() => onPlayerSelect(player)}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60 hover:border-orange-500/50 cursor-move transition-all duration-200 group"
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-slate-700/50 group-hover:ring-orange-500/50 transition-all flex-shrink-0">
                      <AvatarImage src={avatarUrl} alt={player.name} />
                      <AvatarFallback className="bg-slate-700 text-white text-sm">
                        {player.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate group-hover:text-orange-300 transition-colors">
                        {player.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-0 h-5 border-slate-600 text-slate-300 bg-slate-800/50"
                        >
                          {player.position || 'N/A'}
                        </Badge>
                        {player.element && (
                          <div className={`flex items-center justify-center gap-1 px-2 py-0 h-5 rounded text-xs font-medium ${elementColor}`}>
                            <ElementIcon className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
