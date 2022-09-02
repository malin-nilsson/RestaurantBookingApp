const Guests = require('../models/guestModel')
const Bookings = require('../models/bookingModel')

const getGuests = async (req, res) => {
  try {
    const guests = await Guests.find().lean()
    res.status(200).json(guests)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getBookingsByGuest = async (req, res) => {
  const guest = req.body

  // Get guest from req body
  const requestedGuest = {
    id: guest._id,
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
  }

  try {
    // Find guest from db using email admin searched for
    const guest = await Guests.findOne({ email: requestedGuest.email })

    // If guest exists, get their bookings from db
    if (guest) {
      const bookingsByGuest = await Bookings.find({
        guest: guest._id,
      })
      res.status(200).send(bookingsByGuest)
    } else {
      res.status(200).send([])
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getGuests,
  getBookingsByGuest,
}
