'use client' // <- Necesario por useAuth

import { Plus, LogIn, LogOut, User, BookmarkIcon, FileText, UserCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button' // Importamos Button para Logout
import { useAuth } from '@/context/AuthContext' // Importa el hook useAuth
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { useState, useEffect, useMemo, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Header() {
  const { user, signOut, loading } = useAuth()
  const [userProfile, setUserProfile] = useState<{ username: string; avatar_url: string | null } | null>(null)
  const [avatarKey, setAvatarKey] = useState(0) // Para forzar recarga de avatar

  // Memoizar el avatar URL para evitar parpadeos
  const memoizedAvatarUrl = useMemo(() => {
    if (userProfile?.avatar_url) {
      // Añadir timestamp para cache busting solo cuando cambie
      return `${userProfile.avatar_url}?t=${avatarKey}`
    }
    return '/default-avatar.png'
  }, [userProfile?.avatar_url, avatarKey])

  const fetchUserProfile = useCallback(async () => {
    if (!user) return

    try {
      const { data } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single()

      if (data) {
        setUserProfile(data)
      }
    } catch (error: unknown) {
      console.error('Error cargando perfil:', error)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    } else {
      setUserProfile(null)
    }
  }, [user, fetchUserProfile])

  // Listener para actualizar avatar cuando cambie
  useEffect(() => {
    if (!user) return

    // Suscribirse a cambios en la tabla profiles
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          console.log('Perfil actualizado:', payload)
          const newProfile = payload.new as { username: string; avatar_url: string | null }
          setUserProfile(newProfile)
          setAvatarKey(prev => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  // Muestra un estado de carga si es necesario
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-950 via-blue-900 to-slate-900/95 backdrop-blur-sm border-b border-indigo-800/30 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4">
          <div className="animate-pulse h-8 w-48 bg-slate-800 rounded-lg"></div>
          <div className="flex gap-3">
             <div className="animate-pulse h-10 w-24 bg-slate-800 rounded-lg"></div>
             <div className="animate-pulse h-10 w-10 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-950 via-blue-900 to-slate-900/95 backdrop-blur-sm border-b border-indigo-800/30 shadow-xl">
      <div className="relative overflow-hidden">
        {/* Efectos de brillo */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-orange-500/5" />
        
        {/* Líneas decorativas */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_15%,transparent_30%)] animate-[shimmer_2s_infinite]" />
        
        <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4 relative">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
                <Image
                  src="/icon0.svg"
                  alt="Logo Victory Road Foro"
                  width={40}
                  height={40}
                  className="h-12 w-12 relative transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-orange-200 group-hover:to-orange-400 transition-all duration-300 hidden sm:block">
                Victory Road Foro
              </span>
            </Link>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/threads/new"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all duration-300 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Crear Hilo</span>
                </Link>

                {/* Menú desplegable de perfil mejorado */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-orange-500/30 hover:ring-orange-400/50 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 group-hover:opacity-100 opacity-0 transition-opacity" />
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={memoizedAvatarUrl}
                          alt={userProfile?.username || 'Usuario'}
                          className="object-cover"
                          loading="eager"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold">
                          {userProfile?.username?.slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-56 bg-slate-800 border-slate-700 text-slate-200" 
                    align="end"
                  >
                    <DropdownMenuLabel className="text-slate-300">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-white">
                          {userProfile?.username || 'Usuario'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    
                    <DropdownMenuItem asChild className="focus:bg-slate-700 cursor-pointer">
                      <Link href="/profile" className="flex items-center w-full">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Mi Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="focus:bg-slate-700 cursor-pointer">
                      <Link href="/my-threads" className="flex items-center w-full">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Mis Hilos</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="focus:bg-slate-700 cursor-pointer">
                      <Link href="/saved" className="flex items-center w-full">
                        <BookmarkIcon className="mr-2 h-4 w-4" />
                        <span>Hilos Guardados</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-slate-700" />
                    
                    <DropdownMenuItem 
                      className="focus:bg-red-900/50 cursor-pointer text-red-400 focus:text-red-300"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-orange-500/30 font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 text-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-medium py-2 px-4 rounded-lg shadow-lg shadow-orange-900/20 transition-all duration-300 text-sm"
                >
                  <User className="h-4 w-4" />
                  <span>Registrarse</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


