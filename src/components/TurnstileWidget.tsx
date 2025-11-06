'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { AlertCircle, CheckCircle2, Loader2, RotateCcw } from 'lucide-react'

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void
    }
    __tsCb?: (token: string) => void
    __tsErr?: (error?: string) => void
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

  // Montaje y datos básicos
  useEffect(() => {
    setMounted(true)
    setHostname(window.location.hostname)
    setSiteKey(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  }, [])

  // Callbacks globales para auto-render
  useEffect(() => {
    if (!mounted) return
    window.__tsCb = (token: string) => {
      setStatus('ready')
      setLastError(undefined)
      onSuccess(token)
    }
    window.__tsErr = (error?: string) => {
      setStatus('error')
      setLastError(error || 'render-error')
      onError?.()
    }
    return () => {
      delete window.__tsCb
      delete window.__tsErr
    }
  }, [mounted, onSuccess, onError])

  // Retry: reconstruir el div auto-render
  const retry = () => {
    setStatus('loading')
    setLastError(undefined)
    try { window.turnstile?.reset() } catch {}
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      const div = document.createElement('div')
      div.className = 'cf-turnstile'
      div.setAttribute('data-sitekey', siteKey || '')
      div.setAttribute('data-theme', 'dark')
      div.setAttribute('data-callback', '__tsCb')
      div.setAttribute('data-error-callback', '__tsErr')
      div.setAttribute('data-retry', 'auto')
      div.setAttribute('data-refresh-expired', 'auto')
      containerRef.current.appendChild(div)
    }
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
      {/* Script de Turnstile (fiable en Vercel) */}
      <Script
        id="cf-turnstile-script"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onError={() => {
          setStatus('error')
          setLastError('script-load-error')
          onError?.()
        }}
      />
      {/* Contenedor auto-render (sin render programático) */}
      <div ref={containerRef} className="flex justify-center">
        {/* Si el script aún no está listo, dejamos el div preparado */}
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme="dark"
          data-callback="__tsCb"
          data-error-callback="__tsErr"
          data-retry="auto"
          data-refresh-expired="auto"
        />
      </div>

      {/* Estados UI */}
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
                <p className="font-semibold mb-1">No se pudo cargar Cloudflare Turnstile</p>
                <p className="text-[10px] text-slate-400">
                  Hostname: <b>{hostname}</b> • SiteKey: <b>{siteKey.slice(0, 8)}…</b> • Error: <b>{lastError}</b>
                </p>
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
