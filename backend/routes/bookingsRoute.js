const express = require("express");
const {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  searchAvailability,
  sendConfirmation,
  userCancel,
} = require("../controllers/bookingController.js");
const router = express.Router();

//GET BOOKING
router.get("/", getBookings);
router.get("/:id", userCancel);
// SAVE BOOKING
router.post("/", saveBooking);
router.post("/confirmation_mail", sendConfirmation);
// EDIT BOOKING
router.post("/:id", editBooking);
// DELETE BOOKING
router.delete("/:id", deleteBooking);
router.delete("/cancel/:id", userCancel);

// SEARCH BOOKINGS
router.post("/search", searchAvailability);
// GET BOOKING
router.get("/", getBookings);

module.exports = router;
