const express = require('express')
const {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  searchAvailability,
  emailCancellation,
} = require('../controllers/bookingController.js')
const router = express.Router()

// SEARCH BOOKINGS
router.post('/search', searchAvailability)
// GET BOOKING
router.get('/', getBookings)
// router.get("/:id", userCancel);
// SAVE BOOKING
router.post('/', saveBooking)
// EDIT BOOKING
router.post('/:id', editBooking)
// DELETE BOOKING
router.delete('/:id', deleteBooking)
router.delete('/cancel/:id', emailCancellation)

module.exports = router
