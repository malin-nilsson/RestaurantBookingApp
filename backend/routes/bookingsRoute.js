const express = require("express");
const {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  sendConfirmation,
} = require("../controllers/bookingController.js");
const router = express.Router();

//GET BOOKING
router.get("/", getBookings);
router.get("/:id");
// SAVE BOOKING
router.post("/", saveBooking);
router.post("/confirmation_mail", sendConfirmation);
// EDIT BOOKING
router.post("/:id", editBooking);
// DELETE BOOKING
router.delete("/:id", deleteBooking);

module.exports = router;
