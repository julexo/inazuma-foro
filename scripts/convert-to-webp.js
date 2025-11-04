import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function convertToWebP() {
  const inputDir = path.join(__dirname, '..', 'Inazuma_web_scrapper', 'avatar_images')
  const outputDir = path.join(__dirname, '..', 'Inazuma_web_scrapper', 'avatar_images_webp')

  // Verificar que existe el directorio de entrada
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Error: Directorio no encontrado: ${inputDir}`)
    process.exit(1)
  }

  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`📁 Directorio creado: ${outputDir}\n`)
  }

  // Leer todos los archivos PNG
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'))

  if (files.length === 0) {
    console.error(`❌ No se encontraron archivos PNG en ${inputDir}`)
    process.exit(1)
  }

  console.log('🎨 CONVERTIDOR DE IMÁGENES PNG A WEBP')
  console.log('='.repeat(60))
  console.log(`📂 Directorio de entrada: ${inputDir}`)
  console.log(`📂 Directorio de salida: ${outputDir}`)
  console.log(`📸 Total de imágenes: ${files.length}\n`)

  let converted = 0
  let errors = 0
  let totalOriginalSize = 0
  let totalWebpSize = 0

  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'))

    try {
      // Obtener tamaño original
      const originalStats = fs.statSync(inputPath)
      totalOriginalSize += originalStats.size

      process.stdout.write(`⏳ Convirtiendo ${file}... `)

      await sharp(inputPath)
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath)

      // Obtener tamaño del WebP
      const webpStats = fs.statSync(outputPath)
      totalWebpSize += webpStats.size

      const reduction = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1)
      
      console.log(`✅ (${(originalStats.size / 1024).toFixed(1)}KB → ${(webpStats.size / 1024).toFixed(1)}KB, -${reduction}%)`)
      converted++

    } catch (error) {
      console.log(`❌`)
      console.error(`   Error: ${error.message}`)
      errors++
    }
  }

  const totalReduction = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)

  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN DE CONVERSIÓN')
  console.log('='.repeat(60))
  console.log(`✅ Convertidas exitosamente: ${converted}`)
  console.log(`❌ Errores: ${errors}`)
  console.log(`📦 Tamaño original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`📦 Tamaño WebP total: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`💾 Reducción total: ${totalReduction}% (${((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2)} MB ahorrados)`)
  console.log('='.repeat(60))
}

convertToWebP()
  .then(() => {
    console.log('\n✨ ¡Conversión completada!\n')
    process.exit(0)
  })
  .catch(error => {
    console.error('\n❌ Error fatal:', error.message)
    process.exit(1)
  })
