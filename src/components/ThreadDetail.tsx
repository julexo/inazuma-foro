'use client'

import { Thread, Reply } from '@/types'
import type { Formation } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MessageSquare, Plus, X, Layout, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { DragDropFormationBuilder } from './builder/DragDropFormationBuilder'
import { formationsDatabase } from '@/lib/formationDatabase'
import { getPlayerAvatarUrl } from '@/data/PlayerDataBase'

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
    <div className="space-y-6">
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

      {/* Hilo principal */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
        <div className="p-6 space-y-4">
          {/* Header del hilo */}
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border-2 border-slate-600">
              <AvatarImage src="" />
              <AvatarFallback>{(thread.users?.email || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{thread.users?.email || 'Usuario'}</span>
                <span className="text-slate-400 text-sm">•</span>
                <span className="text-slate-400 text-sm">
                  {new Date(thread.created_at).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{thread.title}</h1>
              {thread.formation_data?.name && (
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  {thread.formation_data.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Contenido */}
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300">{thread.content}</p>
          </div>

          {/* Formación */}
          {thread.formation_data && thread.formation_data.players.length > 0 && (
            <div className="mt-4 bg-slate-900/30 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Alineación: {thread.formation_data.name}</h3>
              <div className="relative w-full h-96 bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-lg overflow-hidden shadow-2xl border-2 border-green-800">
                {/* Textura del césped */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)'
                  }} />
                </div>

                {/* SVG del campo con más detalles */}
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none">
                  {/* Líneas exteriores */}
                  <rect x="2%" y="2%" width="96%" height="96%" fill="none" stroke="white" strokeWidth="3" />
                  
                  {/* Línea central */}
                  <line x1="50%" y1="2%" x2="50%" y2="98%" stroke="white" strokeWidth="3" />
                  
                  {/* Círculo central */}
                  <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="3" />
                  <circle cx="50%" cy="50%" r="1.5%" fill="white" />
                  
                  {/* Área grande izquierda */}
                  <rect x="2%" y="25%" width="16%" height="50%" fill="none" stroke="white" strokeWidth="3" />
                  {/* Área pequeña izquierda */}
                  <rect x="2%" y="38%" width="8%" height="24%" fill="none" stroke="white" strokeWidth="3" />
                  {/* Punto penal izquierdo */}
                  <circle cx="12%" cy="50%" r="1%" fill="white" />
                  {/* Arco de área penal izquierdo */}
                  <path d="M 10% 25% Q 18% 50% 10% 75%" fill="none" stroke="white" strokeWidth="3" />
                  
                  {/* Área grande derecha */}
                  <rect x="82%" y="25%" width="16%" height="50%" fill="none" stroke="white" strokeWidth="3" />
                  {/* Área pequeña derecha */}
                  <rect x="90%" y="38%" width="8%" height="24%" fill="none" stroke="white" strokeWidth="3" />
                  {/* Punto penal derecho */}
                  <circle cx="88%" cy="50%" r="1%" fill="white" />
                  {/* Arco de área penal derecho */}
                  <path d="M 90% 25% Q 82% 50% 90% 75%" fill="none" stroke="white" strokeWidth="3" />
                  
                  {/* Esquinas */}
                  <path d="M 2% 2% Q 4% 2% 4% 4%" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M 98% 2% Q 96% 2% 96% 4%" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M 2% 98% Q 4% 98% 4% 96%" fill="none" stroke="white" strokeWidth="2" />
                  <path d="M 98% 98% Q 96% 98% 96% 96%" fill="none" stroke="white" strokeWidth="2" />
                </svg>

                {/* Jugadores con mejor diseño */}
                {thread.formation_data.players.map((player) => (
                  player.playerData && (
                    <div
                      key={player.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${player.position.x}%`, top: `${player.position.y}%` }}
                    >
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-blue-400/20 rounded-full blur-md group-hover:bg-blue-400/40 transition-all" />
                        <Avatar className="h-14 w-14 border-3 border-white ring-4 ring-blue-500 shadow-2xl relative">
                          <AvatarImage src={getPlayerAvatarUrl(player.playerData.avatar)} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold">
                            {player.playerData.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Tooltip mejorado */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap bg-gradient-to-r from-slate-900 to-slate-800 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-xl border border-slate-600">
                          <div className="font-bold text-sm">{player.playerData.name}</div>
                          <div className="text-blue-300 text-[10px] mt-0.5">{player.playerData.position}</div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Respuestas */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Respuestas ({thread.replies?.length ?? 0})
        </h2>

        {/* Formulario de respuesta mejorado */}
        {currentUser && (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-4 shadow-xl">
            <div className="space-y-4">
              <Textarea
                placeholder="Escribe tu respuesta..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-orange-500/50"
                rows={3}
              />

              {/* Botón mejorado para mostrar/ocultar builder de formación */}
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-900/30 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <Layout className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {showFormationBuilder ? 'Alineación en progreso' : 'Agregar alineación'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {replyFormation ? `${replyFormation.name} - ${replyFormation.players.filter(p => p.playerData).length}/11 jugadores` : 'Opcional'}
                    </p>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant={showFormationBuilder ? "destructive" : "default"}
                  size="sm"
                  onClick={handleToggleFormation}
                  className={showFormationBuilder 
                    ? "bg-red-900/50 hover:bg-red-800/50 border-red-700" 
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md"
                  }
                >
                  {showFormationBuilder ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir
                    </>
                  )}
                </Button>
              </div>

              {/* Builder de formación con transición */}
              {showFormationBuilder && (
                <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700/50 animate-in slide-in-from-top-2">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                      <Layout className="h-4 w-4 text-orange-400" />
                      Construir Alineación
                    </h3>
                    {replyFormation && (
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
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
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Publicando...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    <span>Publicar Respuesta</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Lista de respuestas con campo mejorado */}
        {thread.replies?.map((reply) => (
          <Card key={reply.id} className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border-2 border-slate-600">
                <AvatarImage src="" />
                <AvatarFallback>{(reply.users?.email || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white">{reply.users?.email || 'Usuario'}</span>
                  <span className="text-slate-400 text-sm">
                    {new Date(reply.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-300">{reply.content}</p>

                {reply.formation_data && reply.formation_data.players.length > 0 && (
                  <div className="mt-3 bg-slate-900/30 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
                      <Layout className="h-3 w-3" />
                      Alineación: {reply.formation_data.name}
                    </h4>
                    <div className="relative w-full h-80 bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-lg overflow-hidden shadow-2xl border-2 border-green-800">
                      {/* Textura del césped */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.03) 35px, rgba(255,255,255,.03) 70px)'
                        }} />
                      </div>

                      {/* SVG del campo completo (igual que arriba) */}
                      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none">
                        {/* ...same SVG content as above... */}
                        <rect x="2%" y="2%" width="96%" height="96%" fill="none" stroke="white" strokeWidth="3" />
                        <line x1="50%" y1="2%" x2="50%" y2="98%" stroke="white" strokeWidth="3" />
                        <circle cx="50%" cy="50%" r="10%" fill="none" stroke="white" strokeWidth="3" />
                        <circle cx="50%" cy="50%" r="1.5%" fill="white" />
                        <rect x="2%" y="25%" width="16%" height="50%" fill="none" stroke="white" strokeWidth="3" />
                        <rect x="2%" y="38%" width="8%" height="24%" fill="none" stroke="white" strokeWidth="3" />
                        <circle cx="12%" cy="50%" r="1%" fill="white" />
                        <rect x="82%" y="25%" width="16%" height="50%" fill="none" stroke="white" strokeWidth="3" />
                        <rect x="90%" y="38%" width="8%" height="24%" fill="none" stroke="white" strokeWidth="3" />
                        <circle cx="88%" cy="50%" r="1%" fill="white" />
                      </svg>

                      {/* Jugadores de la respuesta */}
                      {reply.formation_data.players.map((player) => (
                        player.playerData && (
                          <div
                            key={player.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${player.position.x}%`, top: `${player.position.y}%` }}
                          >
                            <div className="relative group">
                              <div className="absolute -inset-2 bg-green-400/20 rounded-full blur-md group-hover:bg-green-400/40 transition-all" />
                              <Avatar className="h-12 w-12 border-3 border-white ring-4 ring-green-500 shadow-2xl relative">
                                <AvatarImage src={getPlayerAvatarUrl(player.playerData.avatar)} />
                                <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-700 text-white font-bold">
                                  {player.playerData.name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap bg-gradient-to-r from-slate-900 to-slate-800 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 shadow-xl border border-slate-600">
                                <div className="font-bold text-sm">{player.playerData.name}</div>
                                <div className="text-green-300 text-[10px] mt-0.5">{player.playerData.position}</div>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
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

