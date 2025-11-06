'use client'

import SignUpForm from '@/components/SignUpForm' // Importa el nuevo formulario de Registro
import Link from 'next/link'
import { useState } from 'react'
import { TurnstileWidget } from '@/components/TurnstileWidget'

export default function SignUpPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
      <div className="w-full max-w-md space-y-6">
        {/* Verificación Cloudflare Turnstile */}
        <div className="bg-slate-800/40 rounded-xl border border-slate-700/40 p-4 shadow mb-2">
          <label className="block text-sm font-semibold text-orange-400 mb-2">
            Verificación de seguridad
          </label>
          <TurnstileWidget
            onSuccess={token => { setCaptchaToken(token); setCaptchaError(null); }}
            onError={() => { setCaptchaToken(null); setCaptchaError('Error en la verificación de seguridad.'); }}
          />
          {captchaError && (
            <p className="text-xs text-red-400 mt-2">{captchaError}</p>
          )}
        </div>
        {/* Formulario de registro, recibe el token */}
        <SignUpForm captchaToken={captchaToken} /> {/* Renderiza el formulario de Registro */}
      </div>
      <p className="mt-4 text-center text-sm text-white">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  )
}
