const express = require('express')
const {
  saveBooking,
  getBookings,
  editBooking,
} = require('../controllers/bookingController.js')
const router = express.Router()

//GET BOOKING
router.get('/', getBookings)
// SAVE BOOKING
router.post('/', saveBooking)
// EDIT BOOKING
router.post('/:id', editBooking)

module.exports = router
