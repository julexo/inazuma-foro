'use client' // <--- AÑADE ESTA LÍNEA AL PRINCIPIO

import { Thread } from '@/types'; // Asegúrate que la ruta a types sea correcta
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Eye, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation'; // <--- Importa useRouter

interface ThreadListProps {
  threads: Thread[];
  // selectedThreadId?: number; // Quitamos props que vienen de App.tsx (estado local ahora)
  // totalThreads?: number;
  // filteredCount?: number;
  // onThreadClick: (thread: Thread) => void; // <- Quitamos esta prop
  // onToggleLike: (threadId: number) => void; // <- Quitamos esta prop
}

// Quitamos las props onThreadClick y onToggleLike de la desestructuración
export function ThreadList({ threads }: ThreadListProps) {
  const router = useRouter(); // <--- Inicializa el router aquí

  const formatDate = (date: Date) => {
    // ... (tu función formatDate sigue igual) ...
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return `Ahora`;
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  // Función interna para manejar el click en un hilo
  const handleThreadClick = (threadId: number) => {
    // Navega a la página de detalle del hilo
    router.push(`/threads/${threadId}`);
  };

  // Función interna para manejar el click en 'Like' (Lógica pendiente)
  const handleToggleLike = (threadId: number) => {
    console.log("Like clickeado para el hilo:", threadId);
    // Aquí iría la lógica para actualizar el 'like' en Supabase
    // y posiblemente actualizar el estado local para reflejar el cambio
    alert(`Funcionalidad 'Like' pendiente para hilo ${threadId}`);
  };


  return (
    <div className="space-y-4">
      {/* ... (Título "Hilos Recientes" y Badge si lo necesitas) ... */}
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-white mb-4"> {/* Ajustado color para fondo oscuro */}
           Hilos Recientes
         </h2>
         {/* Badge de conteo (opcional) */}
       </div>

      {threads.length === 0 ? (
        <Card className="p-8 text-center bg-slate-800/50 border-slate-700 shadow-lg"> {/* Estilo oscuro */}
          <p className="text-slate-400">No se encontraron hilos.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
          <Card
            key={thread.id}
            // Usamos la función interna handleThreadClick
            onClick={() => handleThreadClick(thread.id)}
            className={`p-4 transition-all duration-200 ease-in-out cursor-pointer 
                        bg-slate-800/60 border border-slate-700 shadow-md 
                        hover:bg-slate-700/80 hover:border-sky-500 hover:shadow-lg`}
          >
            <div className="space-y-3">
              {/* Header con avatar y título */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-slate-600">
                  <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                  <AvatarFallback className="bg-sky-700 text-white">
                    {thread.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 text-sm">
                    <span className="font-semibold text-slate-100">{thread.author}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-400">{formatDate(thread.timestamp)}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 font-semibold text-slate-50">{thread.title}</h3>
                    {thread.formation?.name && ( // Muestra la formación si existe
                       <Badge variant="secondary" className="shrink-0 bg-sky-900/70 text-sky-200 border-sky-700 text-xs">
                         {thread.formation.name}
                       </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenido (preview) */}
              <p className="text-slate-300 line-clamp-2 text-sm">{thread.content}</p>

              {/* Footer con estadísticas y like */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <div className="flex items-center gap-4 text-slate-400">
                  {/* Replies (Aún no implementado) */}
                  {/* <div className="flex items-center gap-1 text-xs">
                    <MessageSquare className="h-3 w-3" />
                    <span>{thread.replies.length}</span>
                  </div> */}
                  <div className="flex items-center gap-1 text-xs">
                    <Eye className="h-3 w-3" />
                    <span>{thread.views}</span>
                  </div>
                </div>

                {/* Botón Like */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1.5 text-pink-400 hover:bg-pink-900/30 hover:text-pink-300"
                  // Usamos la función interna handleToggleLike
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se active el click de la Card
                    handleToggleLike(thread.id);
                  }}
                >
                  <Heart className={`h-4 w-4 ${thread.likes > 0 ? 'fill-current' : ''}`} /> {/* Rellena si hay likes */}
                  <span className="text-xs">{thread.likes}</span>
                </Button>
              </div>
            </div>
          </Card>
          ))}
        </div>
      )}
    </div>
  );
}