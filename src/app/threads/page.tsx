// src/app/threads/new/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewThreadPage() {
  const [title, setTitle] = useState('') // Estado para guardar el título
  const router = useRouter()

  // 1. Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Evita que la página se recargue

    // 2. Comprueba quién es el usuario actual
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert('Debes iniciar sesión para crear un hilo.')
      router.push('/login') // Si no hay usuario, lo manda al login
      return
    }

    // 3. Inserta el nuevo hilo en la base de datos
    const { error } = await supabase
      .from('threads')
      .insert({ title: title, user_id: user.id }) // Asocia el hilo al usuario

    if (error) {
      alert('Error al crear el hilo: ' + error.message)
    } else {
      // 4. Si todo va bien, vuelve al inicio
      router.push('/')
      router.refresh() // Refresca los datos de la página principal
    }
  }

  // 5. Dibuja el formulario
  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear Nuevo Hilo</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Actualiza el estado
        placeholder="Título de tu hilo..."
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button type="submit">Publicar Hilo</button>
    </form>
  )
}