'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Thread, Formation } from '@/types'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { EditThreadDialog } from '@/components/EditThreadDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MyThreadsPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [editingThread, setEditingThread] = useState<Thread | null>(null)
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login?redirectTo=/my-threads')
      } else {
        setUser(user)
      }
    }
    checkUser()
  }, [router])

  const loadMyThreads = useCallback(async () => {
    if (!user) return
    
    console.log('Cargando hilos del usuario:', user.id)
    setLoading(true)

    type ThreadRow = {
      id: string
      title: string
      content: string | null
      created_at: string
      user_id: string
      formation_data?: Formation | null
      profiles: { username?: string | null; avatar_url?: string | null } | { username?: string | null; avatar_url?: string | null }[] | null
    }

    const userId = user.id

    const { data: threadsData, error } = await supabase
      .from('threads')
      .select(`
        id,
        title,
        content,
        created_at,
        user_id,
        formation_data,
        profiles (
          username,
          avatar_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    console.log('Threads cargados:', { count: threadsData?.length, error })

    if (error) {
      console.error('Error loading threads:', error)
      setLoading(false)
      return
    }

    const adaptedThreads: Thread[] = (threadsData || []).map((row: ThreadRow) => {
      let profile: { username?: string | null; avatar_url?: string | null } | null = null
      if (Array.isArray(row.profiles) && row.profiles.length > 0) profile = row.profiles[0]
      else if (row.profiles && !Array.isArray(row.profiles)) profile = row.profiles

      return {
        id: row.id,
        title: row.title,
        content: row.content || '',
        created_at: row.created_at,
        user_id: row.user_id,
        formation_data: row.formation_data || undefined,
        users: {
          id: row.user_id,
          email: profile?.username || `Usuario #${row.user_id.slice(0, 8)}`,
          avatar_url: profile?.avatar_url || null
        }
      }
    })

    setThreads(adaptedThreads)
    setLoading(false)
  }, [user])

  useEffect(() => {
    loadMyThreads()
  }, [loadMyThreads])

  const handleEditSuccess = async () => {
    console.log('handleEditSuccess llamado, recargando hilos...')
    setEditingThread(null) // Cerrar modal inmediatamente
    await loadMyThreads() // Recargar lista
    router.refresh() // Forzar refresh de Next.js
  }

  const handleDelete = async (threadId: string) => {
    console.log('Eliminando thread:', threadId)
    
    const { error } = await supabase
      .from('threads')
      .delete()
      .eq('id', threadId)

    if (error) {
      console.error('Error al eliminar:', error)
      alert('Error al eliminar: ' + error.message)
      return
    }

    console.log('Thread eliminado exitosamente')
    setDeletingThreadId(null)
    await loadMyThreads()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-400" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700/50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Mis Alineaciones
            </h1>
          </div>
          <Link href="/threads/new">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Alineación
            </Button>
          </Link>
        </div>

        {/* Lista de threads */}
        {threads.length === 0 ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-slate-200">No tienes alineaciones</CardTitle>
              <CardDescription className="text-slate-400">
                Crea tu primera alineación para compartir con la comunidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/threads/new">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Crear mi primera alineación
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <Card key={thread.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-700/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Link href={`/threads/${thread.id}`}>
                        <CardTitle className="text-slate-200 hover:text-orange-400 transition-colors cursor-pointer">
                          {thread.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="text-slate-400 mt-2 line-clamp-2">
                        {thread.content.substring(0, 150)}
                        {thread.content.length > 150 ? '...' : ''}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingThread(thread)}
                        className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setDeletingThreadId(thread.id)}
                        className="bg-red-900/50 border-red-700 text-red-200 hover:bg-red-800/50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                    <span>
                      {new Date(thread.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    {thread.formation_data && (
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded">
                        {thread.formation_data.name}
                      </span>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog de edición */}
      <EditThreadDialog
        thread={editingThread}
        open={!!editingThread}
        onClose={() => {
          console.log('Cerrando diálogo de edición')
          setEditingThread(null)
        }}
        onSuccess={handleEditSuccess}
      />

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={!!deletingThreadId} onOpenChange={() => setDeletingThreadId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">¿Eliminar esta alineación?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Esta acción no se puede deshacer. El hilo y todas sus respuestas serán eliminados permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingThreadId && handleDelete(deletingThreadId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
