/* Uso:
   npx tsx scripts/find-similar-avatar.ts ./avatar_imagenes_webp ./refs/consulta.webp
*/
import fs from 'node:fs';
import path from 'node:path';
import imghash from 'imghash';

function isImage(file: string) {
  const ext = path.extname(file).toLowerCase();
  return ['.webp', '.png', '.jpg', '.jpeg'].includes(ext);
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...await walk(full));
    } else if (isImage(full)) {
      out.push(full);
    }
  }
  return out;
}

// Hamming distance entre dos hashes hex (pHash)
function hammingDistanceHex(aHex: string, bHex: string) {
  const a = BigInt('0x' + aHex);
  const b = BigInt('0x' + bHex);
  let x = a ^ b;
  let dist = 0;
  const ONE = BigInt(1);
  while (x) {
    dist += Number(x & ONE);
    x >>= ONE;
  }
  return dist;
}

async function main() {
  const baseDir = process.argv[2];
  const refImage = process.argv[3];

  if (!baseDir || !refImage) {
    console.error('Uso: npx tsx scripts/find-similar-avatar.ts <carpeta_imagenes> <imagen_referencia>');
    process.exit(1);
  }

  if (!fs.existsSync(baseDir)) {
    console.error('Carpeta no encontrada:', baseDir);
    process.exit(1);
  }
  if (!fs.existsSync(refImage)) {
    console.error('Imagen de referencia no encontrada:', refImage);
    process.exit(1);
  }

  console.log('Calculando pHash de la imagen de referencia...');
  const refHash = await imghash.hash(refImage, 16); // 16 -> 256 bits
  console.log('Hash ref:', refHash);

  console.log('Buscando imágenes en', baseDir, '...');
  const files = await walk(baseDir);
  if (files.length === 0) {
    console.log('No se encontraron imágenes en la carpeta.');
    return;
  }

  console.log(`Calculando similitud sobre ${files.length} imágenes...`);
  const results: { file: string; hash: string; dist: number }[] = [];

  for (const file of files) {
    try {
      const h = await imghash.hash(file, 16);
      const d = hammingDistanceHex(refHash, h);
      results.push({ file, hash: h, dist: d });
    } catch (err) {
      // Ignorar imágenes corruptas o no legibles
    }
  }

  results.sort((a, b) => a.dist - b.dist);
  const top = results.slice(0, 10);

  console.log('\nTop 10 más parecidas (menor distancia = más similar):');
  top.forEach((r, i) => {
    console.log(
      `${String(i + 1).padStart(2, '0')}. dist=${r.dist.toString().padStart(3, ' ')}  ${r.file}`
    );
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
