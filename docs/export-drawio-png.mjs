/**
 * Export .drawio files to PNG using Puppeteer + diagrams.net export page.
 * Usage: node export-drawio-png.mjs <input.drawio> <output.png>
 */
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

const [inputPath, outputPath] = process.argv.slice(2)
if (!inputPath || !outputPath) {
  console.error('Usage: node export-drawio-png.mjs <input.drawio> <output.png>')
  process.exit(1)
}

const xml = fs.readFileSync(path.resolve(inputPath), 'utf8')

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()

await page.goto('https://viewer.diagrams.net/export3.html', {
  waitUntil: 'networkidle0',
  timeout: 60000,
})

const pngBase64 = await page.evaluate(async (diagramXml) => {
  const res = await fetch('https://convert.diagrams.net/node/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      format: 'png',
      xml: diagramXml,
      scale: 1,
      border: 10,
      transparent: false,
    }),
  })
  if (!res.ok) {
    throw new Error(`Export failed: ${res.status}`)
  }
  const buffer = await res.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}, xml)

const pngBuffer = Buffer.from(pngBase64, 'base64')
if (pngBuffer.length < 100) {
  throw new Error('Export returned empty or invalid PNG')
}

fs.writeFileSync(path.resolve(outputPath), pngBuffer)
await browser.close()
console.log(`Exported ${outputPath} (${pngBuffer.length} bytes)`)
