'use client'

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Thread, Reply, Formation } from '@/types'; // Quitamos PlayerData (no se usa aquí)
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ThreadDetail } from '@/components/ThreadDetail';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ThreadPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  
  // Asumiendo que tu carpeta es [threadId] (minúscula i)
  const threadId = params.threadId as string; 

  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchThreadAndReplies = useCallback(async () => {
    if (!threadId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    
    // Consulta del Hilo - intentemos sin especificar la foreign key
    const { data: threadData, error: threadError } = await supabase
      .from('threads')
      .select(`
        id, 
        title, 
        content, 
        created_at, 
        formation_data,
        user_id,
        profiles(username, avatar_url)
      `)
      .eq('id', threadId)
      .single(); 

    if (threadError) {
      console.error("Error fetching thread:", threadError); 
      setLoading(false);
      return;
    }

    // Consulta de Posts/Comentarios
    const { data: postsData, error: postsError } = await supabase
      .from('post')
      .select(`
        id, 
        content, 
        created_at, 
        formation_data,
        user_id,
        profiles(username, avatar_url)
      `)
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });
    
    if (postsError) {
      console.error("Error fetching replies:", postsError);
    }

    // Log completo para debug
    console.log('RAW Thread Data:', threadData);
    console.log('RAW Posts Data:', postsData);

    // Adaptar los datos de Posts
    let adaptedReplies: Reply[] = [];
    if (postsData) {
      adaptedReplies = postsData.map((post: unknown) => {
        const postData = post as {
          id: number
          content: string
          created_at: string
          formation_data: unknown
          user_id: string
          profiles: unknown
        }

        // Probar diferentes estructuras
        let profile = null;
        
        if (Array.isArray(postData.profiles) && postData.profiles.length > 0) {
          profile = postData.profiles[0];
        } else if (postData.profiles && !Array.isArray(postData.profiles)) {
          profile = postData.profiles;
        }
        
        console.log('Processing reply:', {
          post_id: postData.id,
          user_id: postData.user_id,
          profiles_raw: postData.profiles,
          profile_extracted: profile,
          username: profile?.username
        });

        const formationData = postData.formation_data as Formation | null;
        const isValidFormation = formationData && 
          typeof formationData === 'object' && 
          'name' in formationData && 
          'players' in formationData;

        return {
          id: postData.id,
          content: postData.content || '',
          author: profile?.username || `Usuario #${postData.user_id?.slice(0, 8)}` || 'Anónimo',
          authorAvatar: profile?.avatar_url || '/default-avatar.png',
          formation: isValidFormation ? formationData : undefined,
          timestamp: new Date(postData.created_at),
        };
      });
    }

    // Adaptar los datos del Hilo
    if (threadData) {
      // Probar diferentes estructuras para el thread
      let profile = null;
      
      if (Array.isArray(threadData.profiles) && threadData.profiles.length > 0) {
        profile = threadData.profiles[0];
      } else if (threadData.profiles && !Array.isArray(threadData.profiles)) {
        profile = threadData.profiles;
      }
      
      console.log('Processing thread:', {
        thread_id: threadData.id,
        user_id: threadData.user_id,
        profiles_raw: threadData.profiles,
        profile_extracted: profile,
        username: profile?.username
      });
      
      setThread({
        id: threadData.id,
        title: threadData.title,
        content: threadData.content || '',
        author: profile?.username || `Usuario #${threadData.user_id?.slice(0, 8)}` || 'Anónimo',
        authorAvatar: profile?.avatar_url || '/default-avatar.png',
        formation: threadData.formation_data || { name: 'N/A', players: [] },
        timestamp: new Date(threadData.created_at),
        replies: adaptedReplies,
        views: 0, 
        likes: 0, 
      });
    }
    
    setLoading(false);
  }, [threadId]);

  useEffect(() => {
    fetchThreadAndReplies();
  }, [fetchThreadAndReplies]);

  // --- 3. FUNCIÓN PARA AÑADIR COMENTARIOS ---
  const handleAddReply = async (threadId: number, reply: Omit<Reply, 'id' | 'timestamp'>) => {
    if (!user || !thread) {
      alert("Debes iniciar sesión para comentar.");
      router.push('/login');
      return;
    }
    
    
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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          <Header />
        </div>
        <div className="flex justify-center items-center p-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-orange-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Cargando hilo...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!thread) { // Si no se encontró el hilo
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          <Header />
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Hilo no encontrado</h2>
            <p className="text-slate-400 mb-6">El hilo que buscas no existe o ha sido eliminado.</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Si todo está bien, muestra el Hilo y sus Comentarios
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        <Header />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Efecto de brillo superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-orange-500/20 blur-2xl" />
        
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
