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
    tables,
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
      tables: tables,
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

// EDIT BOOKING
const editBooking = async (req, res) => {
  const id = req.params.id

  try {
    await Reservations.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        date: req.body.date,
        time: req.body.time,
        amount: req.body.amount,
        tables: req.body.tables,
        message: req.body.message,
        guestName: req.body.guestName,
        guestEmail: req.body.guestEmail,
        guestPhone: req.body.guestPhone,
      },
    )
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE BOOKING
const deleteBooking = async (req, res) => {
  const id = req.params.id

  try {
    await Reservations.findById(id).deleteOne()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// GET AVAILABILITY
const searchAvailability = async (req, res) => {
  const { date, time, amount, tables } = req.body

  const allBookings = await Reservations.find().lean()

  try {
    // Get all existing reservations from requested day
    const requestedDate = allBookings.filter((booking) => booking.date === date)
    // If there are no bookings on requested date, confirm booking
    if (requestedDate.length < 1) {
      res.status(200).send(true)
    } else {
      /* If there are bookings on requested date,
    check if there are reservations at the same time */
      for (let i = 0; i < requestedDate.length; i++) {
        // List of bookings on the same date and same time
        const sameDayAndTime = requestedDate.filter(
          (booking) => booking.time === time,
        )
        // If there are no bookings on requested time, confirm booking
        if (sameDayAndTime.length < 1) {
          res.status(200).send(true)
        } else {
          // Get list of bookings with same date & time
          for (let j = 0; j < sameDayAndTime.length; j++) {
            // Get total amount of booked tables on same date & time
            const bookedTables = sameDayAndTime.reduce(function (a, b) {
              return a + b.tables
            }, 0)
            // If 15 tables are already booked, delcine booking request
            if (bookedTables + tables > 15) {
              res.status(200).send(false)
            } // If there are tables available, confirm booking
            else {
              res.status(200).send(true)
            }
          }
        }
      }
    }
  } catch (error) {
    res.status(400)
  }
}

module.exports = {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  searchAvailability,
}
