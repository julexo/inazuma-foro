// src/app/page.tsx

import { supabase } from '@/lib/supabaseClient'
import { Thread, Formation } from '@/types' // Importamos los tipos
import Header from "@/components/Header"
import { ThreadList } from "@/components/ThreadList" // El nuevo componente
import FilterBox from "@/components/FilterBox" // Puedes usar el FilterBox que creamos antes

// Define un tipo para el dato que llega de Supabase
// Define un tipo para el dato que llega de Supabase
type SupabaseThread = {
  id: number;
  created_at: string;
  title: string;
  content: string | null;
  formation_data: any;

  // 🚨 CORRECCIÓN CRUCIAL: Lo definimos como un ARRAY que contiene un solo objeto (o null)
  profiles: ({
    username: string;
    avatar_url: string | null;
  }[] | null); // <- La forma en que TypeScript lo lee para el mapeo
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


  // 2. Mapea la variable, asignando los tipos explícitamente y manejando los nulos
  const rawThreads = Array.isArray(threadsData) ? threadsData : [];

  // 2. Mapea la variable, asignando los tipos explícitamente y manejando los nulos
  const threads: Thread[] = rawThreads.map(thread => {

    // Asignamos el objeto que recibimos de la base de datos a una constante
    // Hacemos la aserción *aquí* para poder usar los campos con seguridad.
    const data = thread as SupabaseThread;

    const safeFormation: Formation = (data.formation_data || {
      name: '4-4-2 (Defecto)',
      players: []
    }) as Formation;

    return {
      id: data.id,
      title: data.title,
      content: data.content || '',

      // Manejo de Perfil y Avatar
      // Reemplaza esto:

      author: data.profiles?.[0]?.username || 'Usuario Desconocido',
      authorAvatar: data.profiles?.[0]?.avatar_url || '/default-avatar.png',

      formation: safeFormation,

      // Manejo del TIMESTAMP: new Date() devuelve el tipo Date que la interfaz espera.
      timestamp: new Date(data.created_at),

      // --- DATOS SIMULADOS ---
      replies: [],
      views: Math.floor(Math.random() * 500) + 10,
      likes: Math.floor(Math.random() * 50) + 5,
    } as Thread; // <-- Forzamos el tipo al final para asegurar la compatibilidad
  });
  // ...

  // ... (continúa el 'return' de tu componente) ...

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