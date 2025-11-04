'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Thread } from '@/types'
import type { Formation } from '@/types'
import Header from "@/components/Header"
import { ThreadList } from "@/components/ThreadList"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SavedThreadsPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  const fetchSavedThreads = useCallback(async () => {
    if (!user) return

    try {
      const { data: savedData, error: savedError } = await supabase
        .from('saved_threads')
        .select('thread_id')
        .eq('user_id', user.id)

      if (savedError) throw savedError

      const threadIds = savedData?.map(s => s.thread_id) || []

      if (threadIds.length === 0) {
        setThreads([])
        setLoading(false)
        return
      }

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
        .in('id', threadIds)
        .order('created_at', { ascending: false })

      if (threadsError) throw threadsError

      type Profile = { username?: string | null; avatar_url?: string | null } | null
      type Row = {
        id: string | number
        created_at: string
        title: string
        content: string | null
        formation_data: unknown
        user_id: string
        profiles: Profile | Profile[] | null
      }

      const adaptedThreads: Thread[] = (threadsData || []).map((row: Row) => {
        const formation = (row.formation_data as Formation) || { name: '4-4-2', players: [] }

        let profile: Profile = null
        if (Array.isArray(row.profiles) && row.profiles.length > 0) {
          profile = row.profiles[0]
        } else if (row.profiles && !Array.isArray(row.profiles)) {
          profile = row.profiles
        }

        return {
          id: String(row.id),
          title: row.title,
          content: row.content || '',
          created_at: row.created_at,
          user_id: row.user_id,
          formation_data: formation,
          users: {
            id: row.user_id,
            email: profile?.username || `Usuario #${row.user_id.slice(0, 8)}`
          }
        }
      })

      setThreads(adaptedThreads)
    } catch (error) {
      console.error('Error cargando hilos guardados:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchSavedThreads()
  }, [user, router, fetchSavedThreads])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
        <Header />
        <div className="flex justify-center items-center p-20">
          <Loader2 className="h-12 w-12 text-orange-400 animate-spin" />
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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Hilos Guardados</h1>
              <span className="text-sm text-slate-400">{threads.length} hilos</span>
            </div>

            {threads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No tienes hilos guardados aún</p>
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
