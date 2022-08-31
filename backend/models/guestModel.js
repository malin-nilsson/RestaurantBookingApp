const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GuestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
})

module.exports = mongoose.model('Guests', GuestSchema)
