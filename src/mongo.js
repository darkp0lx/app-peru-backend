require('dotenv').config()
const mongoose = require('mongoose')

const connectString = process.env.MONGO_DB_URI

if (!connectString) {
  console.error('no se lee las variables para la conexion a mongoDB atlas.')
}
mongoose
  .connect(connectString)
  .then(() => console.log('connect to database'))
  .catch(error => console.log(error))

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})
