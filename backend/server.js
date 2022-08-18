require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bookingRoutes = require('./routes/bookings')
const guestRoutes = require('./routes/guest')
const cors = require('cors')

// EXPRESS APP
const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
  res.send('200')
})
app.use('/bookings', bookingRoutes)
app.use('/guests', guestRoutes)

// CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // LISTEN FOR REQUESTS
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port http://localhost:4000/')
    })
  })
  .catch((error) => {
    console.log(error)
  })
