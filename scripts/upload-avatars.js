import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno no encontradas')
  console.log('\nAsegúrate de tener en .env.local:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=tu_url')
  console.log('SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key (recomendado)')
  process.exit(1)
}

console.log('✅ Variables de entorno cargadas')
console.log(`📍 URL: ${supabaseUrl}`)
console.log(`🔑 Usando: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Service Role Key' : 'Anon Key'}\n`)

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadAvatars() {
  // Usar la carpeta WebP en lugar de PNG
  const avatarsDir = path.join(__dirname, '..', 'Inazuma_web_scrapper', 'avatar_images_webp')
  
  if (!fs.existsSync(avatarsDir)) {
    console.error(`❌ Directorio no encontrado: ${avatarsDir}`)
    console.log('\n💡 Primero ejecuta: npm run convert-to-webp')
    process.exit(1)
  }

  const files = fs.readdirSync(avatarsDir).filter(f => f.endsWith('.webp'))
  
  if (files.length === 0) {
    console.error(`❌ No se encontraron archivos .webp en ${avatarsDir}`)
    process.exit(1)
  }

  console.log('📸 SUBIDOR DE AVATARES A SUPABASE')
  console.log('='.repeat(60))
  console.log(`📂 Directorio: ${avatarsDir}`)
  console.log(`📸 Total de imágenes: ${files.length}\n`)

  let uploaded = 0
  let skipped = 0
  let errors = 0
  let totalSize = 0

  for (const file of files) {
    const filePath = path.join(avatarsDir, file)
    const fileBuffer = fs.readFileSync(filePath)
    const fileSize = fs.statSync(filePath).size
    totalSize += fileSize

    process.stdout.write(`⏳ Subiendo ${file} (${(fileSize / 1024).toFixed(1)}KB)... `)

    const { error } = await supabase.storage
      .from('player-avatars')
      .upload(file, fileBuffer, {
        contentType: 'image/webp',
        upsert: true
      })

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`⏭️  Ya existe`)
        skipped++
      } else {
        console.log(`❌`)
        console.error(`   Error: ${error.message}`)
        errors++
      }
    } else {
      console.log(`✅`)
      uploaded++
    }

    // Pausa para no saturar la API
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN')
  console.log('='.repeat(60))
  console.log(`✅ Subidas: ${uploaded}`)
  console.log(`⏭️  Omitidas (ya existían): ${skipped}`)
  console.log(`❌ Errores: ${errors}`)
  console.log(`📦 Tamaño total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log('='.repeat(60))
}

uploadAvatars()
  .then(() => {
    console.log('\n✨ Proceso completado\n')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Error fatal:', error.message)
    process.exit(1)
  })
