// src/app/threads/[threadId]/page.tsx

import { supabase } from '@/lib/supabaseClient'
import { Thread, Formation } from '@/types'
import { ThreadDetail } from '@/components/ThreadDetail' 
import Header from "@/components/Header" 


type SupabaseThreadDetail = {
  id: number;
  created_at: string;
  title: string;
  content: string | null; 
  formation_data: Formation | null;
  profiles: ({ // <-- Es un array que contiene objetos
    username: string;
    avatar_url: string | null; 
  }[] | null); // <-- El array mismo puede ser null
}

export default async function ThreadPage({ params }: { params: { threadId: string } }) {
  
  // 1. Consulta del Hilo específico
  const { data: threadData, error } = await supabase
    .from('threads')
    .select('id, created_at, title, content, formation_data, profiles(username, avatar_url)')
    .eq('id', params.threadId)
    .single(); // Esperamos un solo hilo

  if (error || !threadData) {
    return <p>Error al cargar el hilo: {error?.message || 'Hilo no encontrado.'}</p>
  }

  // 2. Adaptar el dato de Supabase al formato del componente Thread
  
  const data = threadData as SupabaseThreadDetail;
  
  
  // Extraemos el primer (y único) perfil del array 'profiles'
  const profile = data.profiles ? data.profiles[0] : null;

  // Manejo seguro del JSONB si es null
  const safeFormation: Formation = (data.formation_data || { 
    name: '4-4-2 (Defecto)', 
    players: [] 
  }) as Formation;
  
  const thread: Thread = {
    id: data.id,
    title: data.title,
    content: data.content || '', 
    
    
    author: profile?.username || 'Usuario Desconocido',
    authorAvatar: profile?.avatar_url || '/default-avatar.png',
    
    formation: safeFormation,
    timestamp: new Date(data.created_at),
    
    // --- DATOS SIMULADOS ---
    replies: [], 
    views: Math.floor(Math.random() * 500) + 10,
    likes: Math.floor(Math.random() * 50) + 5,
  } as Thread; 

  // 3. Renderizar el nuevo ThreadDetail
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ThreadDetail
          thread={thread}
          onAddReply={() => { alert("Funcionalidad de respuesta pendiente.") }}
          onClose={() => {}} 
          currentUser="current_user_id" 
        />
      </div>
    </main>
  )
}