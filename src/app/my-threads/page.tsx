'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Thread, Formation } from '@/types'
import Header from "@/components/Header"
import { ThreadList } from "@/components/ThreadList"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function MyThreadsPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  const fetchMyThreads = useCallback(async () => {
    if (!user) return

    try {
      // Obtener hilos del usuario
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
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (threadsError) {
        console.error('Error cargando mis hilos:', threadsError)
        setLoading(false)
        return
      }

      if (!threadsData || threadsData.length === 0) {
        setThreads([])
        setLoading(false)
        return
      }

      const threadIds = threadsData.map(t => t.id)

      // Obtener conteo de likes
      const { data: likesData } = await supabase
        .from('thread_likes')
        .select('thread_id')
        .in('thread_id', threadIds)

      const likesCount: Record<number, number> = {}
      likesData?.forEach(like => {
        likesCount[like.thread_id] = (likesCount[like.thread_id] || 0) + 1
      })

      // Obtener conteo de respuestas
      const { data: repliesData } = await supabase
        .from('post')
        .select('thread_id')
        .in('thread_id', threadIds)

      const repliesCount: Record<number, number> = {}
      repliesData?.forEach(reply => {
        repliesCount[reply.thread_id] = (repliesCount[reply.thread_id] || 0) + 1
      })

      const adaptedThreads: Thread[] = threadsData.map((thread: unknown) => {
        const threadData = thread as {
          id: number
          created_at: string
          title: string
          content: string | null
          formation_data: Formation | null
          user_id: string
          views: number
          profiles: unknown
        }

        let profile = null
        if (Array.isArray(threadData.profiles) && threadData.profiles.length > 0) {
          profile = threadData.profiles[0] as { username: string; avatar_url: string | null }
        } else if (threadData.profiles && !Array.isArray(threadData.profiles)) {
          profile = threadData.profiles as { username: string; avatar_url: string | null }
        }

        return {
          id: threadData.id,
          title: threadData.title,
          content: threadData.content || '',
          author: profile?.username || 'Usuario Desconocido',
          authorAvatar: profile?.avatar_url || '/default-avatar.png',
          formation: threadData.formation_data || { name: '4-4-2', players: [] },
          timestamp: new Date(threadData.created_at),
          replies: [], // Array vacío, el conteo lo mostramos aparte
          views: threadData.views || 0,
          likes: likesCount[threadData.id] || 0,
        }
      })

      setThreads(adaptedThreads)
    } catch (error) {
      console.error('Error inesperado:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchMyThreads()
  }, [user, router, fetchMyThreads])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
        <Header />
        <div className="flex justify-center items-center p-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-orange-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Cargando tus hilos...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        <Header />

        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                  Mis Hilos
                </h1>
                <p className="text-slate-400 mt-1">
                  Todos los hilos que has creado
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <span className="text-slate-400 text-sm">Total:</span>
                <span className="text-2xl font-bold text-orange-400">{threads.length}</span>
              </div>
            </div>

            {/* Lista de hilos */}
            {threads.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 rounded-xl">
                <p className="text-slate-400 mb-4">Aún no has creado ningún hilo</p>
                <Link 
                  href="/threads/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-300"
                >
                  Crear tu primer hilo
                </Link>
              </div>
            ) : (
              <ThreadList threads={threads} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
