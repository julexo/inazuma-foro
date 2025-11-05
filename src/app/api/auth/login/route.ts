import { NextRequest, NextResponse } from 'next/server'

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) return false

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    }
  )

  const data = await response.json()
  
  // Para reCAPTCHA v3, verificar el score (0.0 - 1.0)
  // 0.0 = bot, 1.0 = humano
  return data.success && data.score >= 0.5
}

export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken } = await request.json()

    // Verificar reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken)

    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: 'Verificación de reCAPTCHA fallida' },
        { status: 400 }
      )
    }

    // Aquí continúa tu lógica de autenticación
    // ...

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error en el servidor' },
      { status: 500 }
    )
  }
}
