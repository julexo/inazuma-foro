'use client'

import { useState, useMemo, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { getPlayerAvatarUrl } from '@/data/PlayerDataBase';
import type { Player } from '@/data/PlayerDataBase';
import type { Formation } from '@/types';
import PlayerSidebar from './PlayerSidebar';
import { formationsDatabase } from '@/lib/formationDatabase';
import { Badge } from '@/components/ui/badge'; // + importar Badge

interface DragDropFormationBuilderProps {
  formation: Formation;
  onFormationChange: (formation: Formation) => void;
}

export function DragDropFormationBuilder({ formation, onFormationChange }: DragDropFormationBuilderProps) {
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fallback seguro si formation es undefined o no tiene jugadores válidos
  const safeFormation = useMemo<Formation>(() => {
    if (formation && Array.isArray(formation.players) && formation.players.length > 0) {
      return formation
    }
    const fallback =
      formationsDatabase['4-4-2 Diamond'] ||
      formationsDatabase[Object.keys(formationsDatabase)[0]]
    // Clonar para evitar mutaciones accidentales
    return JSON.parse(JSON.stringify(fallback)) as Formation
  }, [formation])

  const usedPlayerIds = useMemo(() => {
    return new Set(
      (safeFormation.players || [])
        .map(p => p.playerData?.id)
        .filter(Boolean) as string[]
    )
  }, [safeFormation])

  const validatePosition = useCallback((playerData: Player, position: number): boolean => {
    if (position === 1 && playerData.position !== 'Portero') {
      setError('Solo puedes colocar porteros en la posición 1');
      return false;
    }
    setError(null);
    return true;
  }, [])

  const handleDragStart = useCallback((player: Player) => {
    try {
      setDraggedPlayer(player);
      setError(null);
    } catch (error) {
      console.error('Error al iniciar arrastre:', error);
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, slotId: number) => {
    e.preventDefault();
    setHoveredSlot(slotId);
  }, [])

  const handleDragLeave = useCallback(() => {
    setHoveredSlot(null);
  }, [])

  // No sobrescribir el nombre del slot al asignar jugador (conserva "Portero/Defensa/Mediocampo/Delantero")
  const handleDrop = useCallback((e: React.DragEvent, slotId: number) => {
    try {
      e.preventDefault();
      if (!draggedPlayer) return;
      if (!validatePosition(draggedPlayer, slotId)) return;

      const updatedPlayers = (safeFormation.players || []).map(player =>
        player.id === slotId
          ? { ...player, playerData: draggedPlayer } // ← solo asigna el jugador
          : player
      );

      onFormationChange({ ...safeFormation, players: updatedPlayers });
      setDraggedPlayer(null);
      setHoveredSlot(null);
    } catch (error) {
      console.error('Error al colocar jugador:', error);
      setError('Error al colocar el jugador');
    }
  }, [draggedPlayer, onFormationChange, safeFormation, validatePosition])

  // Al quitar jugador, mantener el nombre del slot (no reasignar)
  const handleRemovePlayer = useCallback((slotId: number) => {
    const updatedPlayers = (safeFormation.players || []).map(player =>
      player.id === slotId
        ? { ...player, playerData: undefined } // ← no cambiar "name"
        : player
    );
    onFormationChange({ ...safeFormation, players: updatedPlayers });
  }, [onFormationChange, safeFormation])

  // Estilos del slot (sin cambios funcionales)
  const getSlotStyles = (isHovered: boolean, hasPlayer: boolean) => `
    w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full
    flex items-center justify-center 
    transition-all duration-200 select-none
    ring-offset-2 ring-offset-green-700/60
    ${isHovered ? 'ring-4 ring-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] scale-110' : ''}
    ${hasPlayer ? 'ring-2 ring-white/80 bg-white/10 shadow-lg backdrop-blur-[1px]' : 'ring-2 ring-white/60 bg-white/15 shadow-md backdrop-blur-sm'}
  `;

  return (
    <div className="space-y-4">
      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-900/40 backdrop-blur-sm border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg" role="alert">
          <div className="p-2 rounded-lg bg-red-500/20">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Mensaje informativo */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-sky-500/30 text-slate-200 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg">
        <div className="p-2 rounded-lg bg-sky-500/20">
          <Info className="h-5 w-5 text-sky-400" />
        </div>
        <p className="text-sm">
          Arrastra jugadores desde el panel lateral hacia las posiciones en el campo.
        </p>
      </div>

      {/* Nombre de la formación actual (por defecto 4-4-2 Diamond) */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-200">
          Formación actual:{' '}
          <Badge className="align-middle bg-orange-500/20 text-orange-400 border border-orange-500/30">
            {safeFormation?.name || '4-4-2 Diamond'}
          </Badge>
        </p>
      </div>

      {/* Zona sincronizada: sidebar (izquierda) y campo (derecha) con la MISMA altura */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        {/* Sidebar jugadores: empieza y termina junto al campo, con scroll propio */}
        <div className="lg:col-span-1 overflow-y-auto pr-2 h-[560px] sm:h-[600px] md:h-[660px] lg:h-[720px] xl:h-[760px]">
          <PlayerSidebar 
            onPlayerSelect={handleDragStart}
            usedPlayerIds={usedPlayerIds}
          />
        </div>

        {/* Campo de juego (sin scroll) con la misma altura */}
        <div className="lg:col-span-3">
          <div className="relative w-full h-[560px] sm:h-[600px] md:h-[660px] lg:h-[720px] xl:h-[760px] bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-xl overflow-hidden shadow-2xl border-2 border-green-800">
            {/* Marcas del campo rotadas 90° - LÍNEAS DE BANDA HASTA EL FINAL */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none transform origin-center rotate-90"
              preserveAspectRatio="none"
            >
              {/* Borde exterior del campo */}
              <rect x="0%" y="0%" width="100%" height="100%" fill="none" stroke="white" strokeWidth="2" />
              
              {/* Línea central - de banda a banda (0% a 100%) */}
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="2" />
              
              {/* Círculo central */}
              <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="50%" cy="50%" r="1%" fill="white" />
              
              {/* Área grande izquierda - hasta el borde Y */}
              <rect x="0%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="2" />
              
              {/* Área pequeña izquierda - hasta el borde Y */}
              <rect x="0%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="2" />
              
              {/* Área grande derecha - hasta el borde Y */}
              <rect x="85%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="2" />
              
              {/* Área pequeña derecha - hasta el borde Y */}
              <rect x="92%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="2" />
            </svg>

            {/* Textura del césped en franjas VERTICALES */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)',
              }}
            />

            {/* Slots de jugadores */}
            {(safeFormation.players || []).map((player) => {
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
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 will-change-transform"
                  style={{ left: `${player.position.x}%`, top: `${player.position.y}%` }}
                >
                  <div className="relative group flex flex-col items-center">
                    <div className={getSlotStyles(isHovered, !!playerData)}>
                      {playerData ? (
                        <Avatar className="h-11 w-11 sm:h-12 sm:w-12 md:h-16 md:w-16 border-2 border-white/80 shadow-lg relative overflow-hidden">
                          <AvatarImage src={getPlayerAvatarUrl(playerData.avatar)} loading="lazy" />
                          <AvatarFallback className="text-white/90 bg-slate-900/50 font-semibold">
                            {playerData.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <span className="text-white/90 text-sm sm:text-base font-semibold drop-shadow">
                          {player.id}
                        </span>
                      )}
                    </div>

                    {/* Etiqueta SIEMPRE visible con la posición del slot */}
                    <div className="mt-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-black/75 text-white text-[10px] sm:text-xs border border-white/10">
                        {player.name}
                      </span>
                    </div>

                    {/* Tooltip al pasar el ratón con el nombre del jugador (si existe) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-8 whitespace-nowrap bg-black/90 text-white px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                      {playerData ? playerData.name : 'Vacío'}
                    </div>

                    {/* Botón eliminar jugador */}
                    {playerData && (
                      <Button
                        size="icon"
                        variant="destructive"
                        aria-label="Quitar jugador"
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
        </div>
      </div>

      {/* Contador de jugadores */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-700/50">
              <Info className="h-5 w-5 text-slate-400" />
            </div>
            <span className="text-slate-300 text-sm">
              Jugadores asignados:{' '}
              <span className="font-semibold text-white">
                {(safeFormation.players || []).filter(p => p.playerData).length} / 11
              </span>
            </span>
          </div>
          {(safeFormation.players || []).filter(p => p.playerData).length === 11 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">Alineación completa</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}