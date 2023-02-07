const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')

const PORT = 5000
dotenv.config()

// config routes
const user = require('./routes/user')

// connect database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('===> Connected to MongoDB <===')
})

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('common'))
// morgan 200 is success

app.use('/', user)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
  })
  