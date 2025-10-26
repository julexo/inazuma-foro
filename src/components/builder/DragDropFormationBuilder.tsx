// src/components/builder/DragDropFormationBuilder.tsx
'use client' // <- Asegúrate de que tiene 'use client' si usa useState

import { useState } from 'react';
import { Formation } from '@/types';
import { PlayerSidebar } from './PlayerSidebar';
import { PlayerData } from '@/lib/PlayerDataBase';
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

  const handleDragStart = (player: PlayerData) => {
    setDraggedPlayer(player);
  };

  const handleDragOver = (e: React.DragEvent, slotId: number) => {
    e.preventDefault();
    setHoveredSlot(slotId);
  };

  const handleDragLeave = () => {
    setHoveredSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotId: number) => {
    e.preventDefault();
    if (draggedPlayer) {
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
    }
  };

  const handleRemovePlayer = (slotId: number) => {
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
  };

  const getDefaultName = (id: number) => {
    if (id === 1) return 'Portero';
    if (id <= 5) return 'Defensa';
    if (id <= 9) return 'Mediocampo';
    return 'Delantero';
  };


  const handleFieldClick = () => {
    // Don't move players on field click in drag-drop mode
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
      {/* Sidebar with players */}
      <div className="lg:col-span-1 h-full">
        <PlayerSidebar onDragStart={handleDragStart} />
      </div>

      {/* Formation field */}
      <div className="lg:col-span-3 space-y-4">
        <Alert className="border-sky-200 bg-sky-50">
          <AlertCircle className="h-4 w-4 text-sky-600" />
          <AlertDescription className="text-sky-800">
            Arrastra jugadores desde el panel lateral hacia las posiciones en el campo.
          </AlertDescription>
        </Alert>

        <div
          className="relative w-full aspect-[3/2] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden"
          onClick={handleFieldClick} // Ahora llama a la función sin parámetros
        >
          {/* Field lines ... */}
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

          {/* Player slots */}
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
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${player.position.x}%`,
                  top: `${player.position.y}%`,
                }}
              >
                <div className="relative group">
                  {/* Div principal del jugador */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                      isHovered
                        ? 'ring-4 ring-orange-400 scale-110'
                        : playerData
                        ? 'ring-2 ring-white'
                        : 'ring-2 ring-dashed ring-white/50'
                    } ${
                      playerData
                        ? 'bg-gradient-to-br from-blue-500 to-blue-700 cursor-move'
                        : 'bg-white/20 backdrop-blur-sm cursor-pointer'
                    }`}
                  >
                    {/* Contenido del círculo (Avatar o ID) */}
                    {playerData ? (
                      <Avatar className="h-14 w-14 border-2 border-white">
                        <AvatarImage src={playerData.avatar} />
                        <AvatarFallback>{playerData.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <span className="text-white text-xs">{player.id}</span>
                    )}
                  </div>

                  {/* Tooltip del nombre */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap bg-black/90 text-white px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                    {player.name}
                  </div>

                  {/* Botón de eliminar */}
                  {playerData && (
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleRemovePlayer(player.id);
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

        {/* Player count */}
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