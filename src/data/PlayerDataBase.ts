import { supabase } from '@/lib/supabaseClient'

export interface Player {
  id: string
  name: string
  position: string
  team: string[]
  element: string
  avatar: string
}

// Cache en memoria
let playersCache: Player[] | null = null
let cacheTimestamp: number | null = null
const CACHE_DURATION = 5 * 60 * 1000

/**
 * Obtener todos los jugadores desde Supabase
 */
export async function getAllPlayers(): Promise<Player[]> {
  // Si hay cache válido, devolverlo
  if (playersCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    console.log('Usando cache, jugadores:', playersCache.length)
    return playersCache
  }

  try {
    // Cargar TODOS los jugadores sin límite
    let allPlayers: Player[] = []
    let from = 0
    const batchSize = 1000
    let hasMore = true

    while (hasMore) {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('name')
        .range(from, from + batchSize - 1)

      if (error) {
        console.error('Error fetching players:', error)
        break
      }

      if (data && data.length > 0) {
        allPlayers = [...allPlayers, ...data]
        from += batchSize
        hasMore = data.length === batchSize
      } else {
        hasMore = false
      }
    }

    console.log('Jugadores cargados desde Supabase:', allPlayers.length)
    // Actualizar cache
    playersCache = allPlayers
    cacheTimestamp = Date.now()

    return playersCache
  } catch (error) {
    console.error('Error loading players:', error)
    return playersCache || []
  }
}

/**
 * Buscar jugadores por nombre
 */
export async function searchPlayersByName(query: string): Promise<Player[]> {
  if (!query.trim()) {
    return getAllPlayers()
  }

  try {
    // Buscar sin límite usando paginación
    let allResults: Player[] = []
    let from = 0
    const batchSize = 1000
    let hasMore = true

    while (hasMore) {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('name')
        .range(from, from + batchSize - 1)

      if (error) {
        console.error('Error searching players:', error)
        break
      }

      if (data && data.length > 0) {
        allResults = [...allResults, ...data]
        from += batchSize
        hasMore = data.length === batchSize
      } else {
        hasMore = false
      }
    }

    console.log(`Búsqueda "${query}":`, allResults.length, 'resultados')
    return allResults
  } catch (error) {
    console.error('Error searching players:', error)
    return []
  }
}

/**
 * Obtener jugadores por posición
 */
export async function getPlayersByPosition(position: string): Promise<Player[]> {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('position', position)
      .order('name')

    if (error) {
      console.error('Error fetching players by position:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching players by position:', error)
    return []
  }
}

/**
 * Obtener jugadores por elemento
 */
export async function getPlayersByElement(element: string): Promise<Player[]> {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('element', element)
      .order('name')

    if (error) {
      console.error('Error fetching players by element:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching players by element:', error)
    return []
  }
}

/**
 * Obtener jugadores por equipo
 */
export async function getPlayersByTeam(team: string): Promise<Player[]> {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .contains('team', [team])
      .order('name')

    if (error) {
      console.error('Error fetching players by team:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching players by team:', error)
    return []
  }
}

/**
 * Obtener un jugador por ID
 */
export async function getPlayerById(id: string): Promise<Player | null> {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching player by id:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching player by id:', error)
    return null
  }
}

/**
 * Obtener URL del avatar del jugador
 */
export function getPlayerAvatarUrl(avatar: string): string {
  // Si el avatar ya es una URL completa, devolverla
  if (avatar.startsWith('http')) {
    return avatar
  }

  // Construir URL del bucket de Supabase con WebP
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  // Remover extensión si existe y añadir .webp
  const cleanAvatar = avatar.replace(/\.(png|jpg|jpeg|webp)$/i, '')
  
  return `${supabaseUrl}/storage/v1/object/public/player-avatars/${cleanAvatar}.webp`
}

/**
 * Invalidar cache (útil después de actualizar jugadores)
 */
export function invalidatePlayersCache(): void {
  playersCache = null
  cacheTimestamp = null
}
