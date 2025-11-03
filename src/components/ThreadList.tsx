'use client' // <--- AÑADE ESTA LÍNEA AL PRINCIPIO

import { Thread } from '@/types'; // Asegúrate que la ruta a types sea correcta
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation'; // <--- Importa useRouter
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  const router = useRouter(); // <--- Inicializa el router aquí
  const { user } = useAuth()
  const [userLikes, setUserLikes] = useState<Set<number>>(new Set())
  const [userSaved, setUserSaved] = useState<Set<number>>(new Set())
  const [likesCount, setLikesCount] = useState<Record<number, number>>({})

  const fetchUserLikes = useCallback(async () => {
    if (!user) return

    const { data } = await supabase
      .from('thread_likes')
      .select('thread_id')
      .eq('user_id', user.id)

    if (data) {
      setUserLikes(new Set(data.map(like => like.thread_id)))
    }
  }, [user])

  const fetchUserSaved = useCallback(async () => {
    if (!user) return

    const { data } = await supabase
      .from('saved_threads')
      .select('thread_id')
      .eq('user_id', user.id)

    if (data) {
      setUserSaved(new Set(data.map(saved => saved.thread_id)))
    }
  }, [user])

  useEffect(() => {
    // Inicializar contadores de likes
    const initialCounts: Record<number, number> = {}
    threads.forEach(thread => {
      initialCounts[thread.id] = thread.likes
    })
    setLikesCount(initialCounts)

    if (user) {
      fetchUserLikes()
      fetchUserSaved()
    }
  }, [user, threads, fetchUserLikes, fetchUserSaved])

  const formatDate = (date: Date) => {
    // ... (tu función formatDate sigue igual) ...
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

  // Función interna para manejar el click en un hilo
  const handleThreadClick = async (threadId: number) => {
    // Incrementar views
    const { data: thread } = await supabase
      .from('threads')
      .select('views')
      .eq('id', threadId)
      .single()

    if (thread) {
      await supabase
        .from('threads')
        .update({ views: thread.views + 1 })
        .eq('id', threadId)
    }

    router.push(`/threads/${threadId}`)
  };

  // Función interna para manejar el click en 'Like' (Lógica pendiente)
  const handleToggleLike = async (threadId: number, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      alert('Debes iniciar sesión para dar me gusta')
      router.push('/login')
      return
    }

    const isLiked = userLikes.has(threadId)

    if (isLiked) {
      // Quitar like - actualizar estado local inmediatamente
      setUserLikes(prev => {
        const newSet = new Set(prev)
        newSet.delete(threadId)
        return newSet
      })
      
      setLikesCount(prev => ({
        ...prev,
        [threadId]: Math.max(0, (prev[threadId] || 0) - 1)
      }))

      // Eliminar de la base de datos
      const { error } = await supabase
        .from('thread_likes')
        .delete()
        .eq('thread_id', threadId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error al quitar like:', error)
        // Revertir cambios si hay error
        setUserLikes(prev => new Set(prev).add(threadId))
        setLikesCount(prev => ({
          ...prev,
          [threadId]: (prev[threadId] || 0) + 1
        }))
      }
    } else {
      // Añadir like - actualizar estado local inmediatamente
      setUserLikes(prev => new Set(prev).add(threadId))
      
      setLikesCount(prev => ({
        ...prev,
        [threadId]: (prev[threadId] || 0) + 1
      }))

      // Guardar en la base de datos
      const { error } = await supabase
        .from('thread_likes')
        .insert({ thread_id: threadId, user_id: user.id })

      if (error) {
        console.error('Error al añadir like:', error)
        // Revertir cambios si hay error
        setUserLikes(prev => {
          const newSet = new Set(prev)
          newSet.delete(threadId)
          return newSet
        })
        setLikesCount(prev => ({
          ...prev,
          [threadId]: Math.max(0, (prev[threadId] || 0) - 1)
        }))
      }
    }
  }

  const handleToggleSave = async (threadId: number, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      alert('Debes iniciar sesión para guardar hilos')
      router.push('/login')
      return
    }

    const isSaved = userSaved.has(threadId)

    if (isSaved) {
      // Quitar guardado
      setUserSaved(prev => {
        const newSet = new Set(prev)
        newSet.delete(threadId)
        return newSet
      })

      const { error } = await supabase
        .from('saved_threads')
        .delete()
        .eq('thread_id', threadId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error al quitar guardado:', error)
        setUserSaved(prev => new Set(prev).add(threadId))
      }
    } else {
      // Guardar hilo
      setUserSaved(prev => new Set(prev).add(threadId))

      const { error } = await supabase
        .from('saved_threads')
        .insert({ thread_id: threadId, user_id: user.id })

      if (error) {
        console.error('Error al guardar hilo:', error)
        setUserSaved(prev => {
          const newSet = new Set(prev)
          newSet.delete(threadId)
          return newSet
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* ... (Título "Hilos Recientes" y Badge si lo necesitas) ... */}
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-white mb-4"> {/* Ajustado color para fondo oscuro */}
           Hilos Recientes
         </h2>
         {/* Badge de conteo (opcional) */}
       </div>

      {threads.length === 0 ? (
        <Card className="p-8 text-center bg-slate-800/50 border-slate-700 shadow-lg"> {/* Estilo oscuro */}
          <p className="text-slate-400">No se encontraron hilos.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
          <Card
            key={thread.id}
            // Usamos la función interna handleThreadClick
            onClick={() => handleThreadClick(thread.id)}
            className={`p-4 transition-all duration-200 ease-in-out cursor-pointer 
                        bg-slate-800/60 border border-slate-700 shadow-md 
                        hover:bg-slate-700/80 hover:border-sky-500 hover:shadow-lg`}
          >
            <div className="space-y-3">
              {/* Header con avatar, usuario y título */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-slate-600 shrink-0">
                  <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                  <AvatarFallback className="bg-sky-700 text-white">
                    {thread.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  {/* Información del autor y fecha */}
                  <div className="flex items-center gap-2 mb-1 text-sm">
                    <span className="font-semibold text-orange-400">{thread.author}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{formatDate(thread.timestamp)}</span>
                  </div>

                  {/* Título y formación */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 font-semibold text-slate-50 text-lg">{thread.title}</h3>
                    {thread.formation?.name && (
                      <Badge variant="secondary" className="shrink-0 bg-sky-900/70 text-sky-200 border-sky-700 text-xs">
                        {thread.formation.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenido (preview) */}
              <p className="text-slate-300 line-clamp-2 text-sm pl-[52px]">{thread.content}</p>

              {/* Footer con estadísticas y like */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700 pl-[52px]">
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-1 text-xs">
                    <Eye className="h-3 w-3" />
                    <span>{thread.views}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botón Guardar */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 gap-1.5 transition-all ${
                      userSaved.has(thread.id)
                        ? 'text-blue-500 hover:text-blue-400'
                        : 'text-slate-400 hover:bg-blue-900/30 hover:text-blue-300'
                    }`}
                    onClick={(e) => handleToggleSave(thread.id, e)}
                  >
                    <Bookmark className={`h-4 w-4 ${userSaved.has(thread.id) ? 'fill-current' : ''}`} />
                  </Button>

                  {/* Botón Like */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 gap-1.5 transition-all ${
                      userLikes.has(thread.id)
                        ? 'text-pink-500 hover:text-pink-400'
                        : 'text-pink-400 hover:bg-pink-900/30 hover:text-pink-300'
                    }`}
                    onClick={(e) => handleToggleLike(thread.id, e)}
                  >
                    <Heart className={`h-4 w-4 ${userLikes.has(thread.id) ? 'fill-current' : ''}`} />
                    <span className="text-xs">{likesCount[thread.id] || 0}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          ))}
        </div>
      )}
    </div>
  );
}