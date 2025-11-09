'use client'

import { useState, useMemo, useCallback, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trash2, Info } from 'lucide-react';
import { getPlayerAvatarUrl } from '@/data/PlayerDataBase';
import type { Player } from '@/data/PlayerDataBase';
import type { Formation } from '@/types';
import PlayerSidebar from './PlayerSidebar';
import { formationsDatabase } from '@/lib/formationDatabase';
import { Badge } from '@/components/ui/badge';

// ✅ 1. Importar el hook y el Sheet
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface DragDropFormationBuilderProps {
  formation: Formation;
  onFormationChange: (formation: Formation) => void;
}

// ✅ 2. Definir el breakpoint de Tailwind (lg = 1024px)
const MOBILE_BREAKPOINT = '(max-width: 1023px)';

export function DragDropFormationBuilder({ formation, onFormationChange }: DragDropFormationBuilderProps) {
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // ✅ 3. Lógica para móvil
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSlotId, setActiveSlotId] = useState<number | null>(null); // Slot que se tocó

  // --- Lógica de Estado (sin cambios) ---
  const safeFormation = useMemo<Formation>(() => {
    if (formation && Array.isArray(formation.players) && formation.players.length > 0) {
      return formation
    }
    const fallback =
      formationsDatabase['4-4-2 Diamond'] ||
      formationsDatabase[Object.keys(formationsDatabase)[0]]
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

  // --- Lógica de ESCRITORIO (Drag & Drop) ---
  const handleDragStart = useCallback((player: Player) => {
    if (isMobile) return; // No se ejecuta en móvil
    try {
      setDraggedPlayer(player);
      setError(null);
    } catch (error) {
      console.error('Error al iniciar arrastre:', error);
    }
  }, [isMobile])

  const handleDragOver = useCallback((e: React.DragEvent, slotId: number) => {
    if (isMobile) return;
    e.preventDefault();
    setHoveredSlot(slotId);
  }, [isMobile])

  const handleDragLeave = useCallback(() => {
    if (isMobile) return;
    setHoveredSlot(null);
  }, [isMobile])

  const handleDrop = useCallback((e: React.DragEvent, slotId: number) => {
    if (isMobile) return;
    try {
      e.preventDefault();
      if (!draggedPlayer) return;
      if (!validatePosition(draggedPlayer, slotId)) return;

      startTransition(() => {
        const updatedPlayers = (safeFormation.players || []).map(player =>
          player.id === slotId
            ? { ...player, playerData: draggedPlayer }
            : player
        );
        onFormationChange({ ...safeFormation, players: updatedPlayers });
      });
      setDraggedPlayer(null);
      setHoveredSlot(null);
    } catch (error) {
      console.error('Error al colocar jugador:', error);
      setError('Error al colocar el jugador');
    }
  }, [isMobile, draggedPlayer, onFormationChange, safeFormation, validatePosition, startTransition])


  // --- Lógica de MÓVIL (Tap & Select) ---

  // ✅ 4. Se llama al TOCAR un slot en el campo (móvil)
  const handleSlotClick = (slotId: number) => {
    if (!isMobile) return; // Solo en móvil

    const currentSlot = safeFormation.players.find(p => p.id === slotId);

    // Si el slot ya tiene un jugador, lo quitamos
    if (currentSlot && currentSlot.playerData) {
      handleRemovePlayer(slotId);
    } else {
      // Si el slot está vacío, abrimos el panel de selección
      setActiveSlotId(slotId);
      setIsSheetOpen(true);
    }
  }

  // ✅ 5. Se llama al SELECCIONAR un jugador del panel (móvil)
  const handlePlayerSelectFromSheet = (player: Player) => {
    if (!isMobile || !activeSlotId) return;

    if (!validatePosition(player, activeSlotId)) return;

    startTransition(() => {
      const updatedPlayers = (safeFormation.players || []).map(p =>
        p.id === activeSlotId
          ? { ...p, playerData: player }
          : p
      );
      onFormationChange({ ...safeFormation, players: updatedPlayers });
    });

    setIsSheetOpen(false); // Cierra el panel
    setActiveSlotId(null);
  }

  // --- Lógica Común (Eliminar jugador) ---
  const handleRemovePlayer = useCallback((slotId: number) => {
    startTransition(() => {
      const updatedPlayers = (safeFormation.players || []).map(player =>
        player.id === slotId
          ? { ...player, playerData: undefined }
          : player
      );
      onFormationChange({ ...safeFormation, players: updatedPlayers });
    });
  }, [onFormationChange, safeFormation, startTransition])

  // --- Estilos de Slot (Modificado para móvil) ---
  const getSlotStyles = (isHovered: boolean, hasPlayer: boolean) => `
    w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full
    flex items-center justify-center 
    transition-all duration-200 select-none
    ring-offset-2 ring-offset-green-700/60
    ${isHovered ? 'ring-4 ring-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] scale-110' : ''}
    ${hasPlayer ? 'ring-2 ring-white/80 bg-white/10 shadow-lg backdrop-blur-[1px]' : 'ring-2 ring-white/60 bg-white/15 shadow-md backdrop-blur-sm'}
    ${isMobile && !hasPlayer ? 'ring-dashed ring-white/60' : ''} 
    ${isMobile ? 'cursor-pointer active:scale-110' : ''} 
  `;

  return (
    <div className="space-y-4">
      {/* ... (Mensajes de error e info) ... */}
      {error && (<div /* ... */ >{error}</div>)}

      <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl flex items-center gap-3 p-4 shadow-lg shadow-orange-900/10 backdrop-blur-sm bg-gradient-to-b from-slate-800/50 to-slate-800/20">
        <div className="flex-shrink-0 p-2 rounded-full bg-orange-500/20">
          <Info className="h-5 w-5 text-orange-400" />
        </div>
        <p className="text-sm text-orange-200 font-medium">
          {isMobile
            ? 'Toca un espacio para fichar. Toca un jugador para quitar.'
            : '¡Arrastra jugadores al campo y crea tu equipo!'
          }
        </p>
      </div>

      {/* ... (Nombre de la formación) ... */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-200">
          Formación actual:{' '}
          <Badge className="align-middle bg-orange-500/20 text-orange-400 border border-orange-500/30">
            {safeFormation?.name || '4-4-2 Diamond'}
          </Badge>
        </p>
      </div>

      {/* ✅ 7. Layout Modificado (Sidebar de Escritorio + Campo) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">

        {/* Sidebar jugadores (SOLO ESCRITORIO) */}
        <div className="hidden lg:block lg:col-span-1 overflow-y-auto pr-2 h-[560px] sm:h-[600px] md:h-[660px] lg:h-[720px] xl:h-[760px]">
          <PlayerSidebar
            onPlayerSelect={handleDragStart} // Llama al handler de DRAG
            usedPlayerIds={usedPlayerIds}
          />
        </div>

        {/* Campo de juego (MÓVIL Y ESCRITORIO) */}
        <div className="lg:col-span-3">
          <div className={`relative w-full h-[560px] sm:h-[600px] md:h-[660px] lg:h-[720px] xl:h-[760px] bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-xl overflow-hidden shadow-2xl border-2 border-green-800 transition-opacity ${isPending ? 'opacity-70' : 'opacity-100'}`}>
            {/* ... (SVG del campo y textura) ... */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none transform origin-center rotate-90"
              preserveAspectRatio="none"
            >
              <rect x="0%" y="0%" width="100%" height="100%" fill="none" stroke="white" strokeWidth="2" />
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="2" />
              <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="50%" cy="50%" r="1%" fill="white" />
              <rect x="0%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="2" />
              <rect x="0%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="2" />
              <rect x="85%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="2" />
              <rect x="92%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="2" />
            </svg>
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)',
              }}
            />

            {/* Slots de jugadores (Con onClick para móvil) */}
            {(safeFormation.players || []).map((player) => {
              const playerData = player.playerData;
              const isHovered = !isMobile && hoveredSlot === player.id; // Hover solo en escritorio

              return (
                <div
                  key={player.id}
                  draggable={!isMobile && !!playerData} // Drag solo en escritorio
                  onDragStart={(e: React.DragEvent) => {
                    if (isMobile || !playerData) return;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('playerId', player.id.toString());
                  }}
                  onDragOver={(e) => handleDragOver(e, player.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, player.id)}
                  onClick={() => handleSlotClick(player.id)} // ✅ CLICK para móvil
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

                    <div className="mt-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-black/75 text-white text-[10px] sm:text-xs border border-white/10">
                        {player.name}
                      </span>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-8 whitespace-nowrap bg-black/90 text-white px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                      {playerData ? playerData.name : 'Vacío'}
                    </div>

                    {playerData && (
                      <Button
                        size="icon"
                        variant="destructive"
                        aria-label="Quitar jugador"
                        // ✅ Botón de eliminar visible en móvil
                        className={`absolute -top-2 -right-2 h-6 w-6 rounded-full transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation(); // Previene que el clic active el handleSlotClick
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

      {/* ... (Contador de jugadores) ... */}
      <div className="bg-slate-800/50 ...">
        {/* ... */}
      </div>

      {/* ✅ 8. Sheet (Panel) para Móvil */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[80vh] flex flex-col bg-slate-900 border-slate-700">
          <SheetHeader className="p-4 border-b border-slate-700">
            <SheetTitle className="text-center text-orange-400">
              Seleccionar Jugador (Pos. {activeSlotId})
            </SheetTitle>
          </SheetHeader>
          {/* El Sidebar va dentro de un div con scroll */}
          <div className="flex-1 overflow-y-auto">
            <PlayerSidebar
              onPlayerSelect={handlePlayerSelectFromSheet} // Llama al handler de SELECT
              usedPlayerIds={usedPlayerIds}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}