'use client'

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Thread, Reply, Formation } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ThreadDetail } from '@/components/ThreadDetail';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ThreadPage() {
  const { user } = useAuth();
  const params = useParams<{ threadId: string }>(); // Tipado estricto del parámetro
  const router = useRouter();
  const threadId = params.threadId;

  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);

  // Tipos de filas devueltas por Supabase
  type ProfileRow = { username: string | null; avatar_url: string | null } | null
  type ThreadRow = {
    id: string | number
    title: string
    content: string | null
    created_at: string
    user_id: string
    formation_data: Formation | null
    profiles: ProfileRow | ProfileRow[] | null
  }
  type PostRow = {
    id: string | number
    content: string | null
    created_at: string
    user_id: string
    formation_data: Formation | null
    profiles: ProfileRow | ProfileRow[] | null
  }

  const fetchThreadAndReplies = useCallback(async () => {
    if (!threadId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    
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
    
    // Adapt replies -> Reply
    let adaptedReplies: Reply[] = []
    if (postsError) {
      console.error("Error fetching replies:", postsError);
    } else if (postsData) {
      adaptedReplies = (postsData as PostRow[]).map((post): Reply => {
        let profile: ProfileRow = null
        const raw = post.profiles
        if (Array.isArray(raw) && raw.length > 0) profile = raw[0]
        else if (raw && !Array.isArray(raw)) profile = raw

        const formation = post.formation_data
        const valid = !!(formation && typeof formation === 'object' && 'name' in formation && 'players' in formation)

        return {
          id: String(post.id),
          thread_id: threadId,
          content: post.content || '',
          created_at: post.created_at,
          user_id: post.user_id,
          formation_data: valid ? (formation as Formation) : undefined,
          users: {
            id: post.user_id,
            email: profile?.username || `Usuario #${post.user_id?.slice(0, 8)}`
          }
        }
      })
    }

    // Adapt thread -> Thread
    if (threadData) {
      const t = threadData as ThreadRow
      let profile: ProfileRow = null
      const raw = t.profiles
      if (Array.isArray(raw) && raw.length > 0) profile = raw[0]
      else if (raw && !Array.isArray(raw)) profile = raw

      setThread({
        id: String(t.id),
        title: t.title,
        content: t.content || '',
        created_at: t.created_at,
        user_id: t.user_id,
        formation_data: t.formation_data || { name: 'N/A', players: [] },
        users: {
          id: t.user_id,
          email: profile?.username || `Usuario #${t.user_id?.slice(0, 8)}`
        },
        replies: adaptedReplies
      })
    }

    setLoading(false);
  }, [threadId]);

  useEffect(() => {
    fetchThreadAndReplies();
  }, [fetchThreadAndReplies]);

  // --- 3. FUNCIÓN PARA AÑADIR COMENTARIOS ---
  const handleAddReply = async (threadId: string, reply: Omit<Reply, 'id' | 'created_at'>) => {
    if (!user || !thread) {
      router.push('/login');
      return;
    }

    const { error } = await supabase
      .from('post')
      .insert({
        content: reply.content,
        formation_data: reply.formation_data,
        thread_id: threadId,
        user_id: user.id,
      })

    if (error) {
      alert("Error al publicar la respuesta: " + error.message);
    } else {
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
