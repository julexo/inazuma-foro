'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Thread, Reply, Formation } from '@/types'; // Quitamos PlayerData (no se usa aquí)
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ThreadDetail } from '@/components/ThreadDetail';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

// --- Define los tipos (Restauramos profiles) ---
type SupabaseThreadData = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  formation_data: Formation;
  // El join de Supabase SIEMPRE devuelve un array
  profiles: ({ 
    username: string;
    avatar_url: string | null;
  }[] | null); 
}

type SupabasePostData = {
  id: number;
  content: string;
  created_at: string;
  formation_data: Formation | null; // La columna que acabamos de añadir
  profiles: ({ 
    username: string;
    avatar_url: string | null;
  }[] | null);
}
// --- Fin de los tipos ---


export default function ThreadPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  
  // Asumiendo que tu carpeta es [threadId] (minúscula i)
  const threadId = params.threadId as string; 

  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchThreadAndReplies() {
    if (!threadId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    
    // Consulta del Hilo (limpia)
    const { data: threadData, error: threadError } = await supabase
      .from('threads')
      .select('id, title, content, created_at, formation_data, profiles(username, avatar_url)')
      .eq('id', threadId)
      .single(); 

    if (threadError) {
      console.error("Error fetching thread:", threadError); 
      setLoading(false);
      return;
    }

    // Consulta de Posts/Comentarios (limpia)
    const { data: postsData, error: postsError } = await supabase
      .from('post')
      .select('id, content, created_at, formation_data, profiles(username, avatar_url)') // Pedimos la nueva columna
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });
    
    if (postsError) {
      console.error("Error fetching replies:", postsError);
    }

    // Adaptar los datos de Posts
    let adaptedReplies: Reply[] = [];
    if (postsData) {
      adaptedReplies = (postsData as SupabasePostData[]).map(post => {
        const profile = post.profiles ? post.profiles[0] : null; 
        return {
          id: post.id,
          content: post.content || '',
          author: profile?.username || 'Anónimo', 
          authorAvatar: profile?.avatar_url || '/default-avatar.png', 
          formation: post.formation_data || undefined, // Añadimos la formación si existe
          timestamp: new Date(post.created_at),
        };
      });
    }

    // Adaptar los datos del Hilo
    if (threadData) {
      const data = threadData as SupabaseThreadData; 
      const profile = data.profiles ? data.profiles[0] : null;
      
      setThread({
        id: data.id,
        title: data.title,
        content: data.content || '',
        author: profile?.username || 'Anónimo', 
        authorAvatar: profile?.avatar_url || '/default-avatar.png', 
        formation: data.formation_data || { name: 'N/A', players: [] },
        timestamp: new Date(data.created_at),
        replies: adaptedReplies, // Inyectamos los comentarios adaptados
        views: 0, 
        likes: 0, 
      });
    }
    
    setLoading(false);
  }

  useEffect(() => {
    fetchThreadAndReplies();
  }, [threadId]);

  // --- 3. FUNCIÓN PARA AÑADIR COMENTARIOS ---
  const handleAddReply = async (threadId: number, reply: Omit<Reply, 'id' | 'timestamp'>) => {
    if (!user || !thread) {
      alert("Debes iniciar sesión para comentar.");
      router.push('/login');
      return;
    }
    
    // 🚨 CAMBIO AQUÍ: Añadimos 'formation_data' a la inserción
    const { data, error } = await supabase
      .from('post')
      .insert({
        content: reply.content,     
        formation_data: reply.formation, // <-- Se añade la alineación
        thread_id: threadId,        
        user_id: user.id,           
      })
      .select();

    if (error) {
      alert("Error al publicar la respuesta: " + error.message);
    } else if (data) {
      // Si funciona, volvemos a cargar todo para mostrar el nuevo comentario
      await fetchThreadAndReplies();
    }
  };

  // --- 4. RENDERIZADO DE LA PÁGINA ---
  if (loading && !thread) { // Carga inicial
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
        <Header />
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
        </div>
      </main>
    );
  }

  if (!thread) { // Si no se encontró el hilo
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
        <Header />
        <p className="text-center text-white text-lg p-10">
          Hilo no encontrado. (ID buscado: {threadId}) 
          <Link href="/" className="text-sky-300 hover:underline ml-2">Volver al inicio</Link>
        </p>
      </main>
    );
  }

  // Si todo está bien, muestra el Hilo y sus Comentarios
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
      {/* Pasamos un 'pageTitle' personalizado al Header.
        ¡Asegúrate de que tu Header.tsx esté preparado para recibir esta prop!
      */}
      <Header pageTitle={thread.title} />

      <div className="container mx-auto px-4 py-8">
        <ThreadDetail
          thread={thread}
          onAddReply={handleAddReply} 
          onClose={() => router.push('/')} 
          currentUser={user ? (user.user_metadata?.username || user.email) : null} 
        />
      </div>
    </main>
  );
}
