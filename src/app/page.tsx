// src/app/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Thread, Formation } from '@/types'
import Header from "@/components/Header"
import { ThreadList } from "@/components/ThreadList"
import FilterBox from "@/components/FilterBox"

export default function HomePage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchThreads()
  }, [])

  async function fetchThreads() {
    try {
      // Obtener threads
      const { data: threadsData, error: threadsError } = await supabase
        .from('threads')
        .select(`
          id,
          created_at,
          title,
          content,
          formation_data,
          user_id,
          views,
          profiles(username, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (threadsError) {
        console.error('Error cargando hilos:', threadsError)
        setLoading(false)
        return
      }

      if (!threadsData) {
        console.log('No hay datos de hilos')
        setThreads([])
        setFilteredThreads([])
        setLoading(false)
        return
      }

      // Obtener conteo de likes para cada thread
      const threadIds = threadsData.map(t => t.id)
      
      const { data: likesData, error: likesError } = await supabase
        .from('thread_likes')
        .select('thread_id')
        .in('thread_id', threadIds)

      if (likesError) {
        console.warn('Error cargando likes:', likesError)
      }

      // Contar likes por thread
      const likesCount: Record<number, number> = {}
      likesData?.forEach(like => {
        likesCount[like.thread_id] = (likesCount[like.thread_id] || 0) + 1
      })

      const adaptedThreads: Thread[] = threadsData.map((thread: unknown) => {
        const threadData = thread as {
          id: number
          created_at: string
          title: string
          content: string | null
          formation_data: unknown
          user_id: string
          views: number
          profiles: unknown
        }

        const safeFormation: Formation = (threadData.formation_data as Formation) || {
          name: '4-4-2 (Defecto)',
          players: []
        }
        
        // Probar diferentes estructuras
        let profile = null
        
        if (Array.isArray(threadData.profiles) && threadData.profiles.length > 0) {
          profile = threadData.profiles[0]
        } else if (threadData.profiles && !Array.isArray(threadData.profiles)) {
          profile = threadData.profiles
        }

        return {
          id: threadData.id,
          title: threadData.title,
          content: threadData.content || '',
          author: profile?.username || `Usuario #${threadData.user_id?.slice(0, 8)}` || 'Usuario Desconocido',
          authorAvatar: profile?.avatar_url || '/default-avatar.png',
          formation: safeFormation,
          timestamp: new Date(threadData.created_at),
          replies: [],
          views: threadData.views || 0,
          likes: likesCount[threadData.id] || 0,
        }
      })

      setThreads(adaptedThreads)
      setFilteredThreads(adaptedThreads)
    } catch (error) {
      console.error('Error inesperado:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: { playerName: string; formation: string; sortBy: string }) => {
    let filtered = [...threads]

    // Filtrar por nombre de jugador
    if (filters.playerName.trim()) {
      filtered = filtered.filter(thread => {
        if (!thread.formation || !thread.formation.players) return false
        return thread.formation.players.some(player => 
          player.playerData?.name.toLowerCase().includes(filters.playerName.toLowerCase())
        )
      })
    }

    // Filtrar por formación
    if (filters.formation && filters.formation !== 'all') {
      filtered = filtered.filter(thread => 
        thread.formation?.name === filters.formation
      )
    }

    // Ordenar (usando filters.sortBy directamente)
    if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views)
    } else {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }

    setFilteredThreads(filtered)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
      <div className="relative">
        {/* Efecto de brillo en el fondo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        
        <Header />

        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
          {/* Contenedor principal con efecto glassmorphism */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl p-6 space-y-6">
            {/* Sección de filtros con contador */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <FilterBox 
                onFilterChange={handleFilterChange} 
                resultsCount={filteredThreads.length}
              />
            </div>

            {/* Lista de hilos */}
            <div className="relative">
              {/* Efecto de brillo superior */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-orange-500/20 blur-2xl" />
              
              {loading ? (
                <div className="text-center py-12 text-slate-300">Cargando hilos...</div>
              ) : (
                <ThreadList threads={filteredThreads} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}