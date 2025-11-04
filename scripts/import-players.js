import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
// cspell:ignore supabase
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configura tus credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno no encontradas')
  console.log('\nAsegúrate de tener en .env.local:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=tu_url')
  console.log('SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key')
  process.exit(1)
}

console.log('✅ Variables de entorno cargadas correctamente')
console.log(`📍 URL de Supabase: ${supabaseUrl}`)
console.log(`🔑 Usando: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Service Role Key' : 'Anon Key'}\n`)

const supabase = createClient(supabaseUrl, supabaseKey)

async function importPlayers() {
  try {
    // Leer el archivo JSON
    const jsonPath = path.join(__dirname, '..', 'Inazuma_web_scrapper', 'players_es.json')
    
    if (!fs.existsSync(jsonPath)) {
      console.error(`❌ Error: No se encontró el archivo ${jsonPath}`)
      process.exit(1)
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8')
    const players = JSON.parse(rawData)

    console.log(`📊 Total de jugadores a importar: ${players.length}`)

    // Filtrar jugadores válidos (que tengan al menos id, name y avatar)
    const validPlayers = players.filter(player => {
      return player.id && player.name && player.avatar
    })

    console.log(`✅ Jugadores válidos: ${validPlayers.length}`)
    console.log(`❌ Jugadores inválidos (sin id/name/avatar): ${players.length - validPlayers.length}`)

    // Transformar los datos al formato de la base de datos
    const playersToInsert = validPlayers.map(player => ({
      id: player.id,
      name: player.name,
      position: player.position || null,
      team: player.team || [],
      element: player.element || null,
      avatar: player.avatar
    }))

    // Insertar en lotes de 100 para evitar errores de límite
    const batchSize = 100
    let imported = 0
    let errors = 0

    console.log(`\n🚀 Iniciando importación en lotes de ${batchSize}...\n`)

    for (let i = 0; i < playersToInsert.length; i += batchSize) {
      const batch = playersToInsert.slice(i, i + batchSize)
      const batchNumber = Math.floor(i / batchSize) + 1
      const totalBatches = Math.ceil(playersToInsert.length / batchSize)
      
      process.stdout.write(`⏳ Procesando lote ${batchNumber}/${totalBatches}... `)

      const { error } = await supabase
        .from('players')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })

      if (error) {
        console.log(`❌ Error`)
        console.error(`   Detalles: ${error.message}`)
        errors += batch.length
      } else {
        console.log(`✅ Completado (${batch.length} jugadores)`)
        imported += batch.length
      }

      // Pequeña pausa entre lotes para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log('\n' + '='.repeat(60))
    console.log('📊 RESUMEN DE IMPORTACIÓN')
    console.log('='.repeat(60))
    console.log(`✅ Importados correctamente: ${imported}`)
    console.log(`❌ Errores: ${errors}`)
    console.log(`📝 Total procesados: ${imported + errors}`)

    // Verificar el total en la base de datos
    const { count } = await supabase
      .from('players')
      .select('*', { count: 'exact', head: true })

    console.log(`\n🎮 Total de jugadores en la base de datos: ${count}`)
    console.log('='.repeat(60))

  } catch (error) {
    console.error('\n❌ Error fatal:', error.message)
    process.exit(1)
  }
}

// Ejecutar la importación
console.log('🎮 IMPORTADOR DE JUGADORES DE INAZUMA ELEVEN')
console.log('='.repeat(60) + '\n')

importPlayers()
  .then(() => {
    console.log('\n✨ ¡Importación completada exitosamente!\n')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Error en la importación:', error.message)
    process.exit(1)
  })
