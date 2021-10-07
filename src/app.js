const express = require('express')
const app = express()
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')

/* ruta para los usuarios */

/* ruta para el login */

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

module.exports = app
