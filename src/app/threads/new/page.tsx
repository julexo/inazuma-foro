'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Formation } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DragDropFormationBuilder } from '@/components/builder/DragDropFormationBuilder'
import { Loader2, Send, AlertCircle, LucideLayoutTemplate } from 'lucide-react' 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formationsDatabase, formationNames } from '@/lib/formationDatabase' 

export default function NewThreadPage() {

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // 2. Estado inicial: Carga la plantilla "4-4-2" por defecto
  const [formation, setFormation] = useState<Formation>(formationsDatabase['4-4-2'])
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);

  // 3. Función para manejar el cambio de formación
  const handleFormationChange = (formationName: string) => {
    const newFormationTemplate = formationsDatabase[formationName];
    if (newFormationTemplate) {
      // Reiniciamos la formación a la plantilla,
      // borrando los jugadores que se hayan puesto.
      setFormation(newFormationTemplate);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null);
    setLoading(true);

    // ... (Validación y lógica de getUser) ...
    const assignedPlayers = formation.players.filter(p => p.playerData).length;
    if (title.trim() === '' || content.trim() === '') {
      setError('El título y el contenido no pueden estar vacíos.');
      setLoading(false);
      return;
    }
    if (assignedPlayers < 11) {
      setError('¡Debes asignar los 11 jugadores a la alineación!');
      setLoading(false);
      return;
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Debes iniciar sesión para crear un hilo.');
      router.push('/login');
      return;
    }

    // Guardamos en Supabase
    const { error: insertError } = await supabase
      .from('threads')
      .insert({
        title: title,
        user_id: user.id,
        content: content,
        // Guardamos el objeto 'formation' completo
        formation_data: formation
      })

    if (insertError) {
      setError('Error al crear el hilo: ' + insertError.message);
      setLoading(false);
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
      <div className="container mx-auto max-w-6xl p-8">
        {/* Header Mejorado */}
        <header className="mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <LucideLayoutTemplate className="h-8 w-8 text-orange-400" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                Crear Nueva Alineación
              </h1>
            </div>
          </div>
          <div className="px-6 py-3 bg-slate-900/30">
            <p className="text-slate-300 text-sm">
              Diseña tu alineación perfecta, selecciona los jugadores y comparte tu estrategia con la comunidad.
            </p>
          </div>
        </header>
      
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Alerta de Error Mejorada */}
          {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg backdrop-blur-sm" role="alert">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertCircle className="h-5 w-5" />
            </div>
            <span className="block sm:inline">{error}</span>
          </div>
          )}

          {/* Sección de Detalles */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg text-slate-200">Título de tu Hilo</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Ej: La mejor formación 4-3-3 ofensiva" 
                className="text-lg bg-slate-900/50 border-slate-600 text-white focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all duration-300" 
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-lg text-slate-200">Descripción y Tips</Label>
              <textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Explica por qué esta alineación es buena, sus puntos fuertes, débiles, y cómo jugarla..." 
                className="w-full min-h-[150px] p-4 rounded-lg bg-slate-900/50 border-slate-600 text-white focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300" 
                disabled={loading}
              />
            </div>
          </div>

          {/* Sección de Formación */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg p-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-lg text-slate-200">Elige una Formación Base</Label>
              <Select onValueChange={handleFormationChange} defaultValue="4-4-2" disabled={loading}>
                <SelectTrigger className="w-full sm:w-[280px] bg-slate-900/50 border-slate-600 text-white focus:ring-orange-500/50">
                  <SelectValue placeholder="Selecciona una formación" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 text-white border-slate-700">
                  {formationNames.map((name) => (
                    <SelectItem key={name} value={name} className="focus:bg-slate-700 cursor-pointer hover:bg-slate-800/80">{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-lg text-slate-200">Diseña tu Alineación</Label>
              <div className="bg-slate-900/30 rounded-lg p-4">
                <DragDropFormationBuilder 
                  formation={formation}
                  onFormationChange={setFormation}
                />
              </div>
            </div>
          </div>

          {/* Botón Submit Mejorado */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6"        
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span>Publicando...</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                <span>Publicar Alineación</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}