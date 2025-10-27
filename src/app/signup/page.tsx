'use client'

import SignUpForm from '@/components/SignUpForm' // Importa el nuevo formulario de Registro
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-orange-700">
       <SignUpForm /> {/* Renderiza el formulario de Registro */}
       <p className="mt-4 text-center text-sm text-white">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  )
}
