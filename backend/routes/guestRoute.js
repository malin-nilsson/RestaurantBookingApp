const express = require('express')
const { getGuests, deleteGuest } = require('../controllers/guestController.js')
const router = express.Router()

// GET BOOKING
router.get('/', getGuests)
// DELETE BOOKING
router.delete('/delete/:id', deleteGuest)
// router.post('/search', getBookingsByGuest)

module.exports = router
