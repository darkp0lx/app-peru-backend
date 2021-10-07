require('./mongo')
require('dotenv').config()

const express = require('express')
const app = require('./app')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 4001

const server = app.listen(PORT, () => {
  console.log('Server listening on ' + PORT)
})

module.exports = { server, app }
