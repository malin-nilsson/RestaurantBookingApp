const Booking = require('../models/bookingModel')
const Reservations = require('../models/reservationModel')

// GET ALL BOOKINGS
const getBookings = async (req, res) => {
  const bookings = await Reservations.find()
  res.status(200).json(bookings)
}

// SAVE BOOKING
const saveBooking = async (req, res) => {
  const {
    date,
    time,
    amount,
    message,
    guestName,
    guestEmail,
    guestPhone,
  } = req.body

  // Add doc to db
  try {
    const newBooking = await Reservations.create({
      date: date,
      time: time,
      amount: amount,
      message: message,
      guestName: guestName,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
    })
    res.status(200).json(newBooking)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { saveBooking, getBookings }
