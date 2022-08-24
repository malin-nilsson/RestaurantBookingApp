const { Schema, Types, model } = require("mongoose");

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String },
  role: { type: String, required: false },
  secret: String,
});

const AdminModel = model("Admin", adminSchema);

module.exports = AdminModel;

//NEW CODE

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const UserModel = mongoose.model("User", userSchema);

// //SIGN UP STATIC
// userSchema.statics.signup = async (username, password) => {
//   //ADD CONFIRM PASSWORD
//   if (!username || !password) {
//     throw Error("All fields must be filled!");
//   }

//   //THROW IN LOGIC FOR OTHER VALIDATION

//   const exists = await this.findOne({ username });

//   if (exists) {
//     throw Error("Username already in use!");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ username, password: hash });

//   return user;
// };

// //LOGIN STATIC
// userSchema.statics.login = async function (username, password) {
//   if (!username || !password) {
//     throw Error("All fields must be filled!");
//   }

//   const user = await this.findOne({ username });

//   if (!user) {
//     throw Error("Incorrect username!");
//   }

//   //SET ERROR MESSAGES TO SAME AFTER DONE
//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Incorrect password!");
//   }

//   return user;
// };

// module.exports = UserModel;
