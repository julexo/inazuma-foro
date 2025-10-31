'use client'

import { Suspense } from 'react' 
import LoginForm from '@/components/LoginForm' // Importa el nuevo formulario de Login
import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
      <div className="w-full max-w-sm">
        
        {/* 3. Envuelve tu formulario en <Suspense> */}
        <Suspense>
          <LoginForm /> 
        </Suspense>

        <p className="mt-4 text-center text-sm text-slate-300">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="font-semibold text-orange-400 hover:text-orange-300">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  )
}

