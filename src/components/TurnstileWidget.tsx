'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, RotateCcw } from 'lucide-react'

interface TurnstileOptions {
  sitekey: string
  theme?: string
  retry?: string
  'refresh-expired'?: string
  callback?: (token: string) => void
  'error-callback'?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string
      reset: (widgetId?: string) => void
    }
  }
}

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void
  onError?: () => void
}

export function TurnstileWidget({ onSuccess, onError }: TurnstileWidgetProps) {
  const [mounted, setMounted] = useState(false)
  const [hostname, setHostname] = useState('')
  const [siteKey, setSiteKey] = useState<string | undefined>(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)

  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [lastError, setLastError] = useState<string | undefined>(undefined)

  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const renderedRef = useRef(false)          // evita renders duplicados (StrictMode)
  const scriptAppendedRef = useRef(false)    // evita insertar el script más de una vez

  // Montaje + hostname + siteKey desde env (una única key para todos los entornos)
  useEffect(() => {
    setMounted(true)
    setHostname(window.location.hostname)
    setSiteKey(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  }, [])

  // Cargar script (solo una vez)
  useEffect(() => {
    if (!mounted) return
    if (window.turnstile) return
    if (scriptAppendedRef.current) return

    const id = 'cf-turnstile-script'
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      s.async = true
      s.defer = true
      s.onerror = () => { setStatus('error'); setLastError('script-load-error') }
      document.body.appendChild(s)
    }
    scriptAppendedRef.current = true
  }, [mounted])

  // Render programático único
  useEffect(() => {
    if (!mounted || !siteKey || renderedRef.current === true) return

    const tryRender = () => {
      if (!window.turnstile || !containerRef.current) return false
      try {
        // limpiar contenedor por seguridad
        containerRef.current.innerHTML = ''
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          retry: 'auto',
          'refresh-expired': 'auto',
          callback: (token: string) => {
            setStatus('ready')
            setLastError(undefined)
            onSuccess(token)
          },
          'error-callback': () => {
            setStatus('error')
            setLastError('render-error')
            onError?.()
          },
        })
        renderedRef.current = true
        return true
      } catch {
        return false
      }
    }

    // intento inmediato y pequeño reintento si aún no está disponible
    if (!tryRender()) {
      const t = setTimeout(tryRender, 250)
      return () => clearTimeout(t)
    }
  }, [mounted, siteKey, onSuccess, onError])

  const retry = () => {
    setStatus('loading')
    setLastError(undefined)
    try { if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current) } catch {}
    renderedRef.current = false
    // reintentar un render limpio
    if (containerRef.current) containerRef.current.innerHTML = ''
    // el efecto de arriba volverá a intentar montar
    setTimeout(() => setStatus('loading'), 0)
  }

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-xs justify-center">
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Inicializando verificación…</span>
      </div>
    )
  }

  if (!siteKey) {
    return (
      <div className="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg border border-red-500/30">
        ⚠️ NEXT_PUBLIC_TURNSTILE_SITE_KEY no configurada
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div ref={containerRef} className="flex justify-center" />
      {status === 'loading' && (
        <div className="flex items-center gap-2 text-slate-400 text-xs justify-center">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Cargando verificación…</span>
        </div>
      )}
      {status === 'ready' && (
        <div className="flex items-center gap-2 text-green-400 text-xs justify-center">
          <CheckCircle2 className="h-3 w-3" />
          <span>Verificado</span>
        </div>
      )}
      {status === 'error' && (
        <div className="space-y-2">
          <div className="text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded border border-red-500/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">No se pudo inicializar la verificación</p>
                <p className="text-[10px] text-slate-400">
                  Hostname: <b>{hostname}</b>
                </p>
                {lastError && <p className="text-[10px] text-red-300 mt-1">Detalle: {lastError}</p>}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-slate-700/60 hover:bg-slate-700 text-white border border-slate-600"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reintentar
          </button>
        </div>
      )}
    </div>
  )
}
