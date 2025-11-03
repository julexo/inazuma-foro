'use client'

import { useState, useRef, useCallback } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface ImageCropDialogProps {
  open: boolean
  imageSrc: string | null
  onCropComplete: (croppedImage: Blob) => void
  onClose: () => void
}

export function ImageCropDialog({ open, imageSrc, onCropComplete, onClose }: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [processing, setProcessing] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const cropSize = Math.min(width, height)
    const cropPercentage = (cropSize / Math.max(width, height)) * 100

    setCrop({
      unit: '%',
      width: cropPercentage,
      height: cropPercentage,
      x: (100 - cropPercentage) / 2,
      y: (100 - cropPercentage) / 2
    })
  }, [])

  async function getCroppedImg(): Promise<Blob | null> {
    if (!completedCrop || !imgRef.current) {
      return null
    }

    const image = imgRef.current
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width
    canvas.height = completedCrop.height

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        'image/jpeg',
        0.95
      )
    })
  }

  const handleSave = async () => {
    setProcessing(true)
    try {
      const croppedImage = await getCroppedImg()
      if (croppedImage) {
        onCropComplete(croppedImage)
      }
    } catch (error) {
      console.error('Error al recortar imagen:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Ajusta tu foto de perfil</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center items-center bg-slate-900/50 rounded-lg p-4 min-h-[400px]">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                className="max-h-[500px] max-w-full"
              />
            </ReactCrop>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={processing}
            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={processing}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Guardar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
