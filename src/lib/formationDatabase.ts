import type { Formation } from '@/types'

export const formationsDatabase: Record<string, Formation> = {
  '3-6-1 Hexa': {
    name: '3-6-1 Hexa',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (3)
      { id: 2, name: 'Defensa', position: { x: 25, y: 75 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 50, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 75, y: 75 }, playerData: undefined },
      // Mediocampo (6 en dos líneas)
      { id: 5, name: 'Mediocampo', position: { x: 15, y: 55 }, playerData: undefined },
      { id: 6, name: 'Mediocampo', position: { x: 35, y: 55 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 65, y: 55 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 85, y: 55 }, playerData: undefined },
      { id: 9, name: 'Mediocampo', position: { x: 25, y: 35 }, playerData: undefined },
      { id: 10, name: 'Mediocampo', position: { x: 75, y: 35 }, playerData: undefined },
      // Delantero (1)
      { id: 11, name: 'Delantero', position: { x: 50, y: 20 }, playerData: undefined },
    ],
  },
  
  '5-4-1 Double Volante': {
    name: '5-4-1 Double Volante',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (5)
      { id: 2, name: 'Defensa', position: { x: 15, y: 63 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 32, y: 70 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 50, y: 73 }, playerData: undefined },
      { id: 5, name: 'Defensa', position: { x: 68, y: 70 }, playerData: undefined },
      { id: 6, name: 'Defensa', position: { x: 85, y: 63 }, playerData: undefined },
      // Mediocampo (4 en doble pivote)
      { id: 7, name: 'Mediocampo', position: { x: 25, y: 33 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 75, y: 33 }, playerData: undefined },
      { id: 9, name: 'Mediocampo', position: { x: 35, y: 50 }, playerData: undefined },
      { id: 10, name: 'Mediocampo', position: { x: 65, y: 50 }, playerData: undefined },
      // Delantero (1)
      { id: 11, name: 'Delantero', position: { x: 50, y: 15 }, playerData: undefined },
    ],
  },

  '4-3-3 Triangle': {
    name: '4-3-3 Triangle',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (4)
      { id: 2, name: 'Defensa', position: { x: 20, y: 70 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 40, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 60, y: 75 }, playerData: undefined },
      { id: 5, name: 'Defensa', position: { x: 80, y: 70 }, playerData: undefined },
      // Mediocampo (3 en triángulo con punta arriba)
      { id: 6, name: 'Mediocampo', position: { x: 30, y: 50 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 70, y: 50 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 50, y: 35 }, playerData: undefined },
      // Delanteros (3)
      { id: 9, name: 'Delantero', position: { x: 20, y: 25 }, playerData: undefined },
      { id: 10, name: 'Delantero', position: { x: 50, y: 15 }, playerData: undefined },
      { id: 11, name: 'Delantero', position: { x: 80, y: 25 }, playerData: undefined },
    ],
  },

  '4-3-3 Delta': {
    name: '4-3-3 Delta',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (4)
      { id: 2, name: 'Defensa', position: { x: 20, y: 70 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 40, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 60, y: 75 }, playerData: undefined },
      { id: 5, name: 'Defensa', position: { x: 80, y: 70 }, playerData: undefined },
      // Mediocampo (3 en delta/triángulo invertido con punta abajo)
      { id: 6, name: 'Mediocampo', position: { x: 35, y: 40 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 65, y: 40 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 50, y: 60 }, playerData: undefined },
      // Delanteros (3 en V invertida)
      { id: 9, name: 'Delantero', position: { x: 20, y: 25 }, playerData: undefined },
      { id: 10, name: 'Delantero', position: { x: 50, y: 15 }, playerData: undefined },
      { id: 11, name: 'Delantero', position: { x: 80, y: 25 }, playerData: undefined },
    ],
  },

  '4-5-1 Balanced': {
    name: '4-5-1 Balanced',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (4)
      { id: 2, name: 'Defensa', position: { x: 20, y: 70 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 40, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 60, y: 75 }, playerData: undefined },
      { id: 5, name: 'Defensa', position: { x: 80, y: 70 }, playerData: undefined },
      // Mediocampo (5 en W)
      { id: 6, name: 'Mediocampo', position: { x: 35, y: 55 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 65, y: 55 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 15, y: 40 }, playerData: undefined },
      { id: 9, name: 'Mediocampo', position: { x: 85, y: 40 }, playerData: undefined },
      { id: 10, name: 'Mediocampo', position: { x: 50, y: 30 }, playerData: undefined },
      // Delantero (1)
      { id: 11, name: 'Delantero', position: { x: 50, y: 13 }, playerData: undefined },
    ],
  },

  '4-4-2 Diamond': {
    name: '4-4-2 Diamond',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (4)
      { id: 2, name: 'Defensa', position: { x: 20, y: 70 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 40, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 60, y: 75 }, playerData: undefined },
      { id: 5, name: 'Defensa', position: { x: 80, y: 70 }, playerData: undefined },
      // Mediocampo (4 en rombo)
      { id: 6, name: 'Mediocampo', position: { x: 25, y: 50 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 75, y: 50 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 50, y: 60 }, playerData: undefined },
      { id: 9, name: 'Mediocampo', position: { x: 50, y: 35 }, playerData: undefined },
      // Delanteros (2)
      { id: 10, name: 'Delantero', position: { x: 35, y: 15 }, playerData: undefined },
      { id: 11, name: 'Delantero', position: { x: 65, y: 15 }, playerData: undefined },
    ],
  },

  '4-4-2 Box': {
    name: '4-4-2 Box',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (4)
      { id: 2, name: 'Defensa', position: { x: 20, y: 70 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 40, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 60, y: 75 }, playerData: undefined },
      { id: 5, name: 'Defensa', position: { x: 80, y: 70 }, playerData: undefined },
      // Mediocampo (4 en caja/rectángulo)
      { id: 6, name: 'Mediocampo', position: { x: 30, y: 55 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 70, y: 55 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 20, y: 30 }, playerData: undefined },
      { id: 9, name: 'Mediocampo', position: { x: 80, y:30 }, playerData: undefined },
      // Delanteros (2)
      { id: 10, name: 'Delantero', position: { x: 35, y: 15 }, playerData: undefined },
      { id: 11, name: 'Delantero', position: { x: 65, y: 15 }, playerData: undefined },
    ],
  },

  '3-5-2 Freedom': {
    name: '3-5-2 Freedom',
    players: [
      { id: 1, name: 'Portero', position: { x: 50, y: 90 }, playerData: undefined },
      // Defensa (3)
      { id: 2, name: 'Defensa', position: { x: 25, y: 75 }, playerData: undefined },
      { id: 3, name: 'Defensa', position: { x: 50, y: 75 }, playerData: undefined },
      { id: 4, name: 'Defensa', position: { x: 75, y: 75 }, playerData: undefined },
      // Mediocampo (5 con carrileros)
      { id: 5, name: 'Mediocampo', position: { x: 10, y: 35 }, playerData: undefined },
      { id: 6, name: 'Mediocampo', position: { x: 90, y: 35 }, playerData: undefined },
      { id: 7, name: 'Mediocampo', position: { x: 50, y: 25 }, playerData: undefined },
      { id: 8, name: 'Mediocampo', position: { x: 35, y: 55 }, playerData: undefined },
      { id: 9, name: 'Mediocampo', position: { x: 65, y: 55 }, playerData: undefined },
      // Delanteros (2)
      { id: 10, name: 'Delantero', position: { x: 35, y: 10 }, playerData: undefined },
      { id: 11, name: 'Delantero', position: { x: 65, y: 10 }, playerData: undefined },
    ],
  },
}

// Exportar array de nombres de formaciones ordenado
export const formationNames = Object.keys(formationsDatabase).sort()