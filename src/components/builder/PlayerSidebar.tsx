import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Flame, Wind, TreePine, Mountain } from 'lucide-react';
import { teams, elements, positions, PlayerData } from '@/lib/PlayerDataBase';

interface PlayerSidebarProps {
  availablePlayers: PlayerData[];
  onDragStart: (player: PlayerData) => void;
}

const elementIcons = {
  Fuego: Flame,
  Viento: Wind,
  Bosque: TreePine,
  Montaña: Mountain,
};

const elementColors = {
  Fuego: 'bg-orange-500 text-white',
  Viento: 'bg-sky-500 text-white',
  Bosque: 'bg-green-600 text-white',
  Montaña: 'bg-amber-700 text-white',
};

export function PlayerSidebar({ availablePlayers, onDragStart }: PlayerSidebarProps) {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [elementFilter, setElementFilter] = useState('all');

  const filteredPlayers = useMemo(() => {
    return availablePlayers.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
      const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
      const matchesTeam = teamFilter === 'all' || player.team === teamFilter;
      const matchesElement = elementFilter === 'all' || player.element === elementFilter;

      return matchesSearch && matchesPosition && matchesTeam && matchesElement;
    });
  }, [availablePlayers, search, positionFilter, teamFilter, elementFilter]);

  const headerId = 'player-sidebar-header';
  const footerId = 'player-sidebar-footer';

  return (
    <div className="h-full flex flex-col bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
      {/* Header con título y búsqueda */}
      <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-orange-400" />
          Jugadores Disponibles
        </h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            id="search"
            placeholder="Buscar jugador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 focus-visible:ring-orange-500/50"
          />
        </div>
      </div>

      {/* Filtros en contenedor fijo */}
      <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="position" className="text-xs text-slate-300">Posición</Label>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger id="position" className="bg-slate-900/50 border-slate-600 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-slate-200">Todas</SelectItem>
                {positions.map(pos => (
                  <SelectItem key={pos} value={pos} className="text-slate-200 focus:bg-slate-700">
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="element" className="text-xs text-slate-300">Elemento</Label>
            <Select value={elementFilter} onValueChange={setElementFilter}>
              <SelectTrigger id="element" className="bg-slate-900/50 border-slate-600 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-slate-200">Todos</SelectItem>
                {elements.map(elem => (
                  <SelectItem key={elem} value={elem} className="text-slate-200 focus:bg-slate-700">
                    {elem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 space-y-1.5">
            <Label htmlFor="team" className="text-xs text-slate-300">Equipo</Label>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger id="team" className="bg-slate-900/50 border-slate-600 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-slate-200">Todos</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team} value={team} className="text-slate-200 focus:bg-slate-700">
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Lista de jugadores con scroll */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            {filteredPlayers.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">
                No se encontraron jugadores
              </p>
            ) : (
              filteredPlayers.map(player => {
                const ElementIcon = elementIcons[player.element];
                return (
                  <div
                    key={player.id}
                    draggable
                    onDragStart={() => onDragStart(player)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600/50 hover:bg-slate-600/50 hover:border-orange-500/50 cursor-move transition-all duration-200 group"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-slate-600 group-hover:ring-orange-500/50 transition-all">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className="bg-slate-700">{player.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 truncate group-hover:text-orange-400">{player.name}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Badge variant="outline" className="text-xs px-1.5 py-0 border-slate-600 text-slate-300">
                          {player.position}
                        </Badge>
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${elementColors[player.element]}`}>
                          <ElementIcon className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer con contador */}
      <div className="p-3 bg-slate-800 border-t border-slate-700/50">
        <p className="text-center text-xs text-slate-400">
          {filteredPlayers.length} jugador{filteredPlayers.length !== 1 ? 'es' : ''} disponible{filteredPlayers.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
