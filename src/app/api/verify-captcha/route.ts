import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token no proporcionado' },
        { status: 400 }
      )
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY
    if (!secretKey) {
      console.error('❌ TURNSTILE_SECRET_KEY no configurada')
      return NextResponse.json(
        { success: false, error: 'Configuración incorrecta del servidor' },
        { status: 500 }
      )
    }

    console.log('🔍 Verificando token con Cloudflare...')

    // Formato recomendado por Cloudflare
    const body = new URLSearchParams()
    body.append('secret', secretKey)
    body.append('response', token)

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }
    )

    const data = await response.json() as {
      success: boolean
      'error-codes'?: string[]
      hostname?: string
      challenge_ts?: string
      action?: string
    }

    console.log('📋 Respuesta de Cloudflare:', {
      success: data.success,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
    })

    if (!data.success) {
      console.error('❌ Verificación fallida. Error codes:', data['error-codes'])
    }

    // Devolver info útil para depurar en cliente
    return NextResponse.json(
      {
        success: data.success,
        hostname: data.hostname ?? null,
        errorCodes: data['error-codes'] ?? null,
      },
      { status: data.success ? 200 : 400 }
    )
  } catch (error) {
    console.error('💥 Error en verify-captcha:', error)
    return NextResponse.json(
      { success: false, error: 'Error del servidor' },
      { status: 500 }
    )
  }
}
