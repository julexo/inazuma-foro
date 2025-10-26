// src/components/FormationField.tsx

// Importamos el tipo Formation de tu carpeta de tipos
import { Formation } from '@/types'; 
// Asegúrate de que todas las dependencias (svg, Tailwind) funcionen

interface FormationFieldProps {
  formation: Formation; // Recibe el objeto Formation
  interactive?: boolean; // Controla si los jugadores se pueden mover
}

export function FormationField({ formation, interactive = false }: FormationFieldProps) {
  // ... (todo el código que me diste para dibujar la cancha y los jugadores) ...
  return (
    <div className="relative w-full aspect-[3/2] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden">
      {/* ... Código SVG de la cancha ... */}

      {/* Players */}
      {formation.players.map((player) => (
        <div
          key={player.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
            interactive ? 'cursor-move' : ''
          }`}
          style={{
            left: `${player.position.x}%`,
            top: `${player.position.y}%`,
          }}
        >
          <div className="relative group">
            {/* Círculo del jugador con ID */}
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-sky-400/50">
              {/* Muestra el nombre real del jugador si está asignado, si no, el ID */}
              <span className="text-white text-xs">
                {player.playerData ? player.playerData.name.slice(0, 1) : player.id}
              </span> 
            </div>
            
            {/* Tooltip con el nombre completo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap bg-gradient-to-r from-sky-600 to-blue-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {player.playerData ? player.playerData.name : player.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}