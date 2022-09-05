const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Passwords don't match!"],
  },
});

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  if (this.password !== this.confirmPassword) {
    throw Error("Passwords don't match");
  } else {
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
  }
  next();
});

adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error("Incorrect password!");
  }
  throw Error("Incorrect email!");
};

module.exports = mongoose.model("Admin", adminSchema);
