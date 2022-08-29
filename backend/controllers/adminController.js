const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// CREATE TOKEN FOR MONGO ID i.e. _id
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "30d" });
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

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminModel.findOne({ username });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      username: admin.username,
      role: "",
      token: createToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

// AUTH LOGIN

const setAdminContext = async () => {
  return await axios.get("/admin").then((res) => {
    setAdmin(res.data.currentUser);
    router.push("/admin/me");
  });
};

// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  const { username, password, confirmPassword, role } = req.body;

  if (!username || !password) {
    //ADD COMPARE PASSWORD ABOVE || comparePassword make middleware/utils
    res.status(400);
    throw new Error("All fields must be filled");
  }

  const adminExist = await AdminModel.findOne({ username });

  if (adminExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await AdminModel.create({
    username,
    password: hashedPassword,
    role,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      username: admin.username,
      role: "",
      token: createToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
};

// GET ADMIN/ME i.e. _id
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Admin data display" });
});

module.exports = {
  getAdminMain,
  loginAdmin,
  getRegisterAdmin,
  registerAdmin,
  getMe,
};
