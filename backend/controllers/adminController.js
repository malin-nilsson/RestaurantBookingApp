const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// CREATE TOKEN FOR MONGO ID i.e. _id AND CALCULATE MS
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};

// HANDLE ERRORS
const handleErrors = (err) => {
  let errors = { email: "", password: "", confirmPassword: "", tooShort: "" };

  console.log(err);
  if (err.message === "Incorrect email!") {
    errors.email = "Email is not registered!";
  }

  if (err.message === "Password must be at least 4 characters!") {
    errors.tooShort = "Password must be at least 4 characters!";
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

// REGISTER ADMIN
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

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await AdminModel.login(email, password, role);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};

// GET /ADMINS/MANAGE
const getManage = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).json(admins);
};

// GET /ADMIN/REGISTER
const getRegister = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).send(admins);
};

const getNewRoute = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await AdminModel.findById({ success: true, msg: "ID found" });
    res.status(200).json(id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE ADMIN
const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await AdminModel.findById(id).deleteOne;
    res.status(200).json({ success: true, msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CHANGE ROLE
const changeRole = async (req, res) => {};

module.exports = {
  loginAdmin,
  getRegister,
  registerAdmin,
  getManage,
  deleteAdmin,
  changeRole,
  getNewRoute,
};
