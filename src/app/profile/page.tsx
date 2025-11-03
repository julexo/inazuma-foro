'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, Camera, Save, AlertCircle, CheckCircle } from 'lucide-react'
import { ImageCropDialog } from '@/components/ImageCropDialog'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [profile, setProfile] = useState({
    username: '',
    firstName: '',
    lastName: '',
    avatar_url: ''
  })

  const fetchProfile = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error en fetchProfile:', error)
        throw error
      }

      console.log('Datos del perfil cargados:', data)

      if (data) {
        setProfile({
          username: data.username || '',
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          avatar_url: data.avatar_url || ''
        })
      }
    } catch (error: unknown) {
      console.error('Error cargando perfil:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      setError('Error al cargar el perfil: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
      return
    }
    if (user) {
      fetchProfile()
    }
  }, [user, loading, router, fetchProfile])

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    const file = event.target.files[0]

    // Validar tamaño (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no debe superar 2MB')
      return
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes')
      return
    }

    // Crear preview de la imagen
    const reader = new FileReader()
    reader.onload = () => {
      setSelectedImage(reader.result as string)
      setCropDialogOpen(true)
    }
    reader.readAsDataURL(file)
  }

  async function handleCropComplete(croppedBlob: Blob) {
    try {
      setUploading(true)
      setError(null)
      setCropDialogOpen(false)

      const fileExt = 'jpg'
      const fileName = `${user!.id}-${Date.now()}.${fileExt}`
      const filePath = `${user!.id}/${fileName}`

      // Eliminar avatar anterior si existe
      if (profile.avatar_url && profile.avatar_url.includes('avatars')) {
        const urlParts = profile.avatar_url.split('/')
        const oldFileName = urlParts[urlParts.length - 1]
        await supabase.storage
          .from('avatars')
          .remove([`${user!.id}/${oldFileName}`])
      }

      // Subir nueva imagen recortada
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, croppedBlob, { 
          contentType: 'image/jpeg',
          upsert: true 
        })

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Actualizar perfil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', user!.id)

      if (updateError) throw updateError

      setProfile(prev => ({ ...prev, avatar_url: urlData.publicUrl }))
      setSuccess('Foto de perfil actualizada')
      
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error subiendo avatar:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al subir la imagen'
      setError(errorMessage)
    } finally {
      setUploading(false)
      setSelectedImage(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      console.log('Intentando actualizar con:', {
        username: profile.username,
        first_name: profile.firstName,
        last_name: profile.lastName
      })

      const { data, error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          first_name: profile.firstName,
          last_name: profile.lastName
        })
        .eq('id', user!.id)
        .select()

      if (error) {
        console.error('Error en la actualización:', error)
        throw error
      }

      console.log('Datos actualizados:', data)

      setSuccess('Perfil actualizado correctamente')
      
      // En lugar de recargar la página, solo refrescamos el header
      // Esperar un momento antes de limpiar el mensaje
      setTimeout(() => {
        setSuccess(null)
        // Opcional: refrescar solo el componente Header
        router.refresh()
      }, 2000)
      
    } catch (error) {
      console.error('Error actualizando perfil:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el perfil'
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
        <Header />
        <div className="flex justify-center items-center p-20">
          <Loader2 className="h-12 w-12 text-orange-400 animate-spin" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        <Header />

        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                Mi Perfil
              </CardTitle>
              <CardDescription className="text-slate-400">
                Administra tu información personal y foto de perfil
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Mensajes */}
              {error && (
                <div className="bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-900/40 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">{success}</span>
                </div>
              )}

              {/* Foto de perfil */}
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                  
                  <div className="relative">
                    <Avatar className="h-32 w-32 shadow-2xl">
                      <AvatarImage 
                        src={profile.avatar_url || '/default-avatar.png'} 
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-4xl font-bold">
                        {profile.username?.slice(0, 2).toUpperCase() || 'US'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute -bottom-2 -right-2 p-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-xl transition-all duration-300 group-hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Camera className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-200 mb-1">
                    Haz clic en la cámara para cambiar tu foto
                  </p>
                  <p className="text-xs text-slate-400">
                    JPG, PNG o GIF (máx. 2MB)
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-200">
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-slate-900/50 border-slate-700 text-white"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-200">
                      Apellidos
                    </Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-slate-900/50 border-slate-700 text-white"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200">
                    Nombre de Usuario
                  </Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-slate-900/50 border-slate-700 text-white"
                    placeholder="tu_usuario"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-200">Email</Label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="bg-slate-900/30 border-slate-700 text-slate-400"
                  />
                  <p className="text-xs text-slate-500">
                    El email no se puede cambiar
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de recorte de imagen */}
      <ImageCropDialog
        open={cropDialogOpen}
        imageSrc={selectedImage}
        onCropComplete={handleCropComplete}
        onClose={() => {
          setCropDialogOpen(false)
          setSelectedImage(null)
        }}
      />
    </main>
  )
}
