'use client'

import { Thread, Reply } from '@/types'
import type { Formation } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageSquare, Plus, X, Layout, Loader2 } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { DragDropFormationBuilder } from './builder/DragDropFormationBuilder'
import { formationsDatabase } from '@/lib/formationDatabase'
import { getPlayerAvatarUrl } from '@/data/PlayerDataBase'
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

  // Mapa de user_id -> avatar_url (perfiles)
  const [avatarUrls, setAvatarUrls] = useState<Record<string, string | null>>({})

  // Recolectar todos los user_id presentes en el hilo y respuestas
  const involvedUserIds = useMemo(() => {
    const ids = new Set<string>()
    if (thread.user_id) ids.add(thread.user_id)
    thread.replies?.forEach(r => r.user_id && ids.add(r.user_id))
    return Array.from(ids)
  }, [thread.user_id, thread.replies])

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
    await onAddReply(thread.id, {
      thread_id: thread.id,
      content: replyContent,
      user_id: currentUser || '',
      formation_data: replyFormation,
    })
    setReplyContent('')
    setReplyFormation(undefined)
    setShowFormationBuilder(false)
    setIsSubmitting(false)
  }

  const handleCancelFormation = () => {
    setShowFormationBuilder(false)
    setReplyFormation(undefined) // Borrar la formación al cancelar
  }

  const handleToggleFormation = () => {
    if (showFormationBuilder) {
      // Si está mostrando el builder, lo cancelamos y borramos
      handleCancelFormation()
    } else {
      // Si no está mostrando, lo abrimos con una formación por defecto
      setShowFormationBuilder(true)
      if (!replyFormation) {
        setReplyFormation(formationsDatabase['4-4-2'])
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Header con botón volver */}
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

      {/* Hilo principal - Diseño ultra profesional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna principal - Contenido del hilo */}
        <Card className={`bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-lg border border-slate-700/60 overflow-hidden shadow-2xl ${thread.formation_data ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          
          {/* Barra superior decorativa con gradiente */}
          <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"></div>
          
          {/* Header del autor con glassmorphism */}
          <div className="relative bg-gradient-to-r from-slate-800/95 via-slate-850/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/60 px-6 py-5">
            {/* Efecto de brillo de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent"></div>
            
            <div className="relative flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-14 w-14 border-3 border-slate-600 ring-4 ring-orange-500/30 shadow-2xl">
                  <AvatarImage src={avatarUrls[thread.user_id] || ''} loading="lazy" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-600 via-orange-700 to-amber-700 text-white font-bold text-lg">
                    {(thread.users?.email || 'U').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Indicator de autor original */}
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

          {/* Contenido del hilo */}
          <div className="p-6 space-y-5">
            
            {/* Título del hilo - Ultra destacado */}
            <div className="relative bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Efectos de luz decorativos */}
              <div className="absolute -top-16 -left-16 h-32 w-32 bg-orange-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 h-32 w-32 bg-amber-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                {/* Header de título */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-600 rounded-full shadow-lg"></div>
                  <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">Tema de discusión</span>
                </div>
                
                {/* Título principal */}
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200 leading-tight mb-2">
                  {thread.title}
                </h1>
              </div>
            </div>

            {/* Descripción del contenido */}
            <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/40 shadow-xl overflow-hidden">
              {/* Efecto de brillo */}
              <div className="absolute -top-20 -right-20 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                {/* Header de contenido */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/40">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Descripción</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-slate-700/50 to-transparent"></div>
                </div>
                
                {/* Texto del contenido */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-slate-200 text-base leading-relaxed whitespace-pre-wrap font-light">
                    {thread.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Columna lateral - Formación táctica premium */}
        {thread.formation_data && thread.formation_data.players.length > 0 && (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl lg:col-span-1">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Layout className="h-4 w-4 text-orange-400" />
                Alineación
              </h3>
              
              <div className="relative w-full h-[400px] bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-lg overflow-hidden shadow-lg border border-green-800">
                
                {/* SVG rotado 90° */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-25 pointer-events-none transform origin-center rotate-90"
                  preserveAspectRatio="none"
                >
                  <rect x="0%" y="0%" width="100%" height="100%" fill="none" stroke="white" strokeWidth="1.5" />
                  <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="1.5" />
                  <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="1.5" />
                  <circle cx="50%" cy="50%" r="1%" fill="white" />
                  <rect x="0%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="1.5" />
                  <rect x="0%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="1.5" />
                  <rect x="85%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="1.5" />
                  <rect x="92%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="1.5" />
                </svg>

                {/* Textura del césped */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 25px, rgba(255,255,255,0.05) 25px, rgba(255,255,255,0.05) 50px)',
                  }}
                />

                {/* Jugadores compactos */}
                {thread.formation_data.players.map((player) => (
                  player.playerData && (
                    <div
                      key={player.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 hover:z-[100]"
                      style={{ left: `${player.position.x}%`, top: `${player.position.y}%` }}
                    >
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur group-hover:bg-blue-400/40 transition-all" />
                        <Avatar className="h-10 w-10 border-2 border-white ring-2 ring-blue-500 shadow-lg relative">
                          <AvatarImage 
                            src={getPlayerAvatarUrl(player.playerData.avatar)} 
                            loading="lazy"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xs">
                            {player.playerData.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Tooltip adaptativo - ajusta posición según ubicación del jugador */}
                        <div className={`absolute ${player.position.y > 50 ? 'bottom-full mb-1' : 'top-full mt-1'} ${player.position.x < 20 ? 'left-0' : player.position.x > 80 ? 'right-0' : 'left-1/2 -translate-x-1/2'} whitespace-nowrap bg-slate-900 text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[200] shadow-lg border border-slate-600`}>
                          <div className="font-bold">{player.playerData.name}</div>
                          <div className="text-blue-300">{player.playerData.position}</div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
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
            <div className="space-y-3">
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-orange-500/50 text-sm"
                rows={3}
              />

              {/* Botón para agregar formación */}
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

              {/* Builder de formación */}
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
                disabled={isSubmitting || !replyContent.trim()}
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm shadow-lg"
              >
                {isSubmitting ? (
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

        {/* Lista de respuestas - Diseño ultra profesional */}
        {thread.replies?.map((reply) => (
          <Card key={reply.id} className="bg-gradient-to-br from-slate-800/50 via-slate-800/40 to-slate-900/50 backdrop-blur-md border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
            
            {/* Barra decorativa superior */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600"></div>
            
            {/* Header premium con glassmorphism */}
            <div className="relative bg-gradient-to-r from-slate-800/95 via-slate-850/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 px-5 py-4">
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-slate-600 ring-4 ring-blue-500/20 shadow-xl group-hover:ring-blue-500/40 transition-all duration-300">
                    <AvatarImage src={avatarUrls[reply.user_id] || ''} loading="lazy" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 text-white font-bold text-sm">
                      {(reply.users?.email || 'U').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Status indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-lg"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-base tracking-tight">{reply.users?.email || 'Usuario'}</span>
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/15 to-cyan-500/15 text-blue-400 border border-blue-500/30 text-[10px] px-2 py-0.5 font-semibold shadow-md">
                      <span className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                        Pro
                      </span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                      <span className="font-medium">
                        {new Date(reply.created_at).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500 text-[11px]">Hace {Math.floor((Date.now() - new Date(reply.created_at).getTime()) / 60000)} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido principal con layout sofisticado */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Columna izquierda: Contenido de texto (2/3) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="relative bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-800/40 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/40 shadow-xl overflow-hidden group/content">
                    {/* Efecto de brillo decorativo */}
                    <div className="absolute -top-20 -right-20 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl group-hover/content:bg-blue-500/20 transition-all duration-700"></div>
                    
                    <div className="relative">
                      {/* Header de sección */}
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/40">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Comentario</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-700/50 to-transparent"></div>
                      </div>
                      
                      {/* Texto de la respuesta */}
                      <div className="prose prose-invert prose-sm max-w-none">
                        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-light">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna derecha: Formación táctica (1/3) */}
                {reply.formation_data && reply.formation_data.players.length > 0 ? (
                  <div className="lg:col-span-1">
                    <div className="sticky top-4 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-800/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 shadow-2xl overflow-hidden">
                      
                      {/* Efecto de luz de fondo */}
                      <div className="absolute -top-10 -right-10 h-32 w-32 bg-orange-500/20 rounded-full blur-3xl"></div>
                      <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                      
                      <div className="relative">
                        {/* Header de formación premium */}
                        <div className="mb-4 pb-4 border-b border-slate-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 via-orange-600/20 to-amber-600/20 border border-orange-500/40 shadow-lg">
                                <Layout className="h-4 w-4 text-orange-400" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white tracking-tight">
                                  {reply.formation_data.name}
                                </h4>
                                <p className="text-[10px] text-slate-400 font-medium">Sistema táctico</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Badges de info */}
                          <div className="flex items-center gap-2 mt-3">
                            <Badge className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/40 text-[10px] px-2 py-1 font-bold shadow-md">
                              {reply.formation_data.players.filter(p => p.playerData).length}/11 jugadores
                            </Badge>
                            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/40 text-[10px] px-2 py-1 font-bold shadow-md">
                              {Math.round((reply.formation_data.players.filter(p => p.playerData).length / 11) * 100)}% completo
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Campo de fútbol premium */}
                        <div className="relative w-full h-80 bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-2xl shadow-2xl border-2 border-green-800/70 overflow-visible">
                          
                          {/* Contenedor interno con overflow hidden para el campo */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            {/* Overlays de iluminación */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10 pointer-events-none"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>
                            
                            {/* SVG del campo rotado 90° */}
                            <svg
                              className="absolute inset-0 w-full h-full opacity-35 pointer-events-none transform origin-center rotate-90"
                              preserveAspectRatio="none"
                            >
                              <defs>
                                <filter id="glow">
                                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                  <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                  </feMerge>
                                </filter>
                              </defs>
                              <rect x="0%" y="0%" width="100%" height="100%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                              <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                              <circle cx="50%" cy="50%" r="1.5%" fill="white" filter="url(#glow)" />
                              <rect x="0%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                              <rect x="0%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                              <rect x="85%" y="25%" width="15%" height="50%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                              <rect x="92%" y="37.5%" width="8%" height="25%" fill="none" stroke="white" strokeWidth="2.5" filter="url(#glow)" />
                            </svg>

                            {/* Textura de césped realista */}
                            <div
                              className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                              style={{
                                backgroundImage:
                                  'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 35px, rgba(255,255,255,0.08) 35px, rgba(255,255,255,0.08) 70px)',
                              }}
                            />
                          </div>

                          {/* Jugadores con diseño premium - fuera del overflow hidden */}
                          {reply.formation_data.players.map((player, index) => (
                            player.playerData && (
                              <div
                                key={player.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 z-10 hover:z-[100]"
                                style={{ 
                                  left: `${player.position.x}%`, 
                                  top: `${player.position.y}%`,
                                  animationDelay: `${index * 50}ms`
                                }}
                              >
                                <div className="relative group/player animate-in fade-in zoom-in">
                                  {/* Glow effect ultra mejorado */}
                                  <div className="absolute -inset-3 bg-gradient-to-br from-blue-400/40 via-cyan-400/40 to-blue-500/40 rounded-full blur-xl group-hover/player:from-blue-400/70 group-hover/player:via-cyan-400/70 group-hover/player:to-blue-500/70 transition-all duration-500 animate-pulse" />
                                  
                                  {/* Ring decorativo */}
                                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/50 to-cyan-400/50 rounded-full blur group-hover/player:from-blue-400/80 group_hover/player:to-cyan-400/80 transition-all duration-300"></div>
                                  
                                  {/* Avatar del jugador */}
                                  <Avatar className="h-10 w-10 border-[3px] border-white ring-[3px] ring-blue-500 shadow-2xl relative group-hover/player:ring-cyan-400 group-hover/player:scale-110 transition-all duration-300">
                                    <AvatarImage 
                                      src={getPlayerAvatarUrl(player.playerData.avatar)} 
                                      loading="lazy"
                                      className="object-cover"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-700 text-white font-bold text-[10px]">
                                      {player.playerData.name.slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  
                                  {/* Tooltip ultra premium - adaptativo en todas las direcciones */}
                                  <div className={`absolute ${player.position.y > 50 ? 'bottom-full mb-3' : 'top-full mt-3'} ${player.position.x < 20 ? 'left-0' : player.position.x > 80 ? 'right-0' : 'left-1/2 -translate-x-1/2'} opacity-0 group-hover/player:opacity-100 transition-all duration-300 pointer-events-none z-[200] scale-90 group-hover/player:scale-100`}>
                                    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700/70 backdrop-blur-xl min-w-[140px]">
                                      {/* Barra superior decorativa */}
                                      <div className={`absolute ${player.position.y > 50 ? 'bottom-0' : 'top-0'} left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 ${player.position.y > 50 ? 'rounded-b-xl' : 'rounded-t-xl'}`}></div>
                                      
                                      <div className="font-bold text-sm whitespace-nowrap mb-1">{player.playerData.name}</div>
                                      <div className="flex items-center gap-1.5">
                                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-[9px] px-1.5 py-0.5 font-bold">
                                          {player.playerData.position}
                                        </Badge>
                                      </div>
                                      
                                      {/* Flecha decorativa mejorada - cambia según posición */}
                                      <div className={`absolute ${player.position.x < 20 ? 'left-4' : player.position.x > 80 ? 'right-4' : 'left-1/2 -translate-x-1/2'} ${player.position.y > 50 ? '-bottom-2 rotate-[225deg]' : '-top-2 rotate-45'} w-3 h-3 bg-gradient-to-br from-slate-950 to-slate-900 border-l border-t border-slate-700/70`}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                        
                        {/* Estadísticas premium */}
                        <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-3">
                          <div className="text-center p-2 rounded-xl bg-slate-800/50 border border-slate-700/30">
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-1">Completo</p>
                            <p className="text-base font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              {Math.round((reply.formation_data.players.filter(p => p.playerData).length / 11) * 100)}%
                            </p>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-slate-800/50 border border-slate-700/30">
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-1">Jugadores</p>
                            <p className="text-base font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                              {reply.formation_data.players.filter(p => p.playerData).length}/11
                            </p>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-slate-800/50 border border-slate-700/30">
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-1">Sistema</p>
                            <p className="text-[10px] font-bold text-orange-400">
                              {reply.formation_data.name.split(' ')[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
                    <div className="text-center text-slate-500/50 p-8 rounded-2xl border-2 border-dashed border-slate-700/30">
                      <Layout className="h-14 w-14 mx-auto mb-3 opacity-30" />
                      <p className="text-xs font-medium">Sin alineación táctica</p>
                      <p className="text-[10px] text-slate-600 mt-1">No se adjuntó formación</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

