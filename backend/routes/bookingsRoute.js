const express = require("express");
const {
  saveBooking,
  getBookings,
} = require("../controllers/bookingController.js");
const router = express.Router();

//GET BOOKING
router.get("/", getBookings);
// SAVE BOOKING
router.post("/", saveBooking);

module.exports = router;
