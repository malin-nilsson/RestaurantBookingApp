const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingRequestSchema = new Schema({
  date: { type: String, required: true, default: Date.now },
  time: { type: String, required: true },
  amount: { type: Number, required: true },
  tables: { type: Number, required: true },
})

const BookingRequestModel = mongoose.model(
  'Booking Request',
  bookingRequestSchema,
)
module.exports = BookingRequestModel
