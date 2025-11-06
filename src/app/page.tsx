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
      // Obtener threads con perfiles (username, avatar) si existen
      const { data: threadsData, error: threadsError } = await supabase
        .from('threads')
        .select(`
          id,
          created_at,
          title,
          content,
          formation_data,
          user_id,
          profiles(username, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (threadsError) {
        console.error('Error cargando hilos:', threadsError)
        setLoading(false)
        return
      }

      if (!threadsData) {
        setThreads([])
        setFilteredThreads([])
        setLoading(false)
        return
      }

      type ThreadRow = {
        id: string | number
        created_at: string
        title: string
        content: string | null
        formation_data: unknown
        user_id: string
        profiles: null | { username?: string | null; avatar_url?: string | null } | Array<{ username?: string | null; avatar_url?: string | null }>
      }

      const adaptedThreads: Thread[] = (threadsData as ThreadRow[]).map((t) => {
        const safeFormation: Formation = (t.formation_data as Formation) || {
          name: '4-4-2 (Defecto)',
          players: []
        }

        // Resolver perfíl (puede venir como objeto o array)
        let profile: { username?: string | null; avatar_url?: string | null } | null = null
        if (Array.isArray(t.profiles) && t.profiles.length > 0) profile = t.profiles[0]
        else if (t.profiles && !Array.isArray(t.profiles)) profile = t.profiles

        return {
          id: String(t.id),
          title: t.title,
          content: t.content || '',
          created_at: t.created_at,
          user_id: t.user_id,
          formation_data: safeFormation,
          users: {
            id: t.user_id,
            email: profile?.username || `Usuario #${t.user_id?.slice(0, 8)}`
          }
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

    // Filtrar por nombre de jugador (en formation_data)
    if (filters.playerName.trim()) {
      const q = filters.playerName.toLowerCase()
      filtered = filtered.filter(thread => {
        const players = thread.formation_data?.players || []
        return players.some(p => p.playerData?.name.toLowerCase().includes(q))
      })
    }

    // Filtrar por nombre de formación
    if (filters.formation && filters.formation !== 'all') {
      filtered = filtered.filter(thread => thread.formation_data?.name === filters.formation)
    }

    // Ordenar (por fecha, ya que views/likes no están en el tipo Thread)
    filtered.sort((a, b) => {
      const da = new Date(a.created_at).getTime()
      const db = new Date(b.created_at).getTime()
      // Si pidieron "popular", mantenemos el mismo criterio por fecha (no hay likes en Thread)
      return db - da
    })

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

            {/* Header visual premium para la lista de hilos */}
            <div className="flex items-center gap-3 mb-6 mt-2 px-2">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/30 via-blue-500/30 to-amber-600/30 shadow-lg animate-pulse">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="url(#grad)" />
                  <path d="M8 12h8M8 16h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <radialGradient id="grad" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0%" stopColor="#f59e42" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-400 to-white drop-shadow-lg tracking-tight animate-in fade-in slide-in-up">
                Hilos
              </h2>
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