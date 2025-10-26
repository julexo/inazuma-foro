'use client'
import { useState } from 'react';
import { Thread, Reply } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormationField } from '@/components/FormationField';
import { X, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ThreadDetailProps {
  thread: Thread;
  onAddReply: (threadId: number, reply: Omit<Reply, 'id' | 'timestamp'>) => void;
  onClose: () => void;
  currentUser: string | null;
}

export function ThreadDetail({ thread, onAddReply, onClose, currentUser }: ThreadDetailProps) {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmitReply = () => {
    if (currentUser && replyContent.trim()) {
      // Generate a random avatar for the reply
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.replace(/\s+/g, '')}&backgroundColor=${['0ea5e9', 'fb923c', '1e3a8a', 'fbbf24', '06b6d4'][Math.floor(Math.random() * 5)]}`;
      
      onAddReply(thread.id, {
        author: currentUser,
        authorAvatar: avatarUrl,
        content: replyContent,
      });
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-white/95 backdrop-blur-sm border-sky-200 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Avatar className="h-12 w-12 border-2 border-sky-300">
                <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                <AvatarFallback className="bg-sky-500 text-white">
                  {thread.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sky-900">{thread.title}</h2>
                  <Badge className="bg-gradient-to-r from-sky-500 to-blue-600 shadow-md">{thread.formation.name}</Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sky-800">{thread.author}</span>
                  <span>·</span>
                  <span>{formatDate(thread.timestamp)}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p>{thread.content}</p>

          <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-lg border-2 border-sky-300 shadow-inner">
            <h4 className="mb-3 text-sky-800">Alineación propuesta</h4>
            <FormationField formation={thread.formation} />
          </div>
        </div>
      </Card>

      {thread.replies.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sky-900">{thread.replies.length} {thread.replies.length === 1 ? 'Respuesta' : 'Respuestas'}</h3>
          {thread.replies.map((reply) => (
            <Card key={reply.id} className="p-4 bg-white/95 backdrop-blur-sm border-sky-200 shadow-md">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border-2 border-sky-200">
                    <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                    <AvatarFallback className="bg-sky-500 text-white">
                      {reply.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sky-800">{reply.author}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{formatDate(reply.timestamp)}</span>
                    </div>
                    <p>{reply.content}</p>
                    {reply.formation && (
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border-2 border-orange-300 shadow-inner">
                        <h4 className="mb-3 text-orange-800">{reply.formation.name}</h4>
                        <FormationField formation={reply.formation} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!showReplyForm ? (
        <Button 
          onClick={() => setShowReplyForm(true)} 
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg"
          disabled={!currentUser}
        >
          <Send className="mr-2 h-4 w-4" />
          {currentUser ? 'Responder' : 'Inicia sesión para responder'}
        </Button>
      ) : (
        <Card className="p-4 bg-white/95 backdrop-blur-sm border-sky-200 shadow-lg">
          <div className="space-y-4">
            <h3 className="text-sky-900">Tu respuesta</h3>
            <Textarea
              placeholder="Escribe tu respuesta..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmitReply}
                className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md"
                disabled={!replyContent.trim()}
              >
                Publicar Respuesta
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowReplyForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
