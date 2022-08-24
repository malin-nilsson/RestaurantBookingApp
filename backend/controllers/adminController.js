const AdminModel = require("../models/adminModel");
const utils = require("../utils/utils");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

const getAdminMain = async (req, res) => {
  res.status(200);
};

const getRegisterAdmin = async (req, res) => {
  res.status(200);
};

//LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const [username, password] = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ msg: "Login Admin" });
};

//REGISTER ADMIN
const registerAdmin = async (req, res) => {
  const { username, password, confirmPassword, role, secret } = req.body;

  try {
    // const user = await User.signup(username, password);
    const admin = await AdminModel.create({
      username: username,
      password: utils.hashedPwd(password),
      role: role,
    });

    const token = createToken(admin._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ msg: "Register Admin" });
};

//OLD CODE
// const loginAdmin = async (req, res) => {
//   const { username, password } = req.body;

//   AdminModel.findOne({ username }, (err, user) => {
//     if (user && utils.comparePwd(password)) {
//       const userData = {
//         id: user._id,
//         username: username,
//         role: user.role,
//       };
//       const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

//       res.cookie("token", accessToken);
//       res.redirect("/admin");
//     } else {
//       res.send("Login failed");
//     }
//   });
// };

//OLD CODE
// const postRegister = async (req, res) => {
//   const { username, password, confirmPassword, role, secret } = req.body;

//   try {
//     const newAdmin = await AdminModel.create({
//       username: username,
//       password: utils.hashedPwd(password),
//       role: role,
//     });
//     res.status(200).json(username);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = { getAdminMain, loginAdmin, getRegisterAdmin, registerAdmin };
