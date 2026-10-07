import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// run from the project root with: npm run images
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'client', 'public', 'images')
const backupDir = path.join(root, 'image-originals')

// webp keeps the see-through background of the building images
const toConvert = [
    'background', 'city-map', 'tournament', 'party', 'free-play', 'class',
    'neon-joystick', 'coin-castle', 'glitch-garage', '8bit-basement'
]
const quality = 85

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

fs.mkdirSync(backupDir, { recursive: true })

// back up every original PNG first, and never overwrite a backup
for (const file of fs.readdirSync(publicDir)) {
    if (!file.endsWith('.png')) continue

    const backupPath = path.join(backupDir, file)
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(path.join(publicDir, file), backupPath)
    }
}

for (const name of toConvert) {
    const source = path.join(backupDir, `${name}.png`)
    const target = path.join(publicDir, `${name}.webp`)

    if (!fs.existsSync(source)) {
        console.log(`skipped ${name}: no PNG found`)
        continue
    }

    await sharp(source).webp({ quality }).toFile(target)

    // the PNG is safe in the backup folder, so remove it from public
    fs.rmSync(path.join(publicDir, `${name}.png`), { force: true })

    console.log(`${name}: ${kb(fs.statSync(source).size)} png to ${kb(fs.statSync(target).size)} webp`)
}
