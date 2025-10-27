'use client'

import LoginForm from '@/components/LoginForm' // Importa el nuevo formulario de Login
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
      <LoginForm /> {/* Renderiza el formulario de Login */}
      <p className="mt-4 text-center text-sm text-white">
        ¿No tienes cuenta?{' '}
        <Link href="/signup" className="font-medium text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  )
}

