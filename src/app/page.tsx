// src/app/page.tsx

import { supabase } from '@/lib/supabaseClient'
import { Thread, Formation } from '@/types' // Importamos los tipos
import Header from "@/components/Header"
import { ThreadList } from "@/components/ThreadList" // El nuevo componente
import FilterBox from "@/components/FilterBox" // Puedes usar el FilterBox que creamos antes

// Define un tipo para el dato que llega de Supabase

type SupabaseThread = {
  id: number;
  created_at: string;
  title: string;
  content: string | null;
  formation_data: Formation | null;

  
  profiles: ({
    username: string;
    avatar_url: string | null;
  }[] | null); 
}

export default async function HomePage() {

  // 1. Consulta avanzada a Supabase
  // Usamos el 'join' para obtener los datos del autor (profiles)
  const { data: threadsData, error } = await supabase
    .from('threads')
    .select(`
      id,
      created_at,
      title,
      content,
      formation_data,
      profiles ( username, avatar_url )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return <p>Error al cargar los hilos: {error.message}</p>;
  }


  const rawThreads = Array.isArray(threadsData) ? threadsData : [];

const threads: Thread[] = rawThreads.map((thread: SupabaseThread) => { // <-- Tipamos aquí

    // Ya no necesitas 'const data = thread as SupabaseThread;'

    // Manejo seguro si formation_data es null
    const safeFormation: Formation = thread.formation_data || {
        name: '4-4-2 (Defecto)',
        players: []
    }; 

    // Extraemos el perfil
    const profile = thread.profiles ? thread.profiles[0] : null;

    return {
        id: thread.id,
        title: thread.title,
        content: thread.content || '',

        author: profile?.username || 'Usuario Desconocido',
        authorAvatar: profile?.avatar_url || '/default-avatar.png',

        formation: safeFormation,

        timestamp: new Date(thread.created_at),

        replies: [],
        views: Math.floor(Math.random() * 500) + 10,
        likes: Math.floor(Math.random() * 50) + 5,
    } 
});

  return (
    <main className="min-h-screen bg-gray-50">
      <Header /> {/* El banner superior */}

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <FilterBox /> {/* Los filtros de búsqueda */}

        {/* 3. Renderizamos el nuevo ThreadList con los datos adaptados */}
        <ThreadList
          threads={threads}
          // Como estamos en un Server Component, estas funciones deben ser dummy
          onThreadClick={() => { }}
          onToggleLike={() => { }}
        />
      </div>
    </main>
  )
}