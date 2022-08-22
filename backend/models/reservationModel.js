const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
  date: { type: String, required: true, default: Date.now },
  time: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String, required: false },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
})

module.exports = mongoose.model('Reservations', reservationSchema)
