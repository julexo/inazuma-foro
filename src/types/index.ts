// src/types/index.ts

// Del archivo PlayerDatabase.ts
export interface PlayerData {
  id: string;
  name: string;
  position: 'Portero' | 'Defensa' | 'Mediocampo' | 'Delantero';
  team: string;
  element: 'Fuego' | 'Viento' | 'Bosque' | 'Montaña';
  avatar: string;
}

// Del archivo App.tsx
export interface Player {
  id: number; // Este es el ID de la POSICIÓN (1-11)
  name: string; // Nombre por defecto (ej: "Defensa") o nombre del jugador
  position: { x: number; y: number }; // Posición en % (ej: 50, 50)
  playerData?: PlayerData; // Los datos reales del jugador (opcional)
}

export interface Formation {
  name: string; // Ej: "4-4-2"
  players: Player[];
}

export interface Reply {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  formation?: Formation;
}

export interface Thread {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  content: string;
  formation: Formation;
  timestamp: Date;
  replies: Reply[];
  views: number;
  likes: number;
}