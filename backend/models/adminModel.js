const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String },
  role: { type: String, required: false },
  secret: String,
});

module.exports = mongoose.model("Admin", adminSchema);

// adminSchema.statics.login = async function (username, password) {
//   if (!username || !password) {
//     throw Error("All fields must be filled.");
//   }
//   const admin = await this.findOne({ username });

//   const match = await bcrypt.compare(password, admin.password);

//   if (!match) {
//     throw Error("Incorrect password");
//   }

//   return admin;
// };

// adminSchema.statics.signup = async (username, password) => {
//   //ADD CONFIRM PASSWORD
//   if (!username || !password) {
//     throw Error("All fields must be filled!");
//   }

//   //SET UP LOGIC FOR OTHER VALIDATION HERE

//   const exists = await this.findOne({ username });

//   if (exists) {
//     throw Error("Username already in use!");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ username, password: hash });

//   return user;
// };
