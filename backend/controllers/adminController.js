const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// CREATE TOKEN FOR MONGO ID i.e. _id AND CALCULATE MS
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};

// HANDLE ERRORS
const handleErrors = (err) => {
  let errors = { email: "", password: "", confirmPassword: "" };

  console.log(err);
  if (err.message === "Incorrect email!") {
    errors.email = "Email is not registered!";
  }

  if (err.message === "Incorrect password!") {
    errors.password = "The password is incorrect!";
  }

  if (err.message === "Passwords don't match!") {
    errors.confirmPassword = "Passwords don't match";
  }

  if (err.code === 11000) {
    errors.email = "Email is already in use!";
    return errors;
  }

  if (err.message.includes("Admin validation failed!")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// REGISTER ADMIN 2.0
const registerAdmin = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const admin = await AdminModel.create({ email, password, confirmPassword });
    const token = createToken(admin._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ admin: admin._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

// LOGIN ADMIN 2.0
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

// GET /ADMIN
const getAdminMain = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).json(admins);
};

// GET /AMIN/REGISTER
const getRegisterAdmin = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).json(admins);
};

module.exports = {
  getAdminMain,
  loginAdmin,
  getRegisterAdmin,
  registerAdmin,
};
