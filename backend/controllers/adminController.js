const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// CREATE TOKEN FOR MONGO ID i.e. _id
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};

// HANDLE ERRORS
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "Incorrect email!") {
    errors.email = "Email is not registered!";
  }

  if (err.message === "Incorrect password!") {
    errors.password = "The password is incorrect!";
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
    const { email, password } = req.body;
    const admin = await AdminModel.create({ email, password });
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

// LOGIN ADMIN
// const loginAdmin = asyncHandler(async (req, res) => {
//   const { username, password } = req.body;

//   const admin = await AdminModel.findOne({ username });

//   if (admin && (await bcrypt.compare(password, admin.password))) {
//     res.json({
//       _id: admin.id,
//       username: admin.username,
//       // role: "",
//       token: createToken(admin._id),
//     });
//     console.log(admin);
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }
// });

// REGISTER ADMIN
// const registerAdmin = async (req, res) => {
//   const { username, password, confirmPassword, role } = req.body;

//   if (!username || !password) {
//     //ADD COMPARE PASSWORD ABOVE || comparePassword make middleware/utils
//     res.status(400);
//     throw new Error("All fields must be filled");
//   }

//   const adminExist = await AdminModel.findOne({ username });

//   if (adminExist) {
//     res.status(400);
//     throw new Error("User already exist");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const admin = AdminModel.create({
//     username,
//     password: hashedPassword,
//     token: "",
//     // role,
//   });

//   if (admin) {
//     const adminData = { username: admin._id };
//     res.status(201).json({
//       _id: admin.id,
//       username: admin.username,
//       // role: "",
//       token: createToken(admin._id),
//     });
//     admin.token = token;
//     console.log(admin._id);
//     console.log(admin._id);
//   } else {
//     res.status(400);
//     throw new Error("Invalid admin data");
//   }
// };

// GET ADMIN/START i.e. _id
const getAdminStart = async (req, res) => {
  res.status(200).json({ message: "Admin data display" });
};

// const decryptJwt = async (token) => {
//   const jwtVerify = promisify(jwt.verify);
//   return await jwtVerify(token, JWT_SECRET);
// };

// const sendToken = (user, statusCode, req, res) => {
//   const token = jwt.sign(user._id);
//   const options = {
//     expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
//     secure: NODE_ENV === "production" ? true : false,
//     httpOnly: NODE_ENV === "production" ? true : false,
//   };
//   res.cookie("jwt", token, options);

//   user.password = undefined;

//   res.status(statusCode).json({
//     status: "success",
//     token,
//     user,
//   });
// };

module.exports = {
  getAdminMain,
  loginAdmin,
  getRegisterAdmin,
  registerAdmin,
  getAdminStart,
};
