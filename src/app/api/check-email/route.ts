import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 👇 Usa tu clave de servicio (solo del lado del servidor)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    const { email } = await req.json()

    try {
        const { data, error } = await supabaseAdmin.auth.admin.listUsers()
        if (error) throw error

        const alreadyExists = data.users.some(
            (u) => u.email?.toLowerCase() === email.toLowerCase()
        )

        return NextResponse.json({ exists: alreadyExists })
    } catch (err) {
        console.error('Error checking email:', err)

        const message =
            err instanceof Error ? err.message : 'Error desconocido en el servidor'

        return NextResponse.json({ error: message }, { status: 500 })
    }

}
