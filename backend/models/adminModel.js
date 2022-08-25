const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String },
  role: { type: String, required: false },
  secret: String,
});

module.exports = mongoose.model("Admins", bookingSchema);
