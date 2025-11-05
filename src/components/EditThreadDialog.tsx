'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Loader2, Layout, X, Save, AlertCircle } from 'lucide-react'
import { DragDropFormationBuilder } from './builder/DragDropFormationBuilder'
import { formationsDatabase } from '@/lib/formationDatabase'
import type { Thread, Formation } from '@/types'
import { supabase } from '@/lib/supabaseClient'
import { Card } from '@/components/ui/card'

interface EditThreadDialogProps {
  thread: Thread | null
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function EditThreadDialog({ thread, open, onClose, onSuccess }: EditThreadDialogProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [formation, setFormation] = useState<Formation | undefined>()
  const [showFormationBuilder, setShowFormationBuilder] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (thread) {
      console.log('Thread cargado para editar:', thread)
      setTitle(thread.title)
      setContent(thread.content)
      setFormation(thread.formation_data)
      setShowFormationBuilder(false)
    }
  }, [thread])

  const handleSave = async () => {
    console.log('🔵 handleSave iniciado')
    
    if (!thread || !title.trim() || !content.trim()) {
      console.log('❌ Validación falló:', { thread: !!thread, title, content })
      return
    }

    setSaving(true)
    try {
      const { data: auth } = await supabase.auth.getUser()
      const userId = auth?.user?.id
      
      console.log('👤 Usuario autenticado:', { userId, threadUserId: thread.user_id })
      
      if (!userId) {
        alert('Debes iniciar sesión para editar.')
        setSaving(false)
        return
      }

      const normalizedFormation = formation ? JSON.parse(JSON.stringify(formation)) : null

      console.log('📤 Enviando UPDATE a Supabase:', {
        threadId: thread.id,
        title: title.trim(),
        contentLength: content.trim().length,
        hasFormation: !!normalizedFormation
      })

      const { error: updErr, status, statusText } = await supabase
        .from('threads')
        .update({
          title: title.trim(),
          content: content.trim(),
          formation_data: normalizedFormation
        })
        .eq('id', thread.id)

      console.log('📥 Respuesta de Supabase:', { error: updErr, status, statusText })

      if (updErr) {
        console.error('❌ Error de Supabase:', updErr)
        alert('Error al actualizar el hilo: ' + updErr.message + '\n\nPosible causa: Verifica las políticas RLS en la tabla threads.')
        setSaving(false)
        return
      }

      console.log('✅ UPDATE exitoso, ejecutando callbacks...')
      
      await onSuccess()
      router.refresh()
      onClose()
      
      console.log('✅ Proceso completado')
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error('💥 Error inesperado:', e)
      alert('Error inesperado al guardar: ' + msg)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleFormation = () => {
    if (showFormationBuilder) {
      setShowFormationBuilder(false)
    } else {
      setShowFormationBuilder(true)
      if (!formation) setFormation(formationsDatabase['4-4-2'])
    }
  }

  const playerCount = formation?.players.filter(p => p.playerData).length || 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="z-[100]" />
      <DialogContent className="max-w-[95vw] lg:max-w-[85vw] h-[96vh] bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 p-0 gap-0 flex flex-col z-[101]">
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <Layout className="h-5 w-5 text-orange-400" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              Editar Alineación
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Información básica */}
            <Card className="bg-slate-800/50 border-slate-700/50 p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                Información del Hilo
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Título <span className="text-orange-400">*</span>
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título de tu alineación"
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Descripción <span className="text-orange-400">*</span>
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe tu alineación, estrategia y por qué elegiste estos jugadores..."
                    rows={5}
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-orange-500/50 resize-none text-base"
                  />
                  <p className="text-xs text-slate-500">
                    {content.length} caracteres
                  </p>
                </div>
              </div>
            </Card>

            {/* Sección de alineación */}
            <Card className="bg-slate-800/50 border-slate-700/50 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Layout className="h-4 w-4 text-orange-400" />
                  Alineación del Equipo
                </h3>
                
                {formation && (
                  <Badge 
                    variant="secondary" 
                    className={`text-sm ${
                      playerCount === 11 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    }`}
                  >
                    {playerCount}/11 jugadores
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
                <div className="flex-1">
                  <p className="text-base font-medium text-slate-200">
                    {showFormationBuilder ? 'Editor de alineación activo' : 'Modificar alineación'}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    {formation 
                      ? `Formación actual: ${formation.name}` 
                      : 'Sin configurar'
                    }
                  </p>
                </div>
                
                <Button
                  type="button"
                  size="lg"
                  onClick={handleToggleFormation}
                  className={showFormationBuilder 
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600" 
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  }
                >
                  {showFormationBuilder ? (
                    <>
                      <X className="h-5 w-5 mr-2" />
                      Cerrar Editor
                    </>
                  ) : (
                    <>
                      <Layout className="h-5 w-5 mr-2" />
                      {formation ? 'Editar' : 'Crear'}
                    </>
                  )}
                </Button>
              </div>

              {showFormationBuilder && formation && (
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                  <DragDropFormationBuilder
                    formation={formation}
                    onFormationChange={(f) => setFormation(f as Formation)}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-700/50 bg-slate-800/50 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="text-sm text-slate-400">
            {!title.trim() || !content.trim() ? (
              <span className="flex items-center gap-2 text-orange-400">
                <AlertCircle className="h-5 w-5" />
                Completa todos los campos obligatorios
              </span>
            ) : (
              <span className="text-green-400 flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Todo listo para guardar
              </span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              disabled={saving}
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              Cancelar
            </Button>
            <Button
              size="lg"
              onClick={handleSave}
              disabled={saving || !title.trim() || !content.trim()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 min-w-[180px]"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
