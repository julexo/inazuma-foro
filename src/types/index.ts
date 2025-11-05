// src/types/index.ts

import type { Player as DBPlayer } from '@/data/PlayerDataBase'

export interface FormationSlot {
  id: number
  name: string
  position: { x: number; y: number }
  playerData?: DBPlayer
}

export interface Formation {
  name: string
  players: FormationSlot[]
}

export interface Thread {
  id: string
  title: string
  content: string
  created_at: string
  updated_at?: string // Añadir campo opcional
  user_id: string
  formation_data?: Formation
  users?: {
    id: string
    email: string
    avatar_url?: string | null
  }
  replies?: Reply[]
}

export interface Reply {
  id: string
  thread_id: string
  content: string
  created_at: string
  user_id: string
  formation_data?: Formation
  users?: {
    id: string
    email: string
    avatar_url?: string | null
  }
}