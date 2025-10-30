import { Formation } from '@/types'; // Importa el tipo 'Formation'

// Define las plantillas de las formaciones
const formationTemplates: Record<string, Formation> = {
  "4-4-2": {
    name: "4-4-2",
    players: [
      { id: 1, name: "Portero", position: { x: 10, y: 50 } },
      { id: 2, name: "Defensa", position: { x: 30, y: 15 } },
      { id: 3, name: "Defensa", position: { x: 30, y: 40 } },
      { id: 4, name: "Defensa", position: { x: 30, y: 60 } },
      { id: 5, name: "Defensa", position: { x: 30, y: 85 } },
      { id: 6, name: "Mediocampo", position: { x: 55, y: 15 } },
      { id: 7, name: "Mediocampo", position: { x: 55, y: 40 } },
      { id: 8, name: "Mediocampo", position: { x: 55, y: 60 } },
      { id: 9, name: "Mediocampo", position: { x: 55, y: 85 } },
      { id: 10, name: "Delantero", position: { x: 80, y: 35 } },
      { id: 11, name: "Delantero", position: { x: 80, y: 65 } },
    ]
  },
  "4-3-3": {
    name: "4-3-3",
    players: [
      { id: 1, name: "Portero", position: { x: 10, y: 50 } },
      { id: 2, name: "Defensa", position: { x: 30, y: 15 } },
      { id: 3, name: "Defensa", position: { x: 30, y: 40 } },
      { id: 4, name: "Defensa", position: { x: 30, y: 60 } },
      { id: 5, name: "Defensa", position: { x: 30, y: 85 } },
      { id: 6, name: "Mediocampo", position: { x: 55, y: 25 } },
      { id: 7, name: "Mediocampo", position: { x: 50, y: 50 } },
      { id: 8, name: "Mediocampo", position: { x: 55, y: 75 } },
      { id: 9, name: "Delantero", position: { x: 80, y: 20 } },
      { id: 10, name: "Delantero", position: { x: 85, y: 50 } },
      { id: 11, name: "Delantero", position: { x: 80, y: 80 } },
    ]
  },
  "5-3-2": {
    name: "5-3-2",
    players: [
      { id: 1, name: "Portero", position: { x: 10, y: 50 } },
      { id: 2, name: "Defensa", position: { x: 25, y: 50 } }, // Libero
      { id: 3, name: "Defensa", position: { x: 30, y: 20 } },
      { id: 4, name: "Defensa", position: { x: 30, y: 80 } },
      { id: 5, name: "Defensa", position: { x: 40, y: 5 } },  // Carrilero
      { id: 6, name: "Defensa", position: { x: 40, y: 95 } }, // Carrilero
      { id: 7, name: "Mediocampo", position: { x: 55, y: 25 } },
      { id: 8, name: "Mediocampo", position: { x: 50, y: 50 } },
      { id: 9, name: "Mediocampo", position: { x: 55, y: 75 } },
      { id: 10, name: "Delantero", position: { x: 80, y: 35 } },
      { id: 11, name: "Delantero", position: { x: 80, y: 65 } },
    ]
  },
  // ... (Puedes añadir más formaciones aquí)
};

// Exportamos las plantillas y una lista de sus nombres
export const formationsDatabase = formationTemplates;
export const formationNames = Object.keys(formationTemplates); // ["4-4-2", "4-3-3", "5-3-2"]