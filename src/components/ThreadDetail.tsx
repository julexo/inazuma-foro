'use client'

import { Thread, Reply } from '@/types'
import type { Formation } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageSquare, Plus, X, Layout, Loader2 } from 'lucide-react'
// ✅ 1. Importa useTransition
import { useState, useEffect, useMemo, useTransition } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { DragDropFormationBuilder } from './builder/DragDropFormationBuilder'
import { formationsDatabase } from '@/lib/formationDatabase'
import { supabase } from '@/lib/supabaseClient'

interface ThreadDetailProps {
  thread: Thread
  onAddReply: (threadId: string, reply: Omit<Reply, 'id' | 'created_at'>) => void
  onClose: () => void
  currentUser: string | null
}

export function ThreadDetail({ thread, onAddReply, onClose, currentUser }: ThreadDetailProps) {
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFormationBuilder, setShowFormationBuilder] = useState(false)
  const [replyFormation, setReplyFormation] = useState<Formation | undefined>(undefined)
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string | null>>({})

  // ✅ 2. Inicializa useTransition
  const [isPending, startTransition] = useTransition();

  // useMemo 'involvedUserIds' (sin cambios)
  const involvedUserIds = useMemo(() => {
    const ids = new Set<string>()
    if (thread.user_id) ids.add(thread.user_id)
    thread.replies?.forEach(r => r.user_id && ids.add(r.user_id))
    return Array.from(ids)
  }, [thread.user_id, thread.replies])

  // useEffect 'avatarUrls' (sin cambios)
  useEffect(() => {
    if (involvedUserIds.length === 0) return

    let mounted = true
    ;(async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, avatar_url')
        .in('id', involvedUserIds)

      if (error) {
        console.warn('No se pudieron cargar avatars de perfiles:', error.message)
        return
      }
      if (!mounted || !data) return

      const map: Record<string, string | null> = {}
      for (const row of data as { id: string; avatar_url: string | null }[]) {
        map[row.id] = row.avatar_url || null
      }
      setAvatarUrls(prev => ({ ...prev, ...map }))
    })()

    return () => { mounted = false }
  }, [involvedUserIds])

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return
    
    setIsSubmitting(true)
    
    // El 'await' (la llamada a la BBDD) ocurre primero
    await onAddReply(thread.id, {
      thread_id: thread.id,
      content: replyContent,
      user_id: currentUser || '',
      formation_data: replyFormation,
    })
    
    // ✅ 3. Envuelve la limpieza del formulario en startTransition
    // Esto evita el bloqueo de la UI después de que el 'await' termina.
    startTransition(() => {
      setReplyContent('')
      setReplyFormation(undefined)
      setShowFormationBuilder(false)
      setIsSubmitting(false)
    })
  }

  // (handleCancelFormation y handleToggleFormation sin cambios)
  const handleCancelFormation = () => {
    setShowFormationBuilder(false)
    setReplyFormation(undefined) 
  }

  const handleToggleFormation = () => {
    if (showFormationBuilder) {
      handleCancelFormation()
    } else {
      setShowFormationBuilder(true)
      if (!replyFormation) {
        setReplyFormation(formationsDatabase['4-4-2'])
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* ... (Header y Hilo Principal se mantienen igual) ... */}
       <div className="flex items-center gap-4">
        <Button
          onClick={onClose}
          variant="ghost"
          className="text-slate-300 hover:text-white hover:bg-slate-800/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={`bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-lg border border-slate-700/60 overflow-hidden shadow-2xl ${thread.formation_data ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"></div>
          <div className="relative bg-gradient-to-r from-slate-800/95 via-slate-850/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/60 px-6 py-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent"></div>
            <div className="relative flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-14 w-14 border-3 border-slate-600 ring-4 ring-orange-500/30 shadow-2xl">
                  <AvatarImage src={avatarUrls[thread.user_id] || ''} loading="lazy" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-600 via-orange-700 to-amber-700 text-white font-bold text-lg">
                    {(thread.users?.email || 'U').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-orange-500 rounded-full border-2 border-slate-900 shadow-lg flex items-center justify-center">
                  <MessageSquare className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-lg tracking-tight">{thread.users?.email || 'Usuario'}</span>
                  <Badge className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/40 text-[10px] px-2 py-0.5 font-bold shadow-md">
                    <span className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                      Autor
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">
                    {new Date(thread.created_at).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {thread.formation_data?.name && (
                    <>
                      <span className="text-slate-600">•</span>
                      <Badge variant="secondary" className="bg-orange-500/15 text-orange-400 border-orange-500/30 text-[10px] px-2 py-0.5 font-semibold">
                        <Layout className="h-3 w-3 mr-1 inline" />
                        {thread.formation_data.name}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="relative bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="absolute -top-16 -left-16 h-32 w-32 bg-orange-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 h-32 w-32 bg-amber-500/20 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600 rounded-full shadow-lg"></div>
                  <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">Tema de discusión</span>
                </div>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200 leading-tight mb-2">
                  {thread.title}
                </h1>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/40 shadow-xl overflow-hidden">
              <div className="absolute -top-20 -right-20 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/40">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Descripción</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-700/50 to-transparent"></div>
                </div>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-slate-200 text-base leading-relaxed whitespace-pre-wrap font-light">
                    {thread.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {thread.formation_data && thread.formation_data.players.length > 0 && (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl lg:col-span-1">
             {/* ... (Contenido del campo de fútbol) ... */}
          </Card>
        )}
      </div>

      {/* Respuestas */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Respuestas ({thread.replies?.length ?? 0})
        </h2>

        {/* Formulario de respuesta compacto */}
        {currentUser && (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-3 shadow-xl">
            {/* ✅ 4. Usamos 'isPending' para dar feedback */}
            <div className={`space-y-3 transition-opacity ${isPending ? 'opacity-60' : ''}`}>
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-orange-500/50 text-sm"
                rows={3}
                disabled={isSubmitting || isPending} // Deshabilita mientras envía o transiciona
              />

              <div className="flex items-center justify-between gap-2 p-2 bg-slate-900/30 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-orange-500/20">
                    <Layout className="h-3 w-3 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-200">
                      {showFormationBuilder ? 'Alineación en progreso' : 'Agregar alineación'}
                    </p>
                    {replyFormation && (
                      <p className="text-[10px] text-slate-400">
                        {replyFormation.players.filter(p => p.playerData).length}/11 jugadores
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant={showFormationBuilder ? "destructive" : "default"}
                  size="sm"
                  onClick={handleToggleFormation}
                  disabled={isSubmitting || isPending} // Deshabilita
                  className={`h-8 text-xs ${showFormationBuilder 
                    ? "bg-red-900/50 hover:bg-red-800/50 border-red-700" 
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  }`}
                >
                  {showFormationBuilder ? (
                    <>
                      <X className="h-3 w-3 mr-1" />
                      Cancelar
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3 mr-1" />
                      Añadir
                    </>
                  )}
                </Button>
              </div>

              {showFormationBuilder && (
                <div className="bg-slate-900/30 rounded-lg p-3 border border-slate-700/50">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                      <Layout className="h-3 w-3 text-orange-400" />
                      Construir Alineación
                    </h3>
                    {replyFormation && (
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px]">
                        {replyFormation.players.filter(p => p.playerData).length}/11
                      </Badge>
                    )}
                  </div>
                  <DragDropFormationBuilder
                    formation={replyFormation || formationsDatabase['4-4-2']}
                    onFormationChange={(formation) => setReplyFormation(formation as Formation)}
                  />
                </div>
              )}

              <Button
                onClick={handleSubmitReply}
                // ✅ 5. Deshabilitamos el botón con 'isSubmitting' O 'isPending'
                disabled={isSubmitting || isPending || !replyContent.trim()}
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm shadow-lg"
              >
                {(isSubmitting || isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Publicando...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Publicar Respuesta</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* ... (Lista de respuestas se mantiene igual) ... */}
         {thread.replies?.map((reply) => (
          <Card key={reply.id} className="bg-gradient-to-br from-slate-800/50 via-slate-800/40 to-slate-900/50 backdrop-blur-md border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
             {/* ... (Contenido de la respuesta) ... */}
          </Card>
        ))}
      </div>
    </div>
  )
}