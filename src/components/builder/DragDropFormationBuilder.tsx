'use client'

import { useState, useMemo } from 'react';
import { Formation, Player, PlayerData } from '@/types'; // Importa PlayerData
import { PlayerSidebar } from './PlayerSidebar';
// Importa la base de datos completa
import { playersDatabase, getPlayersByFilter } from '@/lib/PlayerDataBase'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DragDropFormationBuilderProps {
  formation: Formation;
  onFormationChange: (formation: Formation) => void;
}

export function DragDropFormationBuilder({ formation, onFormationChange }: DragDropFormationBuilderProps) {
  const [draggedPlayer, setDraggedPlayer] = useState<PlayerData | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memorizamos los jugadores usados y disponibles (sin cambios)
  const usedPlayerIds = useMemo(() => {
    return new Set(formation.players.map(p => p.playerData?.id).filter(Boolean));
  }, [formation]);

  const availablePlayers = useMemo(() => {
    return playersDatabase.filter(p => !usedPlayerIds.has(p.id));
  }, [usedPlayerIds]);

  // Nueva función de validación
  const validatePosition = (playerData: PlayerData, position: number): boolean => {
    if (position === 1 && playerData.position !== 'Portero') {
      setError('Solo puedes colocar porteros en la posición 1');
      return false;
    }
    setError(null);
    return true;
  };

  // Funciones de manejo mejoradas
  const handleDragStart = (player: PlayerData) => {
    try {
      setDraggedPlayer(player);
      setError(null);
    } catch (error) {
      console.error('Error al iniciar arrastre:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent, slotId: number) => {
    e.preventDefault();
    setHoveredSlot(slotId);
  };

  const handleDragLeave = () => {
    setHoveredSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotId: number) => {
    try {
      e.preventDefault();
      if (!draggedPlayer) return;

      // Validar posición
      if (!validatePosition(draggedPlayer, slotId)) {
        return;
      }

      const updatedPlayers = formation.players.map(player =>
        player.id === slotId
          ? {
              ...player,
              name: draggedPlayer.name,
              playerData: draggedPlayer,
            }
          : player
      );

      onFormationChange({ ...formation, players: updatedPlayers });
      setDraggedPlayer(null);
      setHoveredSlot(null);
    } catch (error) {
      console.error('Error al colocar jugador:', error);
      setError('Error al colocar el jugador');
    }
  };

  const handleRemovePlayer = (slotId: number) => {
    // Obtenemos el jugador que vamos a quitar para devolverlo a la lista
    const playerToRemove = formation.players.find(p => p.id === slotId)?.playerData;

    const updatedPlayers = formation.players.map(player =>
      player.id === slotId
        ? {
            ...player,
            name: getDefaultName(slotId),
            playerData: undefined,
          }
        : player
    );
    onFormationChange({ ...formation, players: updatedPlayers });

    // Al quitarlo de 'formation.players', 'usedPlayerIds' se recalculará
    // y 'availablePlayers' incluirá automáticamente a 'playerToRemove'.
  };

  const getDefaultName = (id: number): string => { // Añadido tipo de retorno
    if (id === 1) return 'Portero';
    if (id <= 4) return 'Defensa'; // Ajustado ejemplo simple (4 def)
    if (id <= 8) return 'Mediocampo'; // Ajustado ejemplo simple (4 med)
    return 'Delantero'; // Ajustado ejemplo simple (2 del)
  };

  // Quitamos el _e si no se usa
  const handleFieldClick = () => {
    // No mover jugadores al hacer clic en el campo en modo drag-drop
  };

  // Utilidad para estilos de slots
  const getSlotStyles = (isHovered: boolean, hasPlayer: boolean) => `
    w-16 h-16 rounded-full 
    flex items-center justify-center 
    transition-all duration-200
    ${isHovered ? 'ring-4 ring-orange-400 scale-110' : ''}
    ${hasPlayer 
      ? 'ring-2 ring-white bg-gradient-to-br from-blue-500 to-blue-700 cursor-move' 
      : 'ring-2 ring-dashed ring-white/50 bg-white/20 backdrop-blur-sm cursor-pointer'
    }
  `;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
      <div className="lg:col-span-1 h-full overflow-hidden">
        <PlayerSidebar
          availablePlayers={availablePlayers}
          onDragStart={handleDragStart}
        />
      </div>

      <div className="lg:col-span-3 space-y-4">
        {/* Mostrar error si existe */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Alert className="border-sky-200 bg-sky-50">
          <AlertCircle className="h-4 w-4 text-sky-600" />
          <AlertDescription className="text-sky-800">
            Arrastra jugadores desde el panel lateral hacia las posiciones en el campo.
          </AlertDescription>
        </Alert>

        {/* Campo de juego existente */}
        <div
          className="relative w-full aspect-[3/2] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden"
          onClick={handleFieldClick}
        >
          {/* SVG existente */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none">
             {/* Líneas exteriores */}
             <rect x="2%" y="2%" width="96%" height="96%" fill="none" stroke="white" strokeWidth="2" />
             {/* Línea central */}
             <line x1="50%" y1="2%" x2="50%" y2="98%" stroke="white" strokeWidth="2" />
             {/* Círculo central */}
             <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="2" />
             <circle cx="50%" cy="50%" r="1%" fill="white" />
             {/* Área izquierda */}
             <rect x="2%" y="30%" width="15%" height="40%" fill="none" stroke="white" strokeWidth="2" />
             <rect x="2%" y="42%" width="8%" height="16%" fill="none" stroke="white" strokeWidth="2" />
             {/* Área derecha */}
             <rect x="83%" y="30%" width="15%" height="40%" fill="none" stroke="white" strokeWidth="2" />
             <rect x="90%" y="42%" width="8%" height="16%" fill="none" stroke="white" strokeWidth="2" />
           </svg>

           {/* Slots de jugadores con estilos mejorados */}
           {formation.players.map((player) => {
             const playerData = player.playerData;
             const isHovered = hoveredSlot === player.id;

             return (
               <div
                 key={player.id}
                 draggable={!!playerData}
                 onDragStart={(e: React.DragEvent) => {
                   if (playerData) {
                     e.dataTransfer.effectAllowed = 'move';
                     e.dataTransfer.setData('playerId', player.id.toString());
                   }
                 }}
                 onDragOver={(e) => handleDragOver(e, player.id)}
                 onDragLeave={handleDragLeave}
                 onDrop={(e) => handleDrop(e, player.id)}
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                 style={{ left: `${player.position.x}%`, top: `${player.position.y}%` }}
               >
                 <div className="relative group">
                   <div className={getSlotStyles(isHovered, !!playerData)}>
                     {playerData ? (
                       <Avatar className="h-14 w-14 border-2 border-white"><AvatarImage src={playerData.avatar} /><AvatarFallback>{playerData.name.slice(0, 2)}</AvatarFallback></Avatar>
                     ) : (
                       <span className="text-white text-xs">{player.id}</span>
                     )}
                   </div>
                   <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap bg-black/90 text-white px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                     {player.name}
                   </div>
                   {playerData && (
                     <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                       onClick={(e: React.MouseEvent) => {
                         e.stopPropagation(); handleRemovePlayer(player.id);
                       }}
                     >
                       <Trash2 className="h-3 w-3" />
                     </Button>
                   )}
                 </div>
               </div>
             );
           })}
        </div>

        {/* Player count existente */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
           <span className="text-blue-900">
             Jugadores asignados: {formation.players.filter(p => p.playerData).length} / 11
           </span>
           {formation.players.filter(p => p.playerData).length === 11 && (
             <span className="text-green-600 flex items-center gap-1">
               ✓ Alineación completa
             </span>
           )}
         </div>
      </div>
    </div>
  );
}