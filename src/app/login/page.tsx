'use client'

import { Suspense } from 'react' 
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-orange-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Suspense fallback={
          <div className="flex justify-center items-center p-20">
            <Loader2 className="h-8 w-8 text-orange-400 animate-spin" />
          </div>
        }>
          <LoginForm /> 
        </Suspense>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-300">
            ¿No tienes cuenta?{' '}
            <Link 
              href="/signup" 
              className="font-semibold text-orange-400 hover:text-orange-300 transition-colors underline-offset-4 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Footer decorativo */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            © 2024 Victory Road Foro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  )
}

