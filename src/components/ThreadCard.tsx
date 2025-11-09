// src/components/ThreadCard.tsx

import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare, Eye, Heart } from 'lucide-react'

// Definimos los 'props' para hacer el componente reutilizable
type ThreadCardProps = {
  id: string | number;
  author: string;
  avatarUrl: string;
  timestamp: string;
  title: string;
  previewText: string;
  tag: string;
  comments: number;
  views: number;
  likes: number;
}

export default function ThreadCard({
  id, author, avatarUrl, timestamp, title, previewText, tag, comments, views, likes
}: ThreadCardProps) {
  return (
    // ✅ CAMBIO: Padding más pequeño en móvil (p-4)
    <div className="bg-slate-100 p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={avatarUrl}
          alt={`Avatar de ${author}`}
          width={48}
          height={48}
          // ✅ CAMBIO: Avatar más pequeño en móvil (h-10 w-10)
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <div>
          <span className="font-semibold text-slate-900">{author}</span>
          {/* ✅ CAMBIO: Timestamp más pequeño en móvil */}
          <span className="text-xs sm:text-sm text-black"> · {timestamp}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Link href={`/threads/${id}`} className="group">
            {/* ✅ CAMBIO: Título más pequeño en móvil */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>
          {/* ✅ CAMBIO: Ocultamos el tag en pantallas muy pequeñas (opcional) */}
          <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        </div>
        <p className="text-black text-sm sm:text-base">
          {previewText}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-black">
          {/* Los comentarios son importantes, los dejamos */}
          <span className="flex items-center gap-1.5 text-sm">
            <MessageSquare size={16} /> {comments}
          </span>
          
          {/* ✅ CAMBIO: Ocultamos Vistas en móvil (hidden) y mostramos en sm: y más */}
          <span className="hidden sm:flex items-center gap-1.5 text-sm">
            <Eye size={16} /> {views}
          </span>
        </div>
        
        {/* ✅ CAMBIO: Ocultamos Likes en móvil (hidden) y mostramos en sm: y más */}
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-pink-600 font-semibold">
          <Heart size={16} className="fill-current" /> {likes}
        </div>
      </div>
    </div>
  )
}