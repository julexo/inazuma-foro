import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const scrapperDir = path.join(__dirname, '..', 'Inazuma_web_scrapper')

console.log('🧹 LIMPIEZA DE ARCHIVOS INNECESARIOS')
console.log('='.repeat(60))

// Archivos y carpetas a eliminar
const toDelete = [
  'players.json',
  'missing_avatars.txt',
  'avatar_images',
  '01-download_webs.py',
  '02-extract_players.py',
  '03-translate_players.py',
  '04-check_missing_avatars.py',
  '05-clear_current_folder.py',
  'requirements.txt'
]

let deleted = 0
let notFound = 0

toDelete.forEach(item => {
  const itemPath = path.join(scrapperDir, item)
  
  try {
    if (fs.existsSync(itemPath)) {
      const stats = fs.statSync(itemPath)
      
      if (stats.isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true })
        console.log(`✅ Carpeta eliminada: ${item}`)
      } else {
        fs.unlinkSync(itemPath)
        console.log(`✅ Archivo eliminado: ${item}`)
      }
      deleted++
    } else {
      console.log(`⏭️  No encontrado: ${item}`)
      notFound++
    }
  } catch (error) {
    console.error(`❌ Error al eliminar ${item}:`, error.message)
  }
})

// Eliminar archivos HTML
const htmlFiles = fs.readdirSync(scrapperDir).filter(f => f.endsWith('.html'))
htmlFiles.forEach(file => {
  try {
    fs.unlinkSync(path.join(scrapperDir, file))
    console.log(`✅ HTML eliminado: ${file}`)
    deleted++
  } catch (error) {
    console.error(`❌ Error al eliminar ${file}:`, error.message)
  }
})

// Eliminar carpetas *_files
const filesDirs = fs.readdirSync(scrapperDir).filter(f => {
  const itemPath = path.join(scrapperDir, f)
  return fs.statSync(itemPath).isDirectory() && f.endsWith('_files')
})

filesDirs.forEach(dir => {
  try {
    fs.rmSync(path.join(scrapperDir, dir), { recursive: true, force: true })
    console.log(`✅ Carpeta eliminada: ${dir}`)
    deleted++
  } catch (error) {
    console.error(`❌ Error al eliminar ${dir}:`, error.message)
  }
})

console.log('\n' + '='.repeat(60))
console.log('📊 RESUMEN')
console.log('='.repeat(60))
console.log(`✅ Elementos eliminados: ${deleted}`)
console.log(`⏭️  No encontrados: ${notFound}`)
console.log('\n📁 Archivos conservados:')
console.log('  ✓ players_es.json')
console.log('  ✓ avatar_images_webp/')
console.log('  ✓ README.md')
console.log('='.repeat(60))
