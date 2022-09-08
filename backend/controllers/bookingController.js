const Bookings = require('../models/bookingModel')
const Guest = require('../models/guestModel')
const { transport } = require('../utils/utils')

//////////////////////
// GET ALL BOOKINGS //
//////////////////////
const getBookings = async (req, res) => {
  const bookings = await Bookings.find().populate('guest')
  res.status(200).json(bookings)
}
//////////////////
// SAVE BOOKING //
//////////////////
const saveBooking = async (req, res) => {
  const { date, time, amount, tables, message, guest } = req.body

  // Save values from guest object in req.body
  const name = guest.name
  const email = guest.email
  const phone = guest.phone

  try {
    // Check if guest already exists in db
    const guestExists = await Guest.findOne({ email })

    // If guest exists, save booking with guest ID
    if (guestExists) {
      const newBooking = new Bookings({
        date: date,
        time: time,
        guest: guestExists._id,
        amount: amount,
        tables: tables,
        message: message,
      })
      await newBooking.save()

      // Send confirmation email to guest
      transport(email, newBooking.date, newBooking.id)

      // Set 200 status and send response
      res.status(200).send(newBooking)
    } else {
      // If guest doesn't exist, create one in db...
      const newGuest = new Guest({
        name: name,
        email: email,
        phone: phone,
      })
      // Save new guest to db
      await newGuest.save()

      // Create booking
      const newBooking = new Bookings({
        date: date,
        time: time,
        guest: newGuest._id,
        amount: amount,
        tables: tables,
        message: message,
      })
      // And save it
      await newBooking.save()

      // Send confirmation email to guest
      transport(email, newBooking.date, newBooking.id)

      // Set 200 status and send response
      res.status(200).send(newBooking)
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//////////////////
// EDIT BOOKING //
//////////////////
const editBooking = async (req, res) => {
  const id = req.params.id

  try {
    const editedBooking = await Bookings.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        date: req.body.date,
        time: req.body.time,
        amount: req.body.amount,
        tables: req.body.tables,
        message: req.body.message,
      },
    )

    // Find guest information
    const getBooking = await Bookings.findById(id)
    const guestID = getBooking.guest
    const foundGuest = await Guest.findById(guestID)
    console.log(foundGuest)
    // Send confirmation email to guest
    transport(foundGuest.email, req.body.date, id)

    // Set 200 status and send response
    res.status(200).send(editedBooking)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

////////////////////
// DELETE BOOKING //
////////////////////
const deleteBooking = async (req, res) => {
  const id = req.params.id

  try {
    // Find booking by ID and delete
    await Bookings.findById(id).deleteOne()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//////////////////////
// GET AVAILABILITY //
//////////////////////
const searchAvailability = async (req, res) => {
  const { date, time, amount, tables } = req.body

  // Get all bookings from db
  const allBookings = await Bookings.find().lean()

  try {
    // Get existing reservations from requested day
    const requestedDate = allBookings.filter((booking) => booking.date === date)
    // If there are no reservations on requested date, confirm booking
    if (requestedDate.length < 1) {
      res.status(200).send(true)
    } else {
      /* If there are bookings on requested date,
    check if there are any at the same time */
      for (let i = 0; i < requestedDate.length; i++) {
        // List of bookings on the same date and same time:
        const sameDayAndTime = requestedDate.filter(
          (booking) => booking.time === time,
        )
        // If there are no bookings on requested time, confirm booking
        if (sameDayAndTime.length < 1) {
          res.status(200).send(true)
        } else {
          // Get list of bookings with same date & time:
          for (let j = 0; j < sameDayAndTime.length; j++) {
            // Get total amount of booked tables on same date & time
            const bookedTables = sameDayAndTime.reduce(function (a, b) {
              return a + b.tables
            }, 0)
            // If 15 tables are already booked, decline booking request
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

//////////////////////////////////
// CANCEL RESERVATION FROM USER //
//////////////////////////////////
const emailCancellation = async (req, res) => {
  const id = req.params.id

  try {
    // Find booking in db and delete
    await Bookings.findById(id).deleteOne()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  searchAvailability,
  emailCancellation,
}
