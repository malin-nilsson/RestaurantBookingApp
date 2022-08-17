const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  date: { type: String, required: true, default: Date.now },
  time: { type: String, required: true },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guests",
    required: true,
  },
  amount: { type: Number, required: true },
  message: { type: String, required: false },
});

module.exports = mongoose.model("Bookings", bookingSchema);
