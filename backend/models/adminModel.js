const { Schema, Types, model } = require("mongoose");

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String },
  role: { type: String, required: false },
  secret: String,
});

const AdminModel = model("Admin", adminSchema);

module.exports = AdminModel;
