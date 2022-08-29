const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// CREATE TOKEN FOR MONGO ID i.e. _id
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "30d" });
};

const decryptJwt = async (token) => {
  const jwtVerify = promisify(jwt.verify);
  return await jwtVerify(token, JWT_SECRET);
};

const sendToken = (user, statusCode, req, res) => {
  const token = signJwt(user._id);
  const options = {
    expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
    secure: NODE_ENV === "production" ? true : false,
    httpOnly: NODE_ENV === "production" ? true : false,
  };
  res.cookie("jwt", token, options);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
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
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminModel.findOne({ username });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      username: admin.username,
      role: "",
      token: createToken(admin._id),
    });
    console.log(admin);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// AUTH LOGIN

// const setAdminContext = async () => {
//   return await axios.get("/admin").then((res) => {
//     setAdmin(res.data.currentUser);
//     router.push("/admin/me");
//   });
// };

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

  const admin = AdminModel.create({
    username,
    password: hashedPassword,
    role,
  });

  if (admin) {
    const adminData = { username: admin._id };
    sendToken(admin, 201, req, res);
    console.log(accessToken);
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
};

// GET ADMIN/START i.e. _id
const getAdminStart = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Admin data display" });
});

module.exports = {
  getAdminMain,
  loginAdmin,
  getRegisterAdmin,
  registerAdmin,
  getAdminStart,
};
