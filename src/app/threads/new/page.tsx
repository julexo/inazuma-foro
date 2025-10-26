// src/app/threads/new/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Formation, Player } from '@/types' // <-- Importa nuestros tipos
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Importa el constructor de alineaciones
// (Asegúrate de que la ruta sea correcta)
import { DragDropFormationBuilder } from '@/components/builder/DragDropFormationBuilder'

// Esta es una formación inicial por defecto (4-4-2)
const defaultFormation: Formation = {
  name: "4-4-2",
  players: [
    { id: 1, name: "Portero", position: { x: 10, y: 50 } },
    { id: 2, name: "Defensa", position: { x: 30, y: 20 } },
    { id: 3, name: "Defensa", position: { x: 30, y: 40 } },
    { id: 4, name: "Defensa", position: { x: 30, y: 60 } },
    { id: 5, name: "Defensa", position: { x: 30, y: 80 } },
    { id: 6, name: "Mediocampo", position: { x: 55, y: 20 } },
    { id: 7, name: "Mediocampo", position: { x: 55, y: 40 } },
    { id: 8, name: "Mediocampo", position: { x: 55, y: 60 } },
    { id: 9, name: "Mediocampo", position: { x: 55, y: 80 } },
    { id: 10, name: "Delantero", position: { x: 80, y: 35 } },
    { id: 11, name: "Delantero", position: { x: 80, y: 65 } },
  ]
};

export default function NewThreadPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') // Añadimos un campo de contenido
  const [formation, setFormation] = useState<Formation>(defaultFormation)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Debes iniciar sesión para crear un hilo.')
      router.push('/login')
      return
    }

    // Validación
    const assignedPlayers = formation.players.filter(p => p.playerData).length;
    if (title.trim() === '' || content.trim() === '') {
      alert('El título y el contenido no pueden estar vacíos.');
      return;
    }
    if (assignedPlayers < 11) {
      alert('¡Debes asignar los 11 jugadores a la alineación!');
      return;
    }

    // ¡Guardamos todo en Supabase!
    // El objeto 'formation' se guarda en la columna 'formation_data' como JSON
    const { error } = await supabase
      .from('threads')
      .insert({ 
        title: title, 
        user_id: user.id,
        content: content, // <- Necesitarás esta columna también (tipo 'text')
        formation_data: formation // <- Guarda el objeto JSON
      })

    if (error) {
      alert('Error al crear el hilo: ' + error.message)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold">Crear Nueva Alineación</h1>
        
        <div className="space-y-2">
          <Label htmlFor="title" className="text-lg">Título de tu Hilo</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: La mejor formación 4-3-3 ofensiva"
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-lg">Descripción y Tips</Label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Explica por qué esta alineación es buena, sus puntos fuertes, débiles, y cómo jugarla..."
            className="w-full min-h-[150px] p-2 border rounded-md"
          />
        </div>

        {/* El Constructor de Alineaciones */}
        <div className="space-y-2">
           <Label className="text-lg">Diseña tu Alineación</Label>
           <DragDropFormationBuilder 
             formation={formation}
             onFormationChange={setFormation}
           />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Publicar Hilo
        </Button>
      </form>
    </div>
  )
}