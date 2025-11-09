'use client'

import { useState, useEffect, useMemo, memo, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Flame, Wind, TreePine, Mountain, Loader2 } from 'lucide-react';
import { getAllPlayers, getPlayerAvatarUrl, type Player } from '@/data/PlayerDataBase';

interface PlayerSidebarProps {
  onPlayerSelect: (player: Player) => void;
  usedPlayerIds: Set<string>;
}

// ... (constantes de iconos y colores)
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


// --- Componente Item (Memoizado) ---
interface PlayerSidebarItemProps {
  player: Player;
  onPlayerSelect: (player: Player) => void;
}
const PlayerSidebarItem = memo(function PlayerSidebarItem({ player, onPlayerSelect }: PlayerSidebarItemProps) {
  const ElementIcon = elementIcons[player.element || ''] || Flame;
  const elementColor = elementColors[player.element || ''] || 'bg-slate-600 text-white';
  const avatarUrl = getPlayerAvatarUrl(player.avatar);
  
  return (
    <div
      key={player.id}
      draggable // Para escritorio
      onDragStart={() => onPlayerSelect(player)} // Para escritorio
      onClick={() => onPlayerSelect(player)} // ✅ AÑADIDO: Para el clic en móvil
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
});
PlayerSidebarItem.displayName = 'PlayerSidebarItem';


// --- Componente Principal (con 'useTransition' para INP) ---
export default function PlayerSidebar({ onPlayerSelect, usedPlayerIds }: PlayerSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPosition, setFilterPosition] = useState<string>('all')
  const [elementFilter, setElementFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition();

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

  useEffect(() => {
    loadPlayers()
  }, [])

  async function loadPlayers() {
    setLoading(true)
    try {
      const players = await getAllPlayers()
      setAllPlayers(players)
    } catch (error) {
      console.error('Error loading players:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPlayers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return allPlayers.filter(player => {
      if (usedPlayerIds.has(player.id)) return false
      if (query.length > 0 && !player.name.toLowerCase().includes(query)) return false
      if (filterPosition !== 'all' && player.position !== filterPosition) return false
      if (elementFilter !== 'all' && player.element !== elementFilter) return false
      if (teamFilter !== 'all') {
        if (!player.team || !Array.isArray(player.team)) return false
        if (!player.team.some(team => team === teamFilter)) return false
      }
      return true
    })
  }, [allPlayers, searchTerm, filterPosition, elementFilter, teamFilter, usedPlayerIds])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    )
  }

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      setSearchTerm(value);
    });
  };
  const handlePositionChange = (value: string) => {
    startTransition(() => {
      setFilterPosition(value);
    });
  };
  const handleElementChange = (value: string) => {
    startTransition(() => {
      setElementFilter(value);
    });
  };
  const handleTeamChange = (value: string) => {
    startTransition(() => {
      setTeamFilter(value);
    });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="flex-shrink-0 p-4 border-b border-slate-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar jugador..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
          />
        </div>
        {searchTerm && (
          <div className="mt-2 flex items-center justify-end text-xs">
            <button
              onClick={() => handleSearchChange('')}
              className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 px-4 py-3 border-b border-slate-700/50 space-y-3">
         <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-slate-300">Posición</Label>
            <Select value={filterPosition} onValueChange={handlePositionChange}>
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
            <Select value={elementFilter} onValueChange={handleElementChange}>
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
          <Select value={teamFilter} onValueChange={handleTeamChange}>
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

      <div className={`flex-1 min-h-0 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            <div className="text-xs text-slate-400 mb-2 px-2">
              Mostrando {filteredPlayers.length} jugadores
              {usedPlayerIds.size > 0 && ` (${usedPlayerIds.size} en uso)`}
            </div>

            {filteredPlayers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                {searchTerm
                  ? 'No se encontraron jugadores con ese nombre'
                  : 'No hay jugadores que coincidan con los filtros'
                }
              </div>
            ) : (
              filteredPlayers.map((player) => (
                <PlayerSidebarItem
                  key={player.id}
                  player={player}
                  onPlayerSelect={onPlayerSelect}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}