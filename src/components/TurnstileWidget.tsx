'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          theme?: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          appearance?: 'always' | 'execute' | 'interaction-only'
        }
      ) => string
      reset: (widgetId?: string) => void
    }
    __cfTurnstileLoaded?: boolean
  }
}

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void
  onError?: () => void
}

export function TurnstileWidget({ onSuccess, onError }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const renderedRef = useRef(false)
  const widgetIdRef = useRef<string | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Carga única del script (evitar múltiples inyecciones)
  useEffect(() => {
    const SCRIPT_ID = 'cf-turnstile-script'

    // Si ya está disponible, marcamos como cargado
    if (window.turnstile) {
      setIsLoaded(true)
      return
    }

    // Si el script ya está en el DOM, esperar a que exponga window.turnstile
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      const check = setInterval(() => {
        if (window.turnstile) {
          clearInterval(check)
          setIsLoaded(true)
        }
      }, 100)
      const timeout = setTimeout(() => {
        clearInterval(check)
        if (!window.turnstile) {
          setErrorMessage('La verificación tardó demasiado en cargar.')
          onError?.()
        }
      }, 8000)
      return () => {
        clearInterval(check)
        clearTimeout(timeout)
      }
    }

    // Inyectar script
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      window.__cfTurnstileLoaded = true
      setIsLoaded(true)
    }
    script.onerror = () => {
      setErrorMessage('No se pudo cargar la verificación. Revisa tu conexión.')
      onError?.()
    }
    document.body.appendChild(script)

    // No eliminamos el script global al desmontar
  }, [onError])

// Renderizar widget (solo una vez)
useEffect(() => {
    if (!siteKey || !isLoaded || !containerRef.current || !window.turnstile || renderedRef.current) return
    const containerEl = containerRef.current!

    try {
      containerEl.innerHTML = ''
      const id = window.turnstile.render(containerEl, {
        sitekey: siteKey,
        theme: 'dark',
        // appearance: 'interaction-only', // <- quitar para evitar errores en algunos navegadores
        callback: (token: string) => {
          setErrorMessage(null)
          onSuccess(token)
        },
        'error-callback': () => {
          setErrorMessage('Error al cargar la verificación. Reintentando...')
          onError?.()
          // Reintento básico tras 1s
          setTimeout(() => {
            try { window.turnstile?.reset(widgetIdRef.current || undefined) } catch {}
          }, 1000)
        },
        'expired-callback': () => {
          setErrorMessage('La verificación expiró. Complétala de nuevo.')
          onError?.()
          try { window.turnstile?.reset(widgetIdRef.current || undefined) } catch {}
        },
      })
      widgetIdRef.current = id
      renderedRef.current = true
    } catch {
      setErrorMessage('No se pudo inicializar la verificación.')
      onError?.()
    }

    return () => {
      // Reset del widget para evitar residuos en navegaciones
      if (widgetIdRef.current) {
        try {
          window.turnstile?.reset(widgetIdRef.current)
        } catch {
          // ignore
        }
      }
      if (containerEl) containerEl.innerHTML = ''
      renderedRef.current = false
      widgetIdRef.current = null
    }
  }, [isLoaded, siteKey, onSuccess, onError])
  return (
    <div className="space-y-2">
      {!siteKey ? (
        <div className="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/30 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error de configuración</p>
            <p className="text-xs mt-1">NEXT_PUBLIC_TURNSTILE_SITE_KEY no está configurada.</p>
          </div>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="flex justify-center min-h-10" />
          {errorMessage && (
            <p className="text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded border border-red-500/20 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </p>
          )}
        </>
      )}
    </div>
  )
}
