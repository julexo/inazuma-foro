import { Thread } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Eye, Heart } from 'lucide-react';

interface ThreadListProps {
  threads: Thread[];
  onThreadClick: (thread: Thread) => void;
  onToggleLike: (threadId: number) => void;
  selectedThreadId?: number;
  totalThreads?: number;
  filteredCount?: number;
}

export function ThreadList({ threads, onThreadClick, onToggleLike, selectedThreadId, totalThreads, filteredCount }: ThreadListProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sky-900">Hilos Recientes</h2>
        {totalThreads !== undefined && filteredCount !== undefined && filteredCount < totalThreads && (
          <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200">
            {filteredCount} de {totalThreads}
          </Badge>
        )}
      </div>
      {threads.length === 0 ? (
        <Card className="p-8 text-center bg-white/95 backdrop-blur-sm border-sky-200 shadow-lg">
          <p className="text-muted-foreground">No se encontraron hilos que coincidan con tu búsqueda.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => (
          <Card
            key={thread.id}
            className={`p-4 transition-all hover:shadow-lg hover:border-sky-300 ${
              selectedThreadId === thread.id ? 'ring-2 ring-sky-500 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-300' : 'bg-white/95 backdrop-blur-sm border-sky-200'
            }`}
          >
            <div className="space-y-3">
              {/* Header con avatar y título */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border-2 border-sky-200 cursor-pointer" onClick={() => onThreadClick(thread)}>
                  <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                  <AvatarFallback className="bg-sky-500 text-white">
                    {thread.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onThreadClick(thread)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sky-900">{thread.author}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{formatDate(thread.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-sky-900">{thread.title}</h3>
                    <Badge variant="secondary" className="shrink-0 bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 border-sky-300">
                      {thread.formation.name}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground line-clamp-2 cursor-pointer" onClick={() => onThreadClick(thread)}>{thread.content}</p>
              
              {/* Footer con estadísticas y like */}
              <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                <div className="flex items-center gap-4 text-sky-600">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{thread.replies.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{thread.views}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-2 hover:bg-pink-50 hover:text-pink-600 text-pink-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(thread.id);
                  }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                  <span>{thread.likes}</span>
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
