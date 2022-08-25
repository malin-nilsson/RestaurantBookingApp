const AdminModel = require("../models/adminModel");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

// CREATE TOKEN FOR MONGO ID i.e. _id
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
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

//LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const [username, password] = req.body;

  try {
    if (!username || !password) {
      throw Error("All fields must be filled.");
    }

    AdminModel.findOne({ username }, (err, admin) => {
      if (admin && utils.comparePwd(password, admin.password)) {
        const adminData = { userId: admin._id, username, type: admin.type };
        const accessToken = jwt.sign(userData, process.env.SECRET);
        res.cookie("token", accessToken);

        res.redirect("/");
      } else {
        res.render("", { error: "Failed to login!" });
      }
    });
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      throw Error("Incorrect password");
    }
    const token = createToken(admin._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//REGISTER ADMIN
const registerAdmin = async (req, res) => {
  const { username, password, role, confirmPwd, secret } = req.body;

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
    // add token to .json
    res.status(200).json({ username });
    console.log(admin);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAdminMain, loginAdmin, getRegisterAdmin, registerAdmin };
