require('dotenv/config')

const { prisma } = require('./src/lib/prisma.ts')
const app = require('./app')

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection failed:', error.message)
    console.error('Check DATABASE_URL in backend/.env, then restart the server.')
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start()
