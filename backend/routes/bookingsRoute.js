const express = require('express')
const {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  searchAvailability,
} = require('../controllers/bookingController.js')
const router = express.Router()

// SEARCH BOOKINGS
router.post('/search', searchAvailability)
// GET BOOKING
router.get('/', getBookings)
// SAVE BOOKING
router.post('/', saveBooking)
// EDIT BOOKING
router.post('/:id', editBooking)
// DELETE BOOKING
router.delete('/:id', deleteBooking)

module.exports = router
