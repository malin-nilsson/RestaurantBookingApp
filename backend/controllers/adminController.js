const AdminModel = require("../models/adminModel");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

// CREATE TOKEN FOR MONGO ID i.e. _id
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};

// GET /ADMIN
const getAdminMain = (req, res) => {
  res.sendStatus(200);
};

// GET /AMIN/REGISTER
const getRegisterAdmin = (req, res) => {
  res.sendStatus(200);
};

//LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const [username, password] = req.body;

  try {
    if (!username || !password) {
      throw Error("All fields must be filled.");
    }
    const admin = await AdminModel.findOne({ username });

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      throw Error("Incorrect password");
    }
    const token = createToken(admin._id);

    res.status(200).json({ username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ msg: "Login Admin" });
};

//REGISTER ADMIN
const registerAdmin = async (req, res) => {
  const { username, password, role, secret } = req.body;

  try {
    // const admin = await Admin.signup(username, password);
    console.log(AdminModel);

    const admin = await AdminModel.create({
      username: username,
      password: utils.hashedPwd(password),
      role: role,
      secret: "",
    });

    const token = createToken(admin._id);

    res.status(200).json({ username, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAdminMain, loginAdmin, getRegisterAdmin, registerAdmin };
