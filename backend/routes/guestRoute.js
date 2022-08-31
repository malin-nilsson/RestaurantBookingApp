const express = require('express')
const {
  getGuests,
  getBookingsByGuest,
} = require('../controllers/guestController.js')
const router = express.Router()

// GET BOOKING
router.get('/', getGuests)
router.post('/search', getBookingsByGuest)

module.exports = router
