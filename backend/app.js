const express = require('express');
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./src/utils/middleware')

const app = express();

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/login', require('./src/routes/login'))
app.use('/api/posts', require('./src/routes/posts'))
app.use('/api/campus-tour', require('./src/routes/campusTour'))
app.use('/api/users', require('./src/routes/users'))
app.use('/api/comments', require('./src/routes/comment'))
app.use('/api/likes', require('./src/routes/like'))

app.get('/api', (_req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
