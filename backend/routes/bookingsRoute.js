const express = require("express");
const {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
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

module.exports = router;
