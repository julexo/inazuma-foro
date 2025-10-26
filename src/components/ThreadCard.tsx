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
    <div className="bg-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-4">
        <Image
          src={avatarUrl}
          alt={`Avatar de ${author}`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <span className="font-semibold text-slate-900">{author}</span>
          <span className="text-sm text-black"> · {timestamp}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Link href={`/threads/${id}`} className="group">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            {/* Este es el popup "Vista previa" que se ve en tu captura, pero es complejo
                para un ejemplo simple, así que lo omitimos por ahora. */}
          </Link>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {tag}
          </span>
        </div>
        <p className="text-black">
          {previewText}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-black">
          <span className="flex items-center gap-1.5 text-sm">
            <MessageSquare size={16} /> {comments}
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <Eye size={16} /> {views}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-pink-600 font-semibold">
          <Heart size={16} className="fill-current" /> {likes}
        </div>
      </div>
    </div>
  )
}