import fs from 'fs'

const xml = fs.readFileSync('use-case-visitor.drawio', 'utf8')
const res = await fetch('https://convert.diagrams.net/node/export', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ format: 'png', xml, scale: 1, border: 10 }),
})
console.log('status', res.status, res.headers.get('content-type'))
const buf = Buffer.from(await res.arrayBuffer())
console.log('size', buf.length)
if (buf.length > 100) fs.writeFileSync('use-case-visitor.png', buf)
