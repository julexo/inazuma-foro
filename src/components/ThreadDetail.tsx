'use client'

import { useState } from 'react';
// 1. Importa los tipos y componentes necesarios
import { Thread, Reply, Formation } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormationField } from '@/components/FormationField'; // Para MOSTRAR alineaciones
import { X, Send, Grid, Layers } from 'lucide-react'; // Iconos (Grid y Layers son nuevos)
import { Badge } from '@/components/ui/badge';
import {Label} from "@/components/ui/label"

// 2. Importa el BUILDER y las formaciones
import { DragDropFormationBuilder } from '@/components/builder/DragDropFormationBuilder';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formationsDatabase, formationNames } from '@/lib/formationDatabase' // Asegúrate de que esta ruta es correcta

interface ThreadDetailProps {
  thread: Thread;
  onAddReply: (threadId: number, reply: Omit<Reply, 'id' | 'timestamp'>) => void;
  onClose: () => void;
  currentUser: string | null;
}

export function ThreadDetail({ thread, onAddReply, onClose, currentUser }: ThreadDetailProps) {
  // --- Estados para el formulario de respuesta ---
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  // --- 3. Nuevos estados para el constructor de alineación de la respuesta ---
  const [showReplyBuilder, setShowReplyBuilder] = useState(false);
  const [replyFormation, setReplyFormation] = useState<Formation>(formationsDatabase["4-4-2"]); // Formación por defecto
  const [replyFormationName, setReplyFormationName] = useState<string>("4-4-2");
  // ---

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Función para cambiar la formación base de la respuesta
  const handleFormationChange = (key: string) => {
    setReplyFormationName(key);
    if (key in formationsDatabase) {
      setReplyFormation(formationsDatabase[key as keyof typeof formationsDatabase]);
    }
  }

  // --- 4. Lógica de envío de respuesta actualizada ---
  const handleSubmitReply = () => {
    if (currentUser && replyContent.trim()) {
      // Genera un avatar simple (o usa uno del contexto si lo tienes)
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.replace(/\s+/g, '')}`;
      
      // Prepara el objeto 'reply'
      const replyObject: Omit<Reply, 'id' | 'timestamp'> = {
        author: currentUser,
        authorAvatar: avatarUrl,
        content: replyContent,
        // Añade la formación SÓLO SI el builder estaba visible
        formation: showReplyBuilder ? { ...replyFormation, name: replyFormationName } : undefined
      };

      // Llama a la función del padre (de [threadId]/page.tsx)
      onAddReply(thread.id, replyObject);

      // Resetea el formulario
      setReplyContent('');
      setShowReplyForm(false);
      setShowReplyBuilder(false);
      setReplyFormation(formationsDatabase["4-4-2"]); // Resetea a la formación por defecto
      setReplyFormationName("4-4-2");
    }
  };
  // ---

  return (
    <div className="space-y-4">
      {/* HILO PRINCIPAL */}
      <Card className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 shadow-xl text-slate-100">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Avatar className="h-12 w-12 border-2 border-sky-500">
                <AvatarImage src={thread.authorAvatar} alt={thread.author} />
                <AvatarFallback className="bg-sky-700 text-white">
                  {thread.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 flex-1 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{thread.title}</h2>
                  {thread.formation?.name && (
                    <Badge className="bg-gradient-to-r from-sky-500 to-blue-600 shadow-md border border-sky-400 text-white">
                      {thread.formation.name}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="font-medium text-slate-200">{thread.author}</span>
                  <span>·</span>
                  <span>{formatDate(thread.timestamp)}</span>
                </div>
              </div>
            </div>
            {/* Botón Cerrar (en página de detalle completa, puede redirigir) */}
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-700">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4">
          <p className="text-slate-200 whitespace-pre-wrap">{thread.content}</p>

          {/* Alineación del Hilo Principal */}
          {thread.formation?.players?.length > 0 && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 shadow-inner">
              <h4 className="mb-3 font-semibold text-sky-300">Alineación propuesta</h4>
              <FormationField formation={thread.formation} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* SECCIÓN DE RESPUESTAS (Comentarios) */}
      {thread.replies.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">{thread.replies.length} {thread.replies.length === 1 ? 'Respuesta' : 'Respuestas'}</h3>
          {thread.replies.map((reply) => (
            <Card key={reply.id} className="p-4 bg-slate-800/60 backdrop-blur-sm border border-slate-700 shadow-md text-slate-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border-2 border-slate-600">
                    <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                    <AvatarFallback className="bg-sky-700 text-white">
                      {reply.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-slate-100">{reply.author}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-400">{formatDate(new Date(reply.timestamp))}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{reply.content}</p>
                    
                    {/* 5. Muestra la alineación SI existe en la respuesta */}
                    {reply.formation && reply.formation.players?.length > 0 && (
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 shadow-inner mt-4">
                        <h4 className="mb-3 font-semibold text-orange-300">
                          Respuesta con alineación: {reply.formation.name}
                        </h4>
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

      {/* FORMULARIO DE NUEVA RESPUESTA */}
      {!showReplyForm ? (
        // Botón para MOSTRAR el formulario
        <Button 
          onClick={() => setShowReplyForm(true)} 
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg text-white font-semibold text-base py-6"
          disabled={!currentUser}
        >
          <Send className="mr-2 h-4 w-4" />
          {currentUser ? 'Escribir una respuesta' : 'Inicia sesión para responder'}
        </Button>
      ) : (
        // Formulario que se muestra al hacer clic
        <Card className="p-4 sm:p-6 bg-slate-800/60 backdrop-blur-sm border border-slate-700 shadow-lg">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Tu respuesta</h3>
            <Textarea
              placeholder="Escribe tu comentario..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
              className="bg-slate-900 border-slate-700 text-white focus:ring-sky-500"
            />
            
            {/* 6. Botón para mostrar/ocultar el constructor */}
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-sky-800/50 border-sky-700 text-sky-200 hover:bg-sky-700 hover:text-white"
              onClick={() => setShowReplyBuilder(!showReplyBuilder)}
            >
              {showReplyBuilder ? <Layers className="mr-2 h-4 w-4" /> : <Grid className="mr-2 h-4 w-4" />}
              {showReplyBuilder ? 'Ocultar Alineación' : 'Añadir Alineación'}
            </Button>

            {/* 7. Constructor condicional */}
            {showReplyBuilder && (
              <div className="space-y-4 p-4 rounded-md border border-slate-700 bg-slate-900/50">
                 <div className="space-y-2">
                   <Label className="text-lg text-slate-200">Elige una Formación Base</Label>
                   <Select onValueChange={handleFormationChange} defaultValue={replyFormationName}>
                     <SelectTrigger className="w-full sm:w-[280px] bg-slate-800 border-slate-700 text-white focus:ring-sky-500">
                       <SelectValue />
                     </SelectTrigger>
                     <SelectContent className="bg-slate-900 text-white border-slate-700">
                       {formationNames.map((name) => (
                         <SelectItem key={name} value={name} className="focus:bg-slate-700">{name}</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
                 <DragDropFormationBuilder 
                   formation={replyFormation}
                   onFormationChange={setReplyFormation}
                 />
              </div>
            )}
            
            {/* Botones de Publicar / Cancelar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleSubmitReply}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md text-white font-semibold"
                disabled={!replyContent.trim()} // Deshabilitado si no hay texto
              >
                <Send className="mr-2 h-4 w-4" />
                Publicar Respuesta
              </Button>
              <Button 
                variant="outline" 
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-700"
                onClick={() => {
                  setShowReplyForm(false); 
                  setShowReplyBuilder(false); 
                  setReplyContent('');
                }}
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

