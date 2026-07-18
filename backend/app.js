const express = require('express');
const cors = require('cors')
const path = require('path')
const { requestLogger, unknownEndpoint, errorHandler } = require('./src/utils/middleware')

const app = express();

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/login', require('./src/routes/login'))
app.use('/api/signup', require('./src/routes/signup'))
app.use('/api/posts', require('./src/routes/posts'))
app.use('/api/campus-tour', require('./src/routes/campusTour'))
app.use('/api/users', require('./src/routes/users'))
app.use('/api/comments', require('./src/routes/comment'))
app.use('/api/likes', require('./src/routes/like'))
app.use('/api/upload', require('./src/routes/upload'))

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
