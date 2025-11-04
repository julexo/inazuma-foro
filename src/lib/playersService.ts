import { supabase } from './supabaseClient'

export interface Player {
  id: string
  name: string
  position: string | null
  team: string[]
  element: string | null
  avatar: string
}

export async function getAllPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching players:', error)
    return []
  }

  return data || []
}

export async function getPlayersByPosition(position: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('position', position)
    .order('name')

  if (error) {
    console.error('Error fetching players:', error)
    return []
  }

  return data || []
}

export async function getPlayersByElement(element: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('element', element)
    .order('name')

  if (error) {
    console.error('Error fetching players:', error)
    return []
  }

  return data || []
}

export async function searchPlayers(query: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(50)

  if (error) {
    console.error('Error searching players:', error)
    return []
  }

  return data || []
}
