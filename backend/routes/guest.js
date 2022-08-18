const express = require('express')
const { saveGuest } = require('../controllers/guestController.js')
const router = express.Router()

// SAVE GUEST
router.post('/', saveGuest)

module.exports = router
