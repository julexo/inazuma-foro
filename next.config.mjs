/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const csp = [
      "default-src 'self'",
      // Scripts (Turnstile)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.cloudflare.com",
      // Iframes (Turnstile)
      "frame-src 'self' https://challenges.cloudflare.com https://*.cloudflare.com",
      // Conexiones: Supabase (.co y .in) + Turnstile + ws/wss (dev y realtime)
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.supabase.in wss://*.supabase.in https://challenges.cloudflare.com https://*.cloudflare.com ws: wss:",
      // Imágenes (incluye storage de Supabase y Turnstile)
      "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://challenges.cloudflare.com https://*.cloudflare.com",
      // Estilos
      "style-src 'self' 'unsafe-inline'",
      // Workers
      "worker-src 'self' blob:",
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default nextConfig
