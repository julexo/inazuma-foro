// src/components/ThreadList.tsx
'use client'

import { Thread } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Bookmark, Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  const router = useRouter();
  const { user } = useAuth()
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set())
  const [userSaved, setUserSaved] = useState<Set<string>>(new Set())
  const [likesCount, setLikesCount] = useState<Record<string, number>>({})
  const [isPending, startTransition] = useTransition();

  // Este useEffect carga tanto los "Me Gusta" personales como el recuento total
  useEffect(() => {
    if (threads.length === 0) return;

    const initialCounts: Record<string, number> = {}
    threads.forEach(thread => { initialCounts[String(thread.id)] = 0 })
    
    const fetchData = async () => {
      try {
        const [likesRes, savedRes, countsRes] = await Promise.all([
          user ? supabase.from('thread_likes').select('thread_id').eq('user_id', user.id) : Promise.resolve({ data: [] }),
          user ? supabase.from('saved_threads').select('thread_id').eq('user_id', user.id) : Promise.resolve({ data: [] }),
          supabase.rpc('get_like_counts')
        ]);

        // Normaliza los IDs a string
        if (likesRes.data) {
          setUserLikes(new Set(likesRes.data.map(like => String(like.thread_id))))
          console.log('Tus likes:', likesRes.data)
        }
        
        // Procesa tus "Guardados" (con la política SELECT corregida)
        if (savedRes.data) {
          setUserSaved(new Set(savedRes.data.map(saved => String(saved.thread_id))))
        }

        // Procesa el recuento total (esto ya funcionaba)
        if (countsRes.data) {
          const countsMap = { ...initialCounts };
          for (const row of countsRes.data as { thread_id_text: string | number, total_likes: number }[]) {
            const idStr = String(row.thread_id_text)
            if (countsMap.hasOwnProperty(idStr)) {
              countsMap[idStr] = row.total_likes;
            }
          }
          setLikesCount(countsMap);
        } else {
          setLikesCount(initialCounts);
        }

      } catch (error) {
        console.error("Error fetching user data or counts:", error)
        setLikesCount(initialCounts);
      }
    }
    
    fetchData()
  }, [user, threads])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return `Ahora`;
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  const handleThreadClick = (threadId: string) => {
    router.push(`/threads/${threadId}`)
  };

  // Esta función es correcta (incluye e.preventDefault())
  const handleToggleLike = async (threadId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    
    if (!user) {
      router.push('/login')
      return
    }

    const idStr = String(threadId)
    const isLiked = userLikes.has(idStr)

    if (isLiked) {
      startTransition(() => {
        setUserLikes(prev => {
          const newSet = new Set(prev)
          newSet.delete(idStr)
          return newSet
        })
        setLikesCount(prev => ({
          ...prev,
          [idStr]: Math.max(0, (prev[idStr] || 0) - 1)
        }))
      })

      const { error } = await supabase
        .from('thread_likes')
        .delete()
        .eq('thread_id', threadId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error al quitar like:', error)
        startTransition(() => {
          setUserLikes(prev => new Set(prev).add(idStr))
          setLikesCount(prev => ({
            ...prev,
            [idStr]: (prev[idStr] || 0) + 1
          }))
        })
      }
    } else {
      startTransition(() => {
        setUserLikes(prev => new Set(prev).add(idStr))
        setLikesCount(prev => ({
          ...prev,
          [idStr]: (prev[idStr] || 0) + 1
        }))
      })

      const { error } = await supabase
        .from('thread_likes')
        .insert({ thread_id: threadId, user_id: user.id })

      if (error) {
        console.error('Error al añadir like:', error)
        startTransition(() => {
          setUserLikes(prev => {
            const newSet = new Set(prev)
            newSet.delete(idStr)
            return newSet
          })
          setLikesCount(prev => ({
            ...prev,
            [idStr]: Math.max(0, (prev[idStr] || 0) - 1)
          }))
        })
      }
    }
  }

  // Esta función es correcta (incluye e.preventDefault())
  const handleToggleSave = async (threadId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    
    if (!user) {
      router.push('/login')
      return
    }

    const idStr = String(threadId)
    const isSaved = userSaved.has(idStr)

    if (isSaved) {
      startTransition(() => {
        setUserSaved(prev => {
          const newSet = new Set(prev)
          newSet.delete(idStr)
          return newSet
        })
      })

      const { error } = await supabase
        .from('saved_threads')
        .delete()
        .eq('thread_id', threadId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error al quitar guardado:', error)
        startTransition(() => {
          setUserSaved(prev => new Set(prev).add(idStr))
        })
      }
    } else {
      startTransition(() => {
        setUserSaved(prev => new Set(prev).add(idStr))
      })

      const { error } = await supabase
        .from('saved_threads')
        .insert({ thread_id: threadId, user_id: user.id })

      if (error) {
        console.error('Error al guardar hilo:', error)
        startTransition(() => {
          setUserSaved(prev => {
            const newSet = new Set(prev)
            newSet.delete(idStr)
            return newSet
          })
        })
      }
    }
  }

  const wasEdited = (thread: Thread) => {
    if (!thread.updated_at) return false
    const created = new Date(thread.created_at).getTime()
    const updated = new Date(thread.updated_at).getTime()
    return updated - created > 60000 
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white mb-4">
        </h2>
      </div>

      {threads.length === 0 ? (
        <Card className="p-8 text-center bg-slate-800/50 border-slate-700 shadow-lg">
          <p className="text-slate-400">No se encontraron hilos.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => {
            const idStr = String(thread.id)
            return (
              <Link key={thread.id} href={`/threads/${thread.id}`}>
                <Card
                  onClick={() => handleThreadClick(thread.id)}
                  className="p-4 transition-all duration-200 ease-in-out cursor-pointer bg-slate-800/60 border border-slate-700 shadow-md hover:bg-slate-700/80 hover:border-sky-500 hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border-2 border-slate-600 shrink-0">
                        <AvatarImage src={(thread.users as { id: string; email: string; avatar_url?: string } | undefined)?.avatar_url || ''} alt={thread.users?.email || 'User'} />
                        <AvatarFallback className="bg-sky-700 text-white">
                          {thread.users?.email?.slice(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 text-sm">
                          <span className="font-semibold text-orange-400">{thread.users?.email || 'Usuario'}</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-400">{formatDate(thread.created_at)}</span>
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <h3 className="line-clamp-2 font-semibold text-slate-50 text-lg">{thread.title}</h3>
                          {thread.formation_data?.name && (
                            <Badge variant="secondary" className="shrink-0 bg-sky-900/70 text-sky-200 border-sky-700 text-xs">
                              {thread.formation_data.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 line-clamp-2 text-sm pl-[52px]">{thread.content}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-700 pl-[52px]">
                      <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-1 text-xs">
                          <Eye className="h-3 w-3" />
                          <span>0</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isPending}
                          className={`h-7 gap-1.5 transition-all ${
                            userSaved.has(idStr)
                              ? 'text-blue-500 hover:text-blue-400'
                              : 'text-slate-400 hover:bg-blue-900/30 hover:text-blue-300'
                          }`}
                          onClick={(e) => handleToggleSave(idStr, e)}
                        >
                          <Bookmark className={`h-4 w-4 ${userSaved.has(idStr) ? 'fill-current' : ''}`} />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isPending}
                          className={`h-7 gap-1.5 transition-all ${
                            userLikes.has(idStr)
                              ? 'text-pink-500 hover:text-pink-400'
                              : 'text-pink-400 hover:bg-pink-900/30 hover:text-pink-300'
                          }`}
                          onClick={(e) => handleToggleLike(idStr, e)}
                        >
                          <Heart className={`h-4 w-4 ${userLikes.has(idStr) ? 'fill-current' : ''}`} />
                          <span className="text-xs">{likesCount[thread.id] || 0}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-xs mt-2">
                      <span>{new Date(thread.created_at).toLocaleDateString('es-ES')}</span>
                      {wasEdited(thread) && (
                        <>
                          <Edit3 className="h-3 w-3 text-blue-400" />
                          <span className="text-blue-400">editado</span>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}