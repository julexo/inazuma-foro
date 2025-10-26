import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Flame, Wind, TreePine, Mountain } from 'lucide-react';
import { getPlayersByFilter, teams, elements, positions, PlayerData } from '@/lib/PlayerDataBase';

interface PlayerSidebarProps {
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

export function PlayerSidebar({ onDragStart }: PlayerSidebarProps) {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [elementFilter, setElementFilter] = useState('all');

  const filteredPlayers = useMemo(() => {
    return getPlayersByFilter(search, positionFilter, teamFilter, elementFilter);
  }, [search, positionFilter, teamFilter, elementFilter]);

  return (
    <div className="h-full flex flex-col bg-white/95 backdrop-blur-sm rounded-lg border-2 border-sky-200 shadow-lg">
      <div className="p-4 border-b border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50">
        <h3 className="text-sky-900 mb-4">Jugadores Disponibles</h3>
        
        {/* Search */}
        <div className="space-y-2 mb-3">
          <Label htmlFor="search" className="text-xs">Buscar por nombre</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Buscar jugador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="position" className="text-xs">Posición</Label>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger id="position">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {positions.map(pos => (
                  <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="element" className="text-xs">Elemento</Label>
            <Select value={elementFilter} onValueChange={setElementFilter}>
              <SelectTrigger id="element">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {elements.map(elem => (
                  <SelectItem key={elem} value={elem}>{elem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label htmlFor="team" className="text-xs">Equipo</Label>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger id="team">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team} value={team}>{team}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Players List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredPlayers.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">
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
                  className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-sky-400 hover:bg-sky-50 cursor-move transition-all group"
                >
                  <Avatar className="h-10 w-10 border-2 border-sky-200">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="truncate group-hover:text-sky-900">{player.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="text-xs px-1 py-0">
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

      <div className="p-3 border-t border-sky-200 bg-sky-50 text-xs text-sky-700 text-center">
        {filteredPlayers.length} jugador{filteredPlayers.length !== 1 ? 'es' : ''}
      </div>
    </div>
  );
}
