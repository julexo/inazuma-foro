import { Formation } from '@/types'; // Importa los tipos
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Importa los componentes de Avatar

interface FormationFieldProps {
  formation: Formation;
  interactive?: boolean;
}

export function FormationField({ formation, interactive = false }: FormationFieldProps) {
  return (
    <div className="relative w-full aspect-[3/2] bg-gradient-to-b from-green-600 to-green-700 rounded-lg overflow-hidden">
      {/* Field lines (Líneas del campo) */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        {/* Outer border */}
        <rect x="2%" y="2%" width="96%" height="96%" fill="none" stroke="white" strokeWidth="2" />
        {/* Center line */}
        <line x1="50%" y1="2%" x2="50%" y2="98%" stroke="white" strokeWidth="2" />
        {/* Center circle */}
        <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="1%" fill="white" />
        {/* Left penalty area */}
        <rect x="2%" y="30%" width="15%" height="40%" fill="none" stroke="white" strokeWidth="2" />
        <rect x="2%" y="42%" width="8%" height="16%" fill="none" stroke="white" strokeWidth="2" />
        {/* Right penalty area */}
        <rect x="83%" y="30%" width="15%" height="40%" fill="none" stroke="white" strokeWidth="2" />
        <rect x="90%" y="42%" width="8%" height="16%" fill="none" stroke="white" strokeWidth="2" />
      </svg>

      {/* Players (Jugadores) */}
      {formation.players.map((player) => {
        // Obtenemos los datos del jugador (avatar, nombre real) si existen
        const playerData = player.playerData;

        return (
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
              {/* 👇 --- AQUÍ ESTÁ EL CAMBIO --- 👇
                Hacemos el círculo un poco más grande (w-12 h-12) para que quepa el avatar.
              */}
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all 
                  ${playerData 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700 ring-2 ring-white' // Estilo si hay jugador
                    : 'bg-black/20 border-2 border-dashed border-white/50' // Estilo si no hay jugador
                  }`}
              >
                {playerData ? (
                  // Si hay datos del jugador, muestra su Avatar
                  <Avatar className="h-10 w-10 border-2 border-white/50">
                    <AvatarImage src={playerData.avatar} alt={playerData.name} />
                    <AvatarFallback>{playerData.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                ) : (
                  // Si no (fallback), muestra el ID de la posición
                  <span className="text-white text-sm font-bold">{player.id}</span>
                )}
              </div>
              
              {/* Player name tooltip (Muestra el nombre real o el por defecto) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                {playerData ? playerData.name : player.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}